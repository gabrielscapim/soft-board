CREATE TYPE board_review_status AS ENUM (
  'pending',
  'error',
  'completed'
);

CREATE TABLE board_review (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES team(id) ON DELETE CASCADE,
  board_id UUID NOT NULL REFERENCES board(id) ON DELETE CASCADE,
  status board_review_status NOT NULL DEFAULT 'pending',
  tool_call_id TEXT NOT NULL,
  error JSONB,
  review JSONB,
  score NUMERIC,
  review_date TIMESTAMPTZ,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON board_review (board_id);
CREATE INDEX ON board_review (tool_call_id);
