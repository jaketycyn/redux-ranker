import React from "react";

import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/MUIstyles";
import { useDispatch } from "react-redux";
import { addMovie } from "../../slices/movielistSlice";

const ItemGridCard = ({ title, id, backImg, addItem }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  // const addItem = (id, title, backImg) => {

  //   dispatch(
  //     addMovie({
  //       id: id,
  //       title: title,
  //       backImg: backImg,
  //       rank: 0,
  //     })
  //   );

  return (
    <Card raised className={classes.card} xs={12} sm={12} md={6} lg={4}>
      <CardMedia
        image={"https://image.tmdb.org/t/p/w220_and_h330_face/" + backImg}
        title={title}
        className={classes.cardMedia}
      />
      <CardContent className={classes.cardContent}>
        <Typography noWrap variant="h5" component="h5">
          {title}
        </Typography>
        <IconButton
          className={classes.addButton}
          color="default"
          size="medium"
          onClick={() => addItem(id, backImg, title)}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ItemGridCard;
