import React from "react";
import { useDispatch } from "react-redux";
import { changeRank } from "../../slices/movielistSlice";
import ItemGridCard from "../../display/components/ItemGridCard";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteMovie } from "../../slices/movielistSlice";
import useStyles from "../../display/styles/MUIstyles";
import { Button } from "../../display/components/Buttons";

export const Movie = ({ item, id, option, combatants, rankedItems }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  function updateRank() {
    dispatch(
      changeRank({
        id: id,
        option: option,
        combatants: combatants,
        rankedItems: rankedItems,
      })
    );
  }

  //function combines
  //keeping to demonstrate how to combine dispatches for future uses
  function combinedUpdater() {
    updateRank();
  }

  const deleteItem = (id) => {
    dispatch(deleteMovie((id: id)));
  };

  //fix movie card size for bigger right now taking up whole screen on bigger screens need to set limits to width/height

  return (
    <Card raised className={classes.card} xs={12} sm={12} md={6} lg={4}>
      <CardMedia
        image={"https://image.tmdb.org/t/p/w220_and_h330_face/" + item.backImg}
        title={item.title}
        className={classes.cardMedia}
      />
      <CardContent className={classes.cardContent}>
        <Typography noWrap variant="h5" component="h5">
          {item.title}
        </Typography>
        {/* Delete Button - later on add styling for choosing when to display which one - both shouldnt' show at the same time */}
        <Button primary>
          <AddIcon onClick={updateRank} fontSize="inherit" />
        </Button>

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

// add in later once we get the hookup to the api
//<ItemGridCard title={item.title} backImg={item.poster_path} />
