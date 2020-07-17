import React, { useState, useEffect } from "react";
import ItemGridCard from "./ItemGridCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../styles/MUIstyles";

//passdown via props specific information needed by the ItemGridCard for displaying

const ItemGrid = ({ isLoading, items }) => {
  const classes = useStyles();
  const [selectedItems, setSelectedItems] = useState([]);

  console.log(selectedItems);

  const addItem = (id, title, backImg) => {
    setSelectedItems((oldData) => [
      ...oldData,
      { id: id, title: title, backImg: backImg },
    ]);
  };

  useEffect(() => {
    const data = localStorage.getItem("user-items");
    if (data) {
      setSelectedItems([JSON.parse([data])]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user-items", JSON.stringify(selectedItems));
  });

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
