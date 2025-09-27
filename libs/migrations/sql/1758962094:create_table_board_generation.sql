CREATE TYPE board_generation_status AS ENUM (
  'pending',
  'error',
  'completed'
);

CREATE TABLE board_generation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES team(id) ON DELETE CASCADE,
  board_id UUID NOT NULL REFERENCES board(id) ON DELETE CASCADE,
  message_id UUID NOT NULL REFERENCES message(id) ON DELETE CASCADE,
  status board_generation_status NOT NULL DEFAULT 'pending',
  error JSONB,
  prompt_tokens INTEGER,
  completion_tokens INTEGER,
  total_tokens INTEGER,
  execution_time_ms INTEGER,
  generation_date TIMESTAMPTZ,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON board_generation (board_id);
