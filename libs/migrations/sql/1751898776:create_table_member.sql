CREATE TYPE member_role AS ENUM (
  'owner',
  'admin',
  'member'
);

CREATE TABLE member (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX ON MEMBER (user_id, workspace_id);
