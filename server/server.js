require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookeParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
//by using the pool we can run quieries with postgres
const db = require("./db");

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: "secretcode",
  resave: true,
  saveUninitialized: true
}))
app.use(cors({
  origin: "http://localhost:3000", //<-- location of the react app were connecting to
  credentials: true
}));

//Anytime when building a fullstack application. You need to get data from the client side. The only way to get data from the client side is to get it from the request.body object.

//comes built in express
//when we send a request it takes this information thats in the body and attach it to our req object as req.body.
app.use(express.json()); //req.body

//USER ROUTES
app.post("/login", (req, res) => {
  console.log(req.body);
})

app.post("/register", (req, res) => {
  console.log(req.body);
})

app.get("/user", (req, res) => {
  
})

//!TABLE users 
app.post("/users", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO users (user_username,user_password, user_email) values ($1, $2, $3)returning *",
      [
        req.body.user_username,
        req.body.user_password,
        req.body.user_email
        //user_name_first,user_name_last, user_dob for above statement in final
        // req.body.user_name_first,
        // req.body.user_name_last,
        // req.body.user_dob,
      ]
    );
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


//ROUTES//

//!TABLE movies
//add a movie to TABLE movies n 
app.post("/movies", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO movies (movie_id, movie_title, movie_poster_path, movie_overview) values ($1, $2, $3, $4)returning *",
      [
        req.body.movie_id,
        req.body.movie_title,
        req.body.movie_poster_path,
        req.body.movie_overview,
      ]
    );
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


//delete a movie
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

// TODO: get all movies
// app.get("/movies", async (req, res) => {
//   try {
//     const results = await db.query("select * from movies");
//     console.log(results);

//     res.status(200).json({
//       status: "success",
//       results: results.rows.length,
//       data: {
//         movies: results.rows,
//       },
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });


// TODO: get a movie
// app.get("/movies/:movie_id", async (req, res) => {
//   console.log(req.params.movie_id);
//   try {
//     const results = await db.query(
//       "SELECT * FROM movies WHERE movie_id=$1",
//       [req.params.movie_id]
//     );
//     console.log(results.rows);

//     res.status(200).json({
//       status: "success",
//       results: results.rows.length,
//       data: {
//         movies: results.rows,
//       },
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//!TABLE user_movie_list 
//add a movie_list to TABLE user_movie_list
app.post("/user_movie_list", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO user_movie_list (list_id, list_name, list_created_on, list_last_used, list_owner) values ($1, $2, $3, $4, $5) returning *",
      [
        req.body.list_id,
        req.body.list_name,
        req.body.list_created_on,
        req.body.list_last_used,
        req.body.list_owner,
      ]
    );

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

//!TABLE user_movies 
//add a movie to TABLE user_movies
app.post("/user_movies", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO user_movies (user_movie_id,user_movie_list_id,user_movie_user_id, user_movie_rank) values ($1, $2, $3, $4)returning *",
      [
        req.body.user_movie_id,
        req.body.user_movie_list_id,
        req.body.user_movie_user_id,
        req.body.user_movie_rank,
      ]
    );
    res.status(200).json({
      status: "success",
      data: {
        movies: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err.message);
  }
});

//Get movie from Table user_movies
app.get("/user_movies/:user_movie_id/:user_movie_list_id/:user_movie_user_id", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM user_movies WHERE user_movie_id=$1 AND user_movie_list_id=$2 AND user_movie_user_id=$3",
      [
         req.params.user_movie_id,
         req.params.user_movie_list_id,
         req.params.user_movie_user_id
      ]
    );
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



//TODO: need to change table to user_movies and add in protection of user_id for deleting movie from this table. So other user's movies of the same ID are not removed.
// DELETE A MOVIE from user_movies
app.delete("/user_movies/:user_movie_id/:user_movie_list_id/:user_movie_user_id", async (req, res) => {
  try {
    const results = await db.query(
      "DELETE FROM user_movies WHERE user_movie_id=$1 AND user_movie_list_id=$2 AND user_movie_user_id=$3",
      [
        req.params.user_movie_id,
        req.params.user_movie_list_id,
        req.params.user_movie_user_id
      ]
    );
    console.log(results.rows[0]);

    // res.status(200).json({
    //   status: "success",
    //   results: results.rows.length,
    //   data: {
    //     movies: results.rows,
    //   },
    // });
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE ALL
app.delete("/user_movies/:user_movie_list_id/:user_movie_user_id", async (req, res) => {
  try {
    const results = await db.query(
      "DELETE FROM user_movies WHERE user_movie_list_id=$1 AND user_movie_user_id=$2",
      [
        req.params.user_movie_list_id,
        req.params.user_movie_user_id
      ]
    );
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

// UPDATE THE RANK OF A MOVIE via ChangeRank Redux Functionality
//Removed used of user_movie_potential_rank for the current time
//Might rely on redux/local state storage for potential rank and only place 'set in stone' ranks on items to database. 
app.put("/user_movies/:user_movie_rank/:user_movie_id/:user_movie_list_id/:user_movie_user_id", async (req, res) => {
  try {
    const results = await db.query("UPDATE user_movies SET user_movie_rank=$1 WHERE user_movie_id=$2 AND user_movie_list_id=$3 AND user_movie_user_id=$4", 
    [
      req.params.user_movie_rank,
      req.params.user_movie_id,
      req.params.user_movie_list_id,
      req.params.user_movie_user_id
    ])
    console.log(results)
  } catch (err) {
    console.log(err.message);
  }
});



const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});