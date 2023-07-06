-- SECTION: >> EJERCICIO 3 - Página 150
CREATE DATABASE IF NOT EXISTS db_country;
USE db_country;

CREATE TABLE IF NOT EXISTS db_country.country (
  country_id SMALLINT AUTO_INCREMENT UNIQUE,
  country VARCHAR(50),
  last_update TIMESTAMP, 
  CONSTRAINT pk_address PRIMARY KEY(country_id)
);

CREATE TABLE IF NOT EXISTS db_country.city (
  city_id SMALLINT AUTO_INCREMENT UNIQUE,
  city VARCHAR(50),
  last_update TIMESTAMP,
  country_id SMALLINT,
  CONSTRAINT pk_city PRIMARY KEY(city_id),
  CONSTRAINT fk_country FOREIGN KEY (country_id)
    REFERENCES country(country_id)
);

CREATE TABLE IF NOT EXISTS db_country.address (
  address_id SMALLINT AUTO_INCREMENT UNIQUE,
  address VARCHAR(50),
  address2 VARCHAR(50),
  district VARCHAR(50),
  city_id SMALLINT,
  postal_code VARCHAR(10),
  phone VARCHAR(20),
  location VARCHAR(20),
  last_update TIMESTAMP,
  CONSTRAINT pk_address PRIMARY KEY(address_id),
  CONSTRAINT fk_city FOREIGN KEY (city_id)
    REFERENCES city(city_id)
);

-- Inserting into the country table
INSERT INTO db_country.country (country, last_update) VALUES
    ('United States', CURRENT_TIMESTAMP),
    ('Canada', CURRENT_TIMESTAMP),
    ('United Kingdom', CURRENT_TIMESTAMP),
    ('Australia', CURRENT_TIMESTAMP),
    ('Germany', CURRENT_TIMESTAMP),
    ('France', CURRENT_TIMESTAMP),
    ('Brazil', CURRENT_TIMESTAMP),
    ('China', CURRENT_TIMESTAMP),
    ('Japan', CURRENT_TIMESTAMP),
    ('India', CURRENT_TIMESTAMP);

-- Inserting into the city table
INSERT INTO db_country.city (city, last_update, country_id) VALUES
    ('New York', CURRENT_TIMESTAMP, 1),
    ('Toronto', CURRENT_TIMESTAMP, 2),
    ('London', CURRENT_TIMESTAMP, 3),
    ('Sydney', CURRENT_TIMESTAMP, 4),
    ('Berlin', CURRENT_TIMESTAMP, 5),
    ('Paris', CURRENT_TIMESTAMP, 6),
    ('São Paulo', CURRENT_TIMESTAMP, 7),
    ('Beijing', CURRENT_TIMESTAMP, 8),
    ('Tokyo', CURRENT_TIMESTAMP, 9),
    ('Mumbai', CURRENT_TIMESTAMP, 10);

-- Inserting into the address table
INSERT INTO db_country.address (address, address2, district, city_id, postal_code, phone, location, last_update) VALUES
    ('123 Main St', '', 'Downtown', 1, '10001', '+1-123-456-7890', 'Coordinates XYZ', CURRENT_TIMESTAMP),
    ('456 Elm St', 'Apt 5', 'Midtown', 2, 'M5G 2C3', '+1-987-654-3210', 'Coordinates ABC', CURRENT_TIMESTAMP),
    ('789 Oak St', '', 'West End', 3, 'SW1A 1AA', '+44-123-456-7890', 'Coordinates XYZ', CURRENT_TIMESTAMP),
    ('234 Maple St', 'Unit 12', 'CBD', 4, '2000', '+61-987-654-3210', 'Coordinates ABC', CURRENT_TIMESTAMP),
    ('567 Pine St', 'Suite 3', 'Mitte', 5, '10115', '+49-123-456-7890', 'Coordinates XYZ', CURRENT_TIMESTAMP),
    ('890 Cedar St', '', 'Champs-Élysées', 6, '75008', '+33-987-654-3210', 'Coordinates ABC', CURRENT_TIMESTAMP),
    ('111 Elm St', 'Apto 9', 'Centro', 7, '01234-567', '+55-123-456-7890', 'Coordinates XYZ', CURRENT_TIMESTAMP),
    ('222 Oak St', '', 'Wangfujing', 8, '100006', '+86-987-654-3210', 'Coordinates ABC', CURRENT_TIMESTAMP),
    ('333 Maple St', 'Room 7', 'Shinjuku', 9, '160-0022', '+81-123-456-7890', 'Coordinates XYZ', CURRENT_TIMESTAMP),
    ('444 Pine St', 'Unit 15', 'Andheri', 10, '400069', '+91-987-654-3210', 'Coordinates ABC', CURRENT_TIMESTAMP);

SELECT cou.country_id, cou.country, c.city, a.address, a.address2, a.district, a.postal_code, a.phone, a.location
  FROM country cou
  INNER JOIN city c 
  ON cou.country_id = c.city_id
  INNER JOIN address a
  ON c.city_id = a.address_id;

