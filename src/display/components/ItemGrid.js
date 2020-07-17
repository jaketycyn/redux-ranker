import React from "react";
import ItemGridCard from "./ItemGridCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../styles/MUIstyles";

//passdown via props specific information needed by the ItemGridCard for displaying

const ItemGrid = ({ isLoading, items }) => {
  const classes = useStyles();
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <div className={classes.cardGridRoot}>
      <Grid container space={4}>
        {items.map((item) => (
          <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
            <ItemGridCard title={item.title} backImg={item.poster_path} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemGrid;
