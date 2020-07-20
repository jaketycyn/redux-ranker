import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  deleteMovie,
  fetchMovies,
  movielistSelector,
} from "../../slices/movielistSlice";
import ItemGridCard from "./ItemGridCard";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/MUIstyles";

import Spinner from "./Spinner";
//passdown via props specific information needed by the ItemGridCard for displaying

const ItemGrid = ({ isLoading, items }) => {
  const classes = useStyles();
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
    dispatch(deleteMovie((id: id)));
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.cardGridRoot}>
      <Grid container spacing={1}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <ItemGridCard
              title={item.title}
              id={item.id}
              backImg={item.poster_path}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemGrid;
