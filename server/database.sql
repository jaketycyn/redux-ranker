--Draft Version
CREATE TABLE users
(
    user_id BIGSERIAL,
    user_username VARCHAR(50) UNIQUE NOT NULL,
    user_name_first VARCHAR(50) NOT NULL,
    user_name_last VARCHAR(50) NOT NULL,
    user_dob DATE,
    user_email VARCHAR(200) UNIQUE NOT NULL,
    user_password VARCHAR(200) NOT NULL,
    -- user_password 
    PRIMARY KEY
    (user_id)
);

CREATE TABLE movies
(
    movie_id int UNIQUE NOT NULL,
    movie_title VARCHAR(150) UNIQUE NOT NULL,
    movie_release_date DATE,
    movie_poster_path TEXT,
    movie_overview TEXT,
    PRIMARY KEY
    (movie_id)
)

--look into JOIN tables and see if theres a difference
-- ?Primary key is 3 values to allow for us to create multiple of the same lists (ex: Top Romantic Movies) and track in the future what movies are added by multiple users because it'll have a set user_movie_list_id by us. 
CREATE TABLE user_movies
(
    user_movie_id int NOT NULL,
    user_movie_list_id int NOT NULL,
    user_movie_user_id int NOT NULL,
    user_movie_rank DECIMAL,
    PRIMARY KEY
    (user_movie_id, user_movie_list_id, user_movie_user_id),
    FOREIGN KEY (user_movie_id) REFERENCES movies (movie_id),
    FOREIGN KEY (user_movie_list_id) REFERENCES user_movie_list (list_id),
    FOREIGN KEY (user_movie_user_id) REFERENCES users (user_id)
);

CREATE TABLE user_movie_list
(
    list_id serial,
    list_name VARCHAR(50) NOT NULL,
    list_created_on TIMESTAMP NOT NULL,
    list_last_used TIMESTAMP,
    list_owner int,
    PRIMARY KEY (list_id),
    FOREIGN KEY (list_owner) REFERENCES users (user_id)

)

    --Final Version Below: - seperating the user_movies table into two distinct tables: 1) movies & 2) user_movies