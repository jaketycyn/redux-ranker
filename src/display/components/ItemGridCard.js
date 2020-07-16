import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/MUIstyles";

const ItemGridCard = ({ title, backImg }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        image={"https://image.tmdb.org/t/p/w220_and_h330_face/" + backImg}
        title={title}
        className={classes.cardMedia}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemGridCard;
