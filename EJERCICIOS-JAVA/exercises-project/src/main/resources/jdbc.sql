CREATE DATABASE IF NOT EXISTS db_jdbc;

USE db_jdbc;

CREATE TABLE
  IF NOT EXISTS db_jdbc.table1 (
    id_t1 INT AUTO_INCREMENT,
    name VARCHAR(50),
    surname VARCHAR(50),
    location VARCHAR(50),
    PRIMARY KEY (id_t1)
  );

CREATE TABLE
  IF NOT EXISTS db_jdbc.table2 (
    id_t2 INT AUTO_INCREMENT,
    name VARCHAR(50),
    surname VARCHAR(50),
    location VARCHAR(50),
    PRIMARY KEY (id_t2)
  );
