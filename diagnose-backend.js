#!/usr/bin/env node
/**
 * Agonis Partners — backend connectivity diagnostic.
 *
 * Run from the project root:   node diagnose-backend.js
 *
 * Tells you exactly why POST /api/brand-submission is returning 500, by
 * testing each dependency the route needs, in the order the route needs it.
 * Nothing is written to your database except one probe document, which is
 * deleted again immediately.
 *
 * No credentials are printed.
 */

const fs = require("fs");
const path = require("path");
const dns = require("dns").promises;
const net = require("net");
const https = require("https");

const OK = "  \x1b[32m✓\x1b[0m ";
const NO = "  \x1b[31m✗\x1b[0m ";
const WARN = "  \x1b[33m!\x1b[0m ";
const head = (s) => console.log("\n\x1b[1m" + s + "\x1b[0m");

// ---------------------------------------------------------------- env ----
function loadEnvLocal() {
  const p = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(p)) {
    console.log(NO + ".env.local not found in " + process.cwd());
    console.log("    Are you running this from the project root?");
    process.exit(1);
  }
  const env = {};
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    env[m[1]] = v;
  }
  return env;
}

function publicIp() {
  return new Promise((resolve) => {
    const req = https.get("https://api.ipify.org", { timeout: 6000 }, (res) => {
      let d = "";
      res.on("data", (c) => (d += c));
      res.on("end", () => {
        const v = d.trim();
        resolve(/^[0-9a-fA-F.:]{7,45}$/.test(v) ? v : null);
      });
    });
    req.on("error", () => resolve(null));
    req.on("timeout", () => {
      req.destroy();
      resolve(null);
    });
  });
}

function tcpProbe(host, port, timeout = 8000) {
  return new Promise((resolve) => {
    const s = net.connect({ host, port, timeout });
    s.on("connect", () => {
      s.destroy();
      resolve("OPEN");
    });
    s.on("timeout", () => {
      s.destroy();
      resolve("TIMEOUT");
    });
    s.on("error", (e) => {
      s.destroy();
      resolve(e.code || "ERROR");
    });
  });
}

// --------------------------------------------------------------- main ----
(async () => {
  console.log("\n\x1b[1m═══ Agonis backend diagnostic ═══\x1b[0m");
  console.log("  node " + process.version + "  |  cwd " + process.cwd());

  const env = loadEnvLocal();
  const verdict = [];

  // ---- 1. What the API route will decide ---------------------------------
  head("1. Configuration the route sees");
  const dbConfigured = Boolean(env.MONGODB_URI);
  const mailConfigured = Boolean(env.GMAIL_USER && env.GMAIL_APP_PASSWORD);
  console.log(
    (dbConfigured ? OK : NO) + "isDatabaseConfigured() -> " + dbConfigured,
  );
  console.log(
    (mailConfigured ? OK : NO) + "isMailConfigured()     -> " + mailConfigured,
  );
  if (!dbConfigured && !mailConfigured) {
    console.log(
      "\n" +
        NO +
        "Neither is configured. The route returns 500 by design — nothing can capture the lead.",
    );
    process.exit(1);
  }
  if (!mailConfigured) {
    console.log(
      WARN +
        "No email fallback. If the DB write fails, the route has nothing left and returns 500.",
    );
  }

  // ---- 2. MongoDB --------------------------------------------------------
  let dbWorks = false;
  if (dbConfigured) {
    head("2. MongoDB Atlas");
    const uri = env.MONGODB_URI;
    const after = uri.split("://")[1] || "";
    const at = after.lastIndexOf("@");
    const hostPart = after.slice(at + 1).split("/")[0].split("?")[0];
    const user = after.slice(0, at).split(":")[0];
    console.log("    user: " + user);
    console.log("    host: " + hostPart);

    // DNS
    let hosts = [];
    if (uri.startsWith("mongodb+srv")) {
      try {
        const srv = await dns.resolveSrv("_mongodb._tcp." + hostPart);
        hosts = srv.map((r) => ({ host: r.name, port: r.port }));
        console.log(OK + "SRV resolved (" + hosts.length + " nodes)");
      } catch (e) {
        console.log(NO + "SRV lookup failed: " + (e.code || e.message));
        console.log(
          "    The cluster hostname is wrong, or DNS is blocked on this network.",
        );
        verdict.push("MongoDB: DNS/SRV lookup failed — check the cluster hostname.");
      }
    } else {
      const [h, p] = hostPart.split(":");
      hosts = [{ host: h, port: Number(p || 27017) }];
    }

    // TCP reachability
    let anyOpen = false;
    for (const h of hosts) {
      const r = await tcpProbe(h.host, h.port);
      console.log((r === "OPEN" ? OK : NO) + "TCP " + h.host + ":" + h.port + " -> " + r);
      if (r === "OPEN") anyOpen = true;
    }
    if (hosts.length && !anyOpen) {
      const ip = await publicIp();
      console.log(
        "\n" +
          NO +
          "No Atlas node is reachable on port 27017. Almost always the IP allowlist.",
      );
      console.log("    Fix: Atlas -> Network Access -> Add IP Address");
      console.log(
        "    Your current public IP: " + (ip || "(could not determine)"),
      );
      console.log(
        "    Or click “Allow access from anywhere” (0.0.0.0/0) while developing.",
      );
      console.log(
        "    Note: a home/office IP changes. If this worked yesterday, your IP moved.",
      );
      verdict.push(
        "MongoDB: cannot reach the cluster — add " +
          (ip || "your IP") +
          " to the Atlas Network Access allowlist.",
      );
    }

    // Real connect + auth + write
    if (anyOpen) {
      let MongoClient;
      try {
        ({ MongoClient } = require("mongodb"));
      } catch {
        console.log(NO + "mongodb package not installed — run: npm install");
        process.exit(1);
      }
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });
      try {
        await client.connect();
        console.log(OK + "connected + authenticated");
        const dbName =
          env.MONGODB_DB ||
          (uri.split("://")[1].split("/")[1] || "").split("?")[0] ||
          "agonis";
        const db = client.db(dbName);
        console.log("    database: " + dbName);
        const cols = await db.listCollections().toArray();
        console.log(
          "    collections: " + (cols.map((c) => c.name).join(", ") || "(none yet)"),
        );
        const probe = await db
          .collection("brand_submissions")
          .insertOne({ _diagnosticProbe: true, at: new Date() });
        await db.collection("brand_submissions").deleteOne({ _id: probe._id });
        console.log(OK + "write + delete succeeded on brand_submissions");
        dbWorks = true;
      } catch (e) {
        const msg = String(e.message).split("\n")[0];
        console.log(NO + e.name + ": " + msg.slice(0, 300));
        if (/bad auth|Authentication failed|AtlasError/i.test(msg)) {
          console.log(
            "    Wrong username or password. Reset it in Atlas -> Database Access.",
          );
          console.log(
            "    If the new password has any of  @ : / ? # [ ] %  percent-encode it:",
          );
          console.log(
            "      node -e \"console.log(encodeURIComponent('your password'))\"",
          );
          verdict.push("MongoDB: authentication failed — wrong user or password.");
        } else if (/not authorized|Unauthorized/i.test(msg)) {
          console.log(
            "    The user authenticated but lacks write permission on this database.",
          );
          console.log(
            "    Atlas -> Database Access -> edit user -> role readWrite on “" +
              (env.MONGODB_DB || "agonis") +
              "”.",
          );
          verdict.push("MongoDB: user lacks readWrite on the target database.");
        } else {
          verdict.push("MongoDB: " + e.name + " — " + msg.slice(0, 160));
        }
      } finally {
        await client.close().catch(() => {});
      }
    }
  }

  // ---- 3. SMTP -----------------------------------------------------------
  let mailWorks = false;
  if (mailConfigured) {
    head("3. Gmail SMTP");
    const host = env.SMTP_HOST || "smtp.gmail.com";
    const port = Number(env.SMTP_PORT || 465);
    const r = await tcpProbe(host, port);
    console.log((r === "OPEN" ? OK : NO) + "TCP " + host + ":" + port + " -> " + r);
    if (r !== "OPEN") {
      console.log(
        "    Port " + port + " is blocked. Many ISPs and corporate networks block SMTP.",
      );
      console.log("    Try SMTP_PORT=587 in .env.local (STARTTLS instead of implicit TLS).");
      verdict.push("Email: cannot reach " + host + ":" + port + " — port blocked.");
    } else {
      let nodemailer;
      try {
        nodemailer = require("nodemailer");
      } catch {
        console.log(NO + "nodemailer not installed — run: npm install");
        process.exit(1);
      }
      const t = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD },
      });
      try {
        await t.verify();
        console.log(OK + "SMTP authenticated as " + env.GMAIL_USER);
        mailWorks = true;
      } catch (e) {
        const msg = String(e.message).split("\n")[0];
        console.log(NO + msg.slice(0, 300));
        if (/Username and Password not accepted|BadCredentials|535/i.test(msg)) {
          console.log(
            "    That is not a valid App Password. It must be the 16-character code from",
          );
          console.log(
            "    https://myaccount.google.com/apppasswords (2-Step Verification required),",
          );
          console.log("    pasted with no spaces — not your normal Gmail password.");
          verdict.push("Email: Gmail rejected the credentials — needs a real App Password.");
        } else {
          verdict.push("Email: " + msg.slice(0, 160));
        }
      } finally {
        t.close();
      }
    }
  }

  // ---- Verdict -----------------------------------------------------------
  head("Verdict");
  if (dbWorks || mailWorks) {
    console.log(
      OK +
        "At least one channel works (" +
        [dbWorks && "database", mailWorks && "email"].filter(Boolean).join(" + ") +
        ").",
    );
    console.log(
      "    The route will now return 200. Restart `npm run dev` if it is already running —",
    );
    console.log("    Next only reads .env.local at boot.");
  } else {
    console.log(NO + "Nothing can capture a submission, so the route returns 500.\n");
    verdict.forEach((v, i) => console.log("    " + (i + 1) + ". " + v));
    console.log(
      "\n    Fastest unblock: set GMAIL_USER + GMAIL_APP_PASSWORD. Gmail needs no IP allowlist.",
    );
  }
  console.log("");
})();
