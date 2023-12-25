CREATE TYPE status as ENUM ('pending', 'viewed', 'in progress', 'completed', 'aborted')
CREATE TABLE IF NOT EXISTS equipment (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(120) NOT NULL, 
  phone VARCHAR(15) NOT NULL,
  content VARCHAR(1000) DEFAULT NULL,
  need_transport BOOLEAN DEFAULT FALSE,
  address VARCHAR(255) DEFAULT NULL 
  date_created TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS equipment_phone_key ON equipment(phone);
ALTER TABLE equipment ADD COLUMN status status DEFAULT 'pending'