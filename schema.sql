-- User Table
CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL,
  token VARCHAR(50)
);


-- Insert user sample data
INSERT INTO users(username, password, token)
VALUES(
  'admin',
  '$2a$12$hqT8z5NNGsHCX1o.mwfiHOMch1I4vTIXbj.rMIJLVYt5uPO71v97i',
  'userToken121481'
);


-- Product table
CREATE TABLE IF NOT EXISTS product(
  id SERIAL PRIMARY KEY,
  sku VARCHAR(20) UNIQUE NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  stock INTEGER DEFAULT 0,
  price NUMERIC(10, 4) DEFAULT 0.0000
);


-- Create product SKU unique numbering
CREATE SEQUENCE product_sku_seq START 1;

CREATE OR REPLACE FUNCTION generate_product_sku()
RETURNS TRIGGER AS $$
BEGIN
    NEW.sku := 'PRD-' || LPAD(nextval('product_sku_seq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_product_sku
BEFORE INSERT ON product
FOR EACH ROW
WHEN (NEW.sku IS NULL)
EXECUTE FUNCTION generate_product_sku();


-- Insert product sample data
INSERT INTO product(product_name, stock, price)
VALUES
  ('Product 1', 10, 10000.0000),
  ('Product 2', 20, 15000.0000),
  ('Product 3', 30, 20000.0000),
  ('Product 4', 40, 25000.0000),
  ('Product 5', 50, 30000.0000),
  ('Product 6', 100, 10000.0000),
  ('Product 7', 80, 15000.0000),
  ('Product 8', 60, 25000.0000),
  ('Product 9', 50, 30000.0000),
  ('Product 10', 50, 60000.0000);
