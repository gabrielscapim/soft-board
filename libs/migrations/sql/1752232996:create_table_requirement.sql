CREATE TABLE requirement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES team(id) ON DELETE CASCADE,
  board_id UUID NOT NULL REFERENCES board(id) ON DELETE CASCADE,
  author_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
  title TEXT,
  description TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON requirement (board_id);
