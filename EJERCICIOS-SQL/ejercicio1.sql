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

