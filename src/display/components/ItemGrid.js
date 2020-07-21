import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  deleteMovie,
  fetchMovies,
  movielistSelector,
} from "../../slices/movielistSlice";
import ItemGridCard from "./ItemGridCard";

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
    }
  };

  const deleteItem = (id) => {
    dispatch(deleteMovie(id));
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <ItemGridCard
          title={item.title}
          id={item.id}
          backImg={item.poster_path}
          addItem={addItem}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
};

export default ItemGrid;
