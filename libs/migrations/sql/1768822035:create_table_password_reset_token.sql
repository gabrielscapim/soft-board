CREATE TABLE password_reset_token (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  token_hash TEXT,
  create_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  expire_date TIMESTAMPTZ NOT NULL,
  use_date TIMESTAMPTZ
);
