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

  const addItem = (id, title, backImg) => {
    //find method prevents repetive movies being added to list
    if (movies.find((movie) => movie.id === id)) {
      prompt("Movie is already added");
      console.log("movie already in list");
    } else {
      dispatch(
        addMovie({
          id: id,
          title: title,
          backImg: backImg,
        })
      );
      addItemServer(id, title);
    }
  };
  

  const addItemServer = async ( id, title) => {
    //Order of params dictates what is used for some reason. Keep an eye out.
    //possible issue was caused by referencing this function inside ItemGridCard component. Still keep an eye out.
    try {
      const response = await MovieFinder.post("/", {
        movie_id: id,
        user_id: 2,
        movie_listid: 99,
        movie_title: title,
        movie_rank: 0,
        // id, title, backImg, 
      })
      console.log(response)
    } catch(err) {
      console.error(err.message)
    }
    console.log("addMovieServer fired")
  }

  const deleteItem = (id) => {
    dispatch(deleteMovie(id));
    
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <GreaterGrid name="greaterGrid">
      {items.map((item) => (
        <ItemGridCard
          title={item.title}
          id={item.id}
          backImg={item.poster_path}
          releaseYear={item.release_date}
          overview={item.overview}
          addItem={addItem}
          addItemServer={addItemServer}
          deleteItem={deleteItem}
          
        />
      ))}
    </GreaterGrid>
  );
};

export default ItemGrid;
