CREATE TYPE message_role AS ENUM (
  'assistant',
  'system',
  'tool',
  'user'
);

CREATE TABLE message (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  board_id UUID NOT NULL REFERENCES board(id) ON DELETE CASCADE,
  author_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
  content TEXT,
  role message_role NOT NULL,
  tool_call_id TEXT,
  tool_calls JSONB,
  send_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON message (board_id);
