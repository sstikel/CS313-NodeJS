ALTER TABLE lib.library
DROP COLUMN rating,
DROP COLUMN genre,
DROP COLUMN length,
DROP COLUMN author,
DROP COLUMN user_id;

--isbn will also be used to store IMDB IDs
ALTER TABLE lib.library
ADD COLUMN author VARCHAR,
ADD COLUMN isbn VARCHAR;

--update column type of author in lib.library
ALTER TABLE lib.library
ALTER COLUMN author TYPE VARCHAR;

CREATE TABLE lib.lookup(
  user_id INT4 NOT NULL,
  item_id INT4 NOT NULL,
  qty INT4 
);


DROP TABLE lib.rating;

DROP TABLE lib.genre;

DROP TABLE lib.author;

ALTER TABLE lib.lookup
ALTER COLUMN user_id REFERENCES lib.user(id),
ALTER COLUMN item_id REFERENCES lib.library(id);