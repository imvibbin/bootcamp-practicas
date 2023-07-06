-- SECTION: >> EJERCICIO 1 - Página 69 y 74
CREATE DATABASE IF NOT EXISTS ejercicio_1;
USE ejercicio_1;

CREATE TABLE IF NOT EXISTS Genre (
  idGenre INT AUTO_INCREMENT UNIQUE,
  genre VARCHAR(255),
  PRIMARY KEY(idGenre)
);

	CREATE TABLE IF NOT EXISTS Album (
  idAlbum INT AUTO_INCREMENT UNIQUE,
  albumName VARCHAR(255),
  dateReleased DATETIME,
  PRIMARY KEY(idAlbum)
);

CREATE TABLE IF NOT EXISTS Artist (
  artistId INT AUTO_INCREMENT UNIQUE,
  artistName VARCHAR(255),
  PRIMARY KEY(artistId)
);

INSERT INTO Genre (
  genre
) VALUES ( "R&B" ),
( "POP" ),
( "ROCK" ),
( "FOLK" ),
( "KPOP" ),
( "TECHNO" ),
( "LOFI" ),
( "RAP" ),
( "TRAP" ),
( "CLASSICAL" );

INSERT INTO Album (
  albumName, dateReleased
) VALUES ( "album_1", "2023/07/06" ),
( "album_2", "2023/07/06" ),
( "album_3", "2023/07/06" ),
( "album_4", "2023/07/06" ),
( "album_5", "2023/07/06" ),
( "album_6", "2023/07/06" ),
( "album_7", "2024/07/06" ),
( "album_8", "2023/07/06" ),
( "album_9", "2023/07/06" ),
( "album_10", "2023/07/06" );

INSERT INTO Artist (
  artistName
) VALUES ( "artist_1" ),
( "artist_2" ),
( "artist_3" ),
( "artist_4" ),
( "artist_5" ),
( "artist_6" ),
( "artist_7" ),
( "artist_8" ),
( "artist_9" ),
( "artist_10" );

SELECT * FROM Genre;
SELECT * FROM Album;
SELECT * FROM Artist;

-- SECTION: >> EJERCICIO 2 - Página 148
SELECT postalZip as zip, region, country
  FROM mytable
  WHERE country = 'Spain';

SELECT *
  FROM mytable
  WHERE phone LIKE '\(811\)%';

SELECT * 
  FROM mytable
  WHERE country IN ('Spain', 'Italy');

SELECT COUNT(*) as Registros FROM mytable;

SELECT region, country, postalZip
  FROM mytable
  WHERE id IN (SELECT id FROM mytable WHERE country IN ('Germany', 'Turkey'));

SELECT *
  FROM mytable
  WHERE id = (SELECT MAX(id) FROM mytable);

SELECT *
  FROM mytable
  WHERE id = (SELECT MIN(id) FROM mytable);

SELECT COUNT(*) as Registros, country as pais
  FROM mytable
  GROUP BY country;

SELECT *
  FROM mytable
  ORDER BY postalZip
  LIMIT 10;

DELETE FROM mytable
  WHERE country = 'Singapore';

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

-- SECTION: >> Ejercicio 4 - Página 151
CREATE DATABASE IF NOT EXISTS db_store;
USE db_store;

CREATE TABLE IF NOT EXISTS db_store.salesman(
  salesman_id INT AUTO_INCREMENT UNIQUE,
  name VARCHAR(50),
  city VARCHAR(50),
  commission DECIMAL(10, 2),
  CONSTRAINT pk_salesman PRIMARY KEY(salesman_id)
);

CREATE TABLE IF NOT EXISTS db_store.customer (
  customer_id INT AUTO_INCREMENT UNIQUE,
  cust_name VARCHAR(50),
  city VARCHAR(50),
  grade NUMERIC(3),
  CONSTRAINT pk_customer PRIMARY KEY(customer_id)
);

CREATE TABLE IF NOT EXISTS db_store.orders (
  ord_no INT,
  purch_amt DECIMAL(8, 2),
  ord_date DATE,
  customer_id INT,
  salesman_id INT,
  CONSTRAINT pk_orders PRIMARY KEY(ord_no),
  CONSTRAINT fk_customer FOREIGN KEY (customer_id)
    REFERENCES customer(customer_id),
  CONSTRAINT fk_salesman FOREIGN KEY (salesman_id)
    REFERENCES salesman(salesman_id)
);
