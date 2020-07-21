import React from "react";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { useDispatch } from "react-redux";
import { addMovie } from "../../slices/movielistSlice";
import useStyles from "../styles/MUIstyles";

const ItemGridCard = ({ id, title, backImg, addItem, deleteItem }) => {
  // const classes = useStyles();
  return (
    <div className="flex shadow-lg mx-1 my-1 h-40 md:h-56 lg:h-64  ">
      <img
        src={"https://image.tmdb.org/t/p/w500" + backImg}
        title={title}
        className="h-auto w-5/12 object-scale-down"
        alt="movie image"
      />
      <div className="py-12 px-6 max-w-xl">
        <h2 className="text-xl text-gray-800 font-bold mr-auto text-center ">
          {title}
        </h2>
        <p>hi</p>
      </div>
    </div>

    // <div class="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64">
    // <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag">
    // <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
    //    <div class="flex items-center">
    //       <h2 class="text-xl text-gray-800 font-medium mr-auto">Your Travel Buddy</h2>
    //       <p class="text-gray-800 font-semibold tracking-tighter">
    //          only
    //          <i class="text-gray-600 line-through">60$</i>
    //          48$
    //       </p>
    //    </div>
    //    <p class="text-sm text-gray-700 mt-4">
    //       Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
    //    </p>
    //    <div class="flex items-center justify-end mt-4 top-auto">
    //       <button class="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline">Delete</button>
    //       <button class=" bg-gray-200 text-blue-600 px-2 py-2 rounded-md mr-2">Edit</button>
    //       <button class=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">Publish</button>
    //    </div>
    // </div>
    // </div>

    // <Card raised className={classes.card} xs={12} sm={12} md={6} lg={4}>
    //   <CardMedia
    //     image={"https://image.tmdb.org/t/p/original" + backImg}
    //     title={title}
    //     className={classes.cardMedia}
    //   />
    //   <CardContent className={classes.cardContent}>
    //     <Typography noWrap variant="h5" component="h5">
    //       {title}
    //     </Typography>
    //     {/* Delete Button - later on add styling for choosing when to display which one - both shouldnt' show at the same time */}
    //     <IconButton
    //       className={classes.addButton}
    //       color="default"
    //       size="medium"
    //       onClick={() => addItem(id, title, backImg)}
    //     >
    //       <AddIcon fontSize="inherit" />
    //     </IconButton>

    //     <IconButton
    //       className={classes.addButton}
    //       color="default"
    //       size="medium"
    //       onClick={() => deleteItem(id)}
    //     >
    //       <DeleteIcon fontSize="inherit" />
    //     </IconButton>
    //   </CardContent>
    // </Card>
  );
};

export default ItemGridCard;
