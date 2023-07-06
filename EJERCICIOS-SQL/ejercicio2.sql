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

