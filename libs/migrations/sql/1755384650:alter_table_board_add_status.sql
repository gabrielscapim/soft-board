CREATE TYPE board_status AS ENUM (
  'idle',
  'error',
  'pending'
);

ALTER TABLE board ADD COLUMN status board_status NOT NULL DEFAULT 'idle';
