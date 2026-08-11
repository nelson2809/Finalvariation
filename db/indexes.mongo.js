/*
 * Agonis Partners — brand submission collection (MongoDB)
 *
 * The app creates these indexes automatically on first write, so running this
 * is optional. It's here so you can set them up ahead of time, and as a
 * reference for querying your data in mongosh or Compass.
 *
 * Usage:
 *   mongosh "mongodb+srv://nelson:<password>@cluster0.lr6yqeo.mongodb.net/agonis" \
 *     --file db/indexes.mongo.js
 */

const col = db.getCollection("brand_submissions");

// Newest-first listing — the query the admin view would use.
col.createIndex({ createdAt: -1 }, { name: "createdAt_desc" });

// Backs the per-email rate limit check on every submission.
col.createIndex({ email: 1 }, { name: "email_asc" });

print("Indexes on brand_submissions:");
printjson(col.getIndexes());


/* ---------------------------------------------------------------------------
 * Document shape
 * ---------------------------------------------------------------------------
 * {
 *   _id:        ObjectId,
 *   name:       string,
 *   email:      string,
 *   company:    string | null,
 *   brand:      string,
 *   website:    string | null,
 *   storeUrl:   string | null,
 *   category:   string | null,
 *   markets:    string | null,
 *   message:    string | null,
 *   source:     "contact-page" | "modal" | null,
 *   ip:         string | null,
 *   userAgent:  string | null,
 *   createdAt:  Date
 * }
 */


/* ---------------------------------------------------------------------------
 * Handy queries
 * -------------------------------------------------------------------------*/

// Latest 50 submissions
//   db.brand_submissions.find(
//     {},
//     { name: 1, email: 1, brand: 1, company: 1, category: 1, createdAt: 1 }
//   ).sort({ createdAt: -1 }).limit(50)

// Submissions per week
//   db.brand_submissions.aggregate([
//     { $group: {
//         _id: { $dateTrunc: { date: "$createdAt", unit: "week" } },
//         count: { $sum: 1 }
//     }},
//     { $sort: { _id: -1 } }
//   ])

// Most common categories
//   db.brand_submissions.aggregate([
//     { $match: { category: { $ne: null } } },
//     { $group: { _id: "$category", n: { $sum: 1 } } },
//     { $sort: { n: -1 } }
//   ])

// Everything from one address
//   db.brand_submissions.find({ email: "someone@example.com" })
//     .sort({ createdAt: -1 })

// Optional: auto-delete submissions older than 2 years (GDPR housekeeping).
// Uncomment to enable — this permanently removes documents.
//   col.createIndex(
//     { createdAt: 1 },
//     { name: "createdAt_ttl", expireAfterSeconds: 60 * 60 * 24 * 730 }
//   );
