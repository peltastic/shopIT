CREATE TYPE category AS ENUM('ech','clothes','cosmetics','food','drinks','wine','tech_accessories'); 
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    names VARCHAR(255) NOT NULL,
    descriptions TEXT NOT NULL,
    price INT NOT NULL,
    category category,
    image_url JSON,
    vendor_id INT,
    FOREIGN KEY (vendor_id) REFERENCES vendor_profiles(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);