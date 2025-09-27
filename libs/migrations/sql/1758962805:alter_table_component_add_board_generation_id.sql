ALTER TABLE component ADD COLUMN board_generation_id UUID REFERENCES board_generation(id) ON DELETE SET NULL;

CREATE INDEX ON component (board_generation_id);
