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

CREATE TABLE IF NOT EXISTS transport (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(120) NOT NULL, 
  phone VARCHAR(15) NOT NULL,
  address_from VARCHAR(255) NOT NULL,
  address_to VARCHAR(255) NOT NULL,
  content VARCHAR(1000) DEFAULT NULL,
  status status DEFAULT 'pending',
  notes VARCHAR(1000) NOT NULL,
  date_created TIMESTAMP DEFAULT NOW(),
  date_modified TIMESTAMP DEFAULT NOW()
)
CREATE INDEX IF NOT EXISTS transport ON transport(phone);