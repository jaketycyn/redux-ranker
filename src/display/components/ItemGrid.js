import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  deleteMovie,
  fetchMovies,
  movielistSelector,
} from "../../redux/slices/movielistSlice";
import ItemGridCard from "./ItemGridCard";
import { GreaterGrid } from "./Divs";
import MovieFinder  from "../../apis/MovieFinder";

import Spinner from "./Spinner";
//passdown via props specific information needed by the ItemGridCard for displaying

const ItemGrid = ({ isLoading, items }) => {
  const dispatch = useDispatch();
  const { movies } = useSelector(movielistSelector);

  //!!disabled useEffect for now cause i'm not retrieving anything from an api or external db
  // useEffect(() => {
  //   dispatch(fetchMovies());
  // }, [dispatch]);

  const addItem = (movie_id, movie_title, movie_poster_path, movie_overview) => {
    //find method prevents repetive movies being added to list
    if (movies.find((movie) => movie.id === movie_id)) {
      prompt("Movie is already added");
      console.log("movie already in list");
    } else {
      dispatch(
        addMovie({
          movie_id: movie_id,
          movie_title: movie_title,
          movie_poster_path: movie_poster_path,
          movie_overview: movie_overview
        })
      );
      addItemMovieDB(movie_id, movie_title, movie_poster_path, movie_overview);
      addItemUserMovieDB(movie_id);
    }
  };
  

  const addItemMovieDB = async ( movie_id, movie_title, movie_poster_path, movie_overview) => {
    //Order of params dictates what is used for some reason. Keep an eye out.
    //possible issue was caused by referencing this function inside ItemGridCard component. Still keep an eye out.
    try {
      const response = await MovieFinder.post("/movies", {
        movie_id: movie_id,
        movie_title: movie_title,
        movie_poster_path: movie_poster_path,
        movie_overview: movie_overview,
        // id, title, backImg, 
      })
      console.log(response)
    } catch(err) {
      console.log(err)
    }
    console.log("addItemMovieDB fired")
    console.log("movie_overview: "+ movie_overview)
  }

  

  const addItemUserMovieDB = async ( movie_id) => {
    //Order of params dictates what is used for some reason. Keep an eye out.
    //possible issue was caused by referencing this function inside ItemGridCard component. Still keep an eye out.
    try {
      // const response = await MovieFinder.post("/movies", {
      //   movie_id: id,
      //   movie_overview: "Stuff Happened",
      //   // id, title, backImg, 
      // })
      console.log("addItemUserMovieDB")
    } catch(err) {
      console.log(err)
    }
    console.log("addItemUserMovieDB fired")
  }

  const deleteItem = (movie_id) => {
    dispatch(deleteMovie(movie_id));
    
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <GreaterGrid name="greaterGrid">
      {items.map((item) => (
        <ItemGridCard
          movie_id={item.id}
          movie_title={item.title}
          movie_poster_path={item.poster_path}
          movie_releaseYear={item.release_date}
          movie_overview={item.overview}
          addItem={addItem}
          deleteItem={deleteItem}
        />
      ))}
    </GreaterGrid>
  );
};

export default ItemGrid;
