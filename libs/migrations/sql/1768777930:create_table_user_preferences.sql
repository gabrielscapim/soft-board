CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  language VARCHAR(10) NOT NULL DEFAULT 'en',
  accepted_tutorial BOOLEAN,
  create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  update_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX ON user_preferences (user_id);
