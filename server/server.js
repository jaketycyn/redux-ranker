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

//get all movies
app.get("/user_movielists", async (req, res) => {
  try {
    const results = await db.query("select * from user_movielists");
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
app.get("/user_movielists/:movie_id", async (req, res) => {
  console.log(req.params.movie_id);
  try {
    const results = await db.query(
      "SELECT * FROM user_movielists WHERE movie_id=$1",
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

//add a movie
app.post("/user_movielists", async (req, res) => {
  console.log(req.body);
  try {
    const results = await db.query(
      "INSERT INTO user_movielists (movie_id, user_id, movie_listid, movie_title, movie_rank) values ($1, $2, $3, $4, $5)returning *",
      [
        req.body.movie_id,
        req.body.user_id,
        req.body.movie_listid,
        req.body.movie_title,
        req.body.movie_rank,
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

app.delete("/user_movielists/:movie_id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM user_movielists WHERE movie_id = $1", [req.params.movie_id])
  } catch (err) {
    console.error(err.message)
  }
});
