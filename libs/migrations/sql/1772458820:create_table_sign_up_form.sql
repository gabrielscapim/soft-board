CREATE TABLE sign_up_form (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  normalized_email VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  create_date TIMESTAMPTZ(3) NOT NULL DEFAULT now(),
  expire_date TIMESTAMPTZ(3) NOT NULL,
  use_date TIMESTAMPTZ(3)
);

CREATE INDEX ON sign_up_form (normalized_email);
