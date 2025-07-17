CREATE TABLE component (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES team(id) ON DELETE CASCADE,
  board_id UUID NOT NULL REFERENCES board(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  properties JSONB NOT NULL DEFAULT '{}',
  connection_id UUID REFERENCES component(id) ON DELETE SET NULL,
  screen_id UUID REFERENCES component(id) ON DELETE SET NULL,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON component (board_id);
