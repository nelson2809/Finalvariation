-- Agonis Partners — brand submission storage
--
-- The API route creates this automatically on first request, so running this
-- by hand is optional. It's here so you can review the shape, apply it in the
-- Neon SQL Editor up front, or rebuild the table if it's ever dropped.

CREATE TABLE IF NOT EXISTS brand_submissions (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  company     TEXT,
  brand       TEXT        NOT NULL,
  website     TEXT,
  store_url   TEXT,
  category    TEXT,
  markets     TEXT,
  message     TEXT,
  source      TEXT,          -- 'contact-page' | 'modal'
  ip          TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS brand_submissions_created_at_idx
  ON brand_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS brand_submissions_email_idx
  ON brand_submissions (email);


-- Handy queries -------------------------------------------------------------

-- Latest submissions
--   SELECT created_at, name, email, brand, company, category
--     FROM brand_submissions
--    ORDER BY created_at DESC
--    LIMIT 50;

-- Submissions per week
--   SELECT DATE_TRUNC('week', created_at) AS week, COUNT(*)
--     FROM brand_submissions
--    GROUP BY week
--    ORDER BY week DESC;

-- Most common categories
--   SELECT category, COUNT(*) AS n
--     FROM brand_submissions
--    WHERE category IS NOT NULL
--    GROUP BY category
--    ORDER BY n DESC;
