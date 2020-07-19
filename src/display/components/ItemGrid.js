import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  fetchMovies,
  movielistSelector,
} from "../../slices/movielistSlice";
import ItemGridCard from "./ItemGridCard";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles/MUIstyles";

//passdown via props specific information needed by the ItemGridCard for displaying

const ItemGrid = ({ isLoading, items }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { movies } = useSelector(movielistSelector);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const addItem = (id, title, backImg) => {
    //find method prevents repetive movies being added to list
    if (movies.find((movie) => movie.id === id)) {
      console.log("movie already in list");
    } else {
      dispatch(
        addMovie({
          id: id,
          title: title,
          backImg: backImg,
          rank: 0,
        })
      );
    }
  };
  // const addItem = (id, title, backImg) => {
  //   setSelectedItems((oldData) => [
  //     ...oldData,
  //     { id: id, title: title, backImg: backImg, rank: 0 },
  //   ]);
  // };

  return isLoading ? (
    <h1>Loading...</h1>
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
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemGrid;
