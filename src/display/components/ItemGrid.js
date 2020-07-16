import React from "react";
import ItemGridCard from "./ItemGridCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

//passdown via props specific information needed by the ItemGridCard for displaying

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const ItemGrid = ({ isLoading, items }) => {
  const classes = useStyles();
  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container space={4}>
        {items.map((item) => (
          <Grid item key={item} xs={12} sm={6} md={4} lg={3}>
            <ItemGridCard title={item.title} backImg={item.poster_path} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemGrid;
