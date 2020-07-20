import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDispatch } from "react-redux";
import { addMovie } from "../../slices/movielistSlice";
import useStyles from "../styles/MUIstyles";

const ItemGridCard = ({ id, title, backImg, addItem, deleteItem }) => {
  const classes = useStyles();
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
        {/* Delete Button - later on add styling for choosing when to display which one - both shouldnt' show at the same time */}
        <IconButton
          className={classes.addButton}
          color="default"
          size="medium"
          onClick={() => addItem(id, title, backImg)}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>

        <IconButton
          className={classes.addButton}
          color="default"
          size="medium"
          onClick={() => deleteItem(id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ItemGridCard;
