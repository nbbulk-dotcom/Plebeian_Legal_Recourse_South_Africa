INSERT INTO users (username, email, hashed_password, role)
VALUES ('admin', 'admin@example.com', 'changeme_hashed', 'admin')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, email, hashed_password, role)
VALUES ('reviewer1', 'reviewer1@example.com', 'changeme_hashed', 'reviewer')
ON CONFLICT (username) DO NOTHING;

WITH u AS (
  SELECT id FROM users WHERE username = 'reviewer1' LIMIT 1
)
INSERT INTO legal_reviewers (user_id, practitioner_number, jurisdiction, verified)
SELECT u.id, 'LR-TEST-0001', 'South Africa', true FROM u
ON CONFLICT (user_id) DO UPDATE SET verified = true;

INSERT INTO template_approvals (template_key, approved, reviewer_id, reviewer_notes, approved_at)
SELECT 'sample:promissory_note', true, lr.id, 'Initial test approval', now()
FROM legal_reviewers lr
JOIN users u ON u.id = lr.user_id
WHERE u.username = 'reviewer1'
ON CONFLICT (template_key) DO NOTHING;
