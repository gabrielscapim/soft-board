CREATE TABLE board_share (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES team(id) ON DELETE CASCADE,
  board_id UUID NOT NULL REFERENCES board(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expire_date TIMESTAMPTZ,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON board_share (token);
CREATE INDEX ON board_share (board_id);
