# Brand Submission Backend — Setup

The "Submit Your Brand" form posts to a real API route that **saves the
submission to MongoDB** and **sends two emails**: a confirmation to the person
who submitted, and a notification to the admin inbox.

Three things to do. All are required before it will work.

---

## 1. Install dependencies

```bash
npm install
```

`package.json` already lists `mongodb` and `nodemailer`. They couldn't be
installed for you — the sandbox that wrote this code has no network access to
your machine's npm — so until you run this, `npm run build` fails with
"Cannot find module 'mongodb'".

---

## 2. Point it at your Atlas cluster

Your cluster is already created. Two things to check in Atlas, then set the
connection string.

### a. Allow Vercel to connect

Vercel's serverless functions have **dynamic outbound IPs**, so a specific
allowlist entry won't hold. In Atlas:

**Network Access → Add IP Address → Allow access from anywhere (`0.0.0.0/0`)**

> **Your allowlist currently has only `116.73.161.203/32`** — your home IP,
> added by Atlas's Auto Setup. That lets *you* connect from this machine, but
> **every request from Vercel will time out**, because Vercel's functions run
> from IPs that change constantly and are never in that list. This is the single
> most likely reason a deployed form appears to work locally and silently fails
> in production.

This is the standard configuration for serverless. Your database is still
protected by the username/password in the connection string — but it does mean
that password is the only thing standing between the internet and your data, so
make it a long random one.

### b. Set the connection string

Your SRV string is:

```
mongodb+srv://xavierarulnelsona17me_db_user:<db_password>@cluster0.dwo5xvn.mongodb.net/?appName=Cluster0
```

Replace `<db_password>` with the real password (angle brackets included — the whole `<db_password>` placeholder goes away).

> **If the password contains `@ : / ? # [ ] %` it must be percent-encoded**, or
> the driver can't parse the URI. Encode it with:
> ```bash
> node -e "console.log(encodeURIComponent('your password here'))"
> ```

> Note that this connection string has **no database name** in its path — it
> ends in `.net/?appName=...`. That's why `MONGODB_DB` below matters: without
> it the driver silently writes to a database called `test`.

---

## 3. Create a Gmail App Password

A normal Gmail password will **not** work for SMTP — Google blocks it.

1. Turn on 2-Step Verification: <https://myaccount.google.com/security>
2. Go to <https://myaccount.google.com/apppasswords>
3. Create an app password named e.g. "Agonis Website"
4. Copy the 16-character code and **remove the spaces**

---

## 4. Set the environment variables

Locally, copy `.env.example` to `.env.local` and fill it in. In production, add
the same keys under **Vercel → Settings → Environment Variables**:

| Variable | Required | Notes |
| --- | --- | --- |
| `MONGODB_URI` | yes | SRV string with the real password |
| `MONGODB_DB` | yes | `agonis` — your URI has no database in its path |
| `GMAIL_USER` | yes | The Gmail address that sends the mail |
| `GMAIL_APP_PASSWORD` | yes | 16-char App Password, no spaces |
| `ADMIN_EMAIL` | no | Defaults to `xaviernelson121@gmail.com` |
| `MAIL_FROM_NAME` | no | Defaults to "Agonis Partners" |
| `NEXT_PUBLIC_SITE_URL` | no | Used for links inside emails |

Redeploy after adding them — environment variables are read at build time.

---

## How it behaves

`POST /api/brand-submission`

1. **Validates** every field server-side. Bad input returns `400` with
   per-field messages the form renders inline.
2. **Honeypot check.** A hidden `companyWebsite` field that only bots fill.
   Tripping it returns a fake `200` so bots can't detect the block.
3. **Rate limit.** Max 3 submissions per email address per 10 minutes → `429`.
4. **Saves to MongoDB first**, so a mail outage can never lose a lead.
5. **Sends both emails in parallel** via `Promise.allSettled` — a bounced
   confirmation doesn't suppress the admin notification.
6. **Only fails** (`500`) if *neither* the database write *nor* the admin email
   succeeded. Otherwise the lead is captured somewhere and the user sees success.

Degrades gracefully: if `MONGODB_URI` is missing it still emails; if the mail
credentials are missing it still stores. Both cases log a warning.

### Connection pooling

`src/lib/mongodb.ts` caches the client's connect promise on `globalThis`. This
matters more than it looks: the MongoDB driver holds a TCP pool, and a new
client per request would exhaust the cluster's connection limit under load
(Atlas M0 caps at 500). Caching the *promise* rather than the client also means
concurrent requests during a cold start share one handshake.

### Files

```
src/lib/brand-submission.ts   validation + types (shared client/server)
src/lib/mongodb.ts            cached MongoClient, database resolution
src/lib/db.ts                 submission read/write + index setup
src/lib/mail.ts               Nodemailer transport + branded HTML emails
src/app/api/brand-submission/route.ts   the endpoint
db/indexes.mongo.js           index setup + reference queries for mongosh
```

---

## Test it

```bash
npm run dev
```

Then submit the form at <http://localhost:3000/contact>, or:

```bash
curl -X POST http://localhost:3000/api/brand-submission \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"you@example.com","brand":"Test Brand","message":"Hello"}'
```

Expected:
`{"ok":true,"id":"68a1...","stored":true,"emailed":{"admin":true,"user":true}}`

To read submissions back, in Atlas → Browse Collections → `agonis` →
`brand_submissions`, or:

```js
db.brand_submissions.find().sort({ createdAt: -1 }).limit(50)
```

### If it doesn't connect

| Symptom | Cause |
| --- | --- |
| `MongoServerSelectionError` / timeout | `0.0.0.0/0` not allowlisted in Atlas Network Access |
| `Authentication failed` | Wrong password, or special characters not percent-encoded |
| `Invalid scheme` / URI parse error | The `<db_password>` placeholder is still in the string |
| Data appears in a `test` database | `MONGODB_DB` isn't set |

---

## Gmail sending limits

A free Gmail account allows roughly **500 recipients/day**; Workspace allows
~2,000. Each submission sends 2 emails. That is far beyond normal contact-form
volume, but if you ever run a campaign that drives heavy traffic, move to a
transactional provider (Resend, SendGrid, Postmark) — only `src/lib/mail.ts`
would need to change.

Deliverability note: mail sent from a `@gmail.com` address on behalf of
`agonispartners.com` is more likely to land in spam than mail from your own
verified domain. Sending from an address at your domain is worth doing when you
have a moment.
