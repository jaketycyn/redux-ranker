-- possible table names
--user_info, movie_info, user_rankings

CREATE TABLE users
(
    id serial,
    username VARCHAR(25) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE movies
(
    id serial,
    title TEXT NOT NULL,
    poster_path TEXT,
    genre integer
    ARRAY,
    adult boolean,
    release_date date,
    PRIMARY KEY
    (id),
);
    --CURRENTLY CANT USE FOREIGN KEY SINCE MOVIE DATA ISN'T IN ITS OWN TABLE BUT INSTEAD PULLED FROM API
    --FINAL VERSION DOESNT' REQUIRE TITLE EITHER BUT CURRENT VERSION DOES
    -- true version
    CREATE TABLE user_movielists
    (
        movie_id FOREIGN KEY NOT NULL,
        movie_userid FOREIGN KEY  NOT NULL,
        movie_listid INTEGER NOT NULL,
      
        movie_rank INTEGER NOT NULL,
    )
    --test version
    CREATE TABLE user_movielists
    (
        movie_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        movie_listid INTEGER NOT NULL,
        movie_title TEXT NOT NULL,
        movie_rank INTEGER NOT NULL
    );