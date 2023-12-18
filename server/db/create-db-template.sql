-- init.sql

CREATE DATABASE oms;
\c oms
CREATE TABLE  admin_users (
  user_id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL, 
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


