require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

//by using the pool we can run quieries with postgres
const db = require("./db");

//middleware
app.use(cors());

//Anytime when building a fullstack application. You need to get data from the client side. The only way to get data from the client side is to get it from the request.body object.

//comes built in express
//when we send a request it takes this information thats in the body and attach it to our req object as req.body.
app.use(express.json()); //req.body

//ROUTES//

//!TABLE movies
//add a movie to TABLE movies
app.post("/movies", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO movies (movie_id, movie_title) values ($1, $2)returning *",
      [
        req.body.movie_id,
        req.body.movie_title,
        // req.body.movie_release_date,
        // req.body.movie_poster_path,
        // req.body.movie_movie_overview,

      ]
    );

    console.log(results);
    res.status(200).json({
      status: "success",
      data: {
        movies: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//get all movies
app.get("/movies", async (req, res) => {
  try {
    const results = await db.query("select * from movies");
    console.log(results);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        movies: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//get a movie
app.get("/movies/:movie_id", async (req, res) => {
  console.log(req.params.movie_id);
  try {
    const results = await db.query(
      "SELECT * FROM movies WHERE movie_id=$1",
      [req.params.movie_id]
    );
    console.log(results.rows);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        movies: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});





//!TABLE user_movies 
//add a movie to TABLE user_movies
app.post("/user_movies", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO movies (movie_id, movie_title) values ($1, $2)returning *",
      [
        req.body.movie_id,
        req.body.movie_title,
        // req.body.movie_release_date,
        // req.body.movie_poster_path,
        // req.body.movie_movie_overview,

      ]
    );

    console.log(results);
    res.status(200).json({
      status: "success",
      data: {
        movies: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});

//need to change table to user_movies and add in protection of user_id for deleting movie from this table. So other user's movies of the same ID are not removed.
// delete a movie
app.delete("/movies/:movie_id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM movies WHERE movie_id = $1", [req.params.movie_id,]);
    res.status(204).json({
      status: "Success"
    })
  } catch (err) {
    console.error(err.message)
  }
});

// update a movie
app.put("/user_movielists/:movie_id", async (req, res) => {
  try {
    const results = await db.query("UPDATE user_movielists SET ");
  } catch (err) {
    console.error(err.message);
  }
});
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});

// delete a movie
app.delete("/movies/:movie_id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM movies WHERE movie_id = $1", [req.params.movie_id,]);
    res.status(204).json({
      status: "Success"
    })
  } catch (err) {
    console.error(err.message)
  }
});




//!TABLE user_movies 
app.post("/users", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO users (user_id, user_username, user_name_first,user_name_last, user_dob, user_email) values ($1, $2, $3, $4, $5, $6)returning *",
      [
        req.body.user_id,
        req.body.user_username,
        req.body.user_name_first,
        req.body.user_name_last,
        req.body.user_dob,
        req.body.user_email
      ]
    );
    console.log(results);
    res.status(200).json({
      status: "success",
      data: {
        movies: results.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});