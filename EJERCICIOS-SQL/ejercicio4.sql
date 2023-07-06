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

INSERT INTO salesman (name, city, commission) VALUES
  ('John Doe', 'New York', 0.05),
  ('Jane Smith', 'Los Angeles', 0.07),
  ('David Johnson', 'Chicago', 0.06),
  ('Sarah Williams', 'Houston', 0.05),
  ('Michael Brown', 'Phoenix', 0.06),
  ('Karen Davis', 'Philadelphia', 0.08),
  ('Robert Miller', 'San Antonio', 0.07),
  ('Jennifer Wilson', 'San Diego', 0.06),
  ('William Anderson', 'Dallas', 0.05),
  ('Jessica Thomas', 'Austin', 0.06);

-- Inserts for the customer table
INSERT INTO customer (cust_name, city, grade) VALUES
  ('Alice Johnson', 'New York', 1),
  ('Bob Smith', 'Los Angeles', 2),
  ('Charlie Brown', 'Chicago', 3),
  ('Daisy Wilson', 'Houston', 1),
  ('Ethan Davis', 'Phoenix', 2),
  ('Fiona Thomas', 'Philadelphia', 3),
  ('George Anderson', 'San Antonio', 1),
  ('Hannah Miller', 'San Diego', 2),
  ('Isaac Williams', 'Dallas', 3),
  ('Julia Wilson', 'Austin', 1);

-- Inserts for the orders table
INSERT INTO orders (ord_no, purch_amt, ord_date, customer_id, salesman_id) VALUES
  (1001, 150.25, '2023-07-01', 1, 1),
  (1002, 99.99, '2023-07-02', 2, 3),
  (1003, 299.75, '2023-07-03', 3, 2),
  (1004, 50.50, '2023-07-04', 4, 4),
  (1005, 199.99, '2023-07-05', 5, 5),
  (1006, 75.00, '2023-07-06', 6, 7),
  (1007, 500.50, '2023-07-07', 7, 6),
  (1008, 129.99, '2023-07-08', 8, 9),
  (1009, 299.99, '2023-07-09', 9, 8),
  (1010, 199.50, '2023-07-10', 10, 10);

SELECT COUNT(*) AS Referencias 
  FROM orders;

SELECT DISTINCT cust_name 
  FROM customer;

SELECT *
  FROM salesman
  ORDER BY commission DESC; 

SELECT *
  FROM customer
  ORDER BY customer_id ASC
  LIMIT 5;

SELECT *
  FROM orders
  WHERE purch_amt = (SELECT MIN(purch_amt) FROM orders);

SELECT *
  FROM orders
  WHERE purch_amt = (SELECT MAX(purch_amt) FROM orders);
