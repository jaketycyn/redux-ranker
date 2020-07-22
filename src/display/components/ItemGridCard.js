import React from "react";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import useStyles from "../styles/MUIstyles";

import { Button } from "./Buttons";

import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 0.25rem 0.25rem;
  height: 250px;
`;

const StyledBaseDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 40%) 1fr;
  max-height: 250px;
  margin: 0.25rem;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.25);
  }
`;

const StyledImg = styled.img`
  position: relative;
  width: 100%;
`;

const StyledContentDiv = styled.div`
  display: grid;
  grid-template-columns: 3;
  grid-template-rows: 35% 45% 20%;
  max-height: 250px;
`;

const StyledTitle = styled.h1`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row: 1;
  align-items: center;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: black;
  margin: 4px;
  padding: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
//use in the details
// const StyledYear = styled.span`
//   display: grid;
//   grid-column: 1/3;
//   grid-row: 2/3;
//   justify-content: center;
//   font-size: 1.25rem;
//   font-weight: 700;
// `;
// <StyledYear> {movieYear}</StyledYear>

const StyledOverview = styled.p`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row: 2;
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
  margin: 1rem;
  padding: 0.5rem;
  overflow: hidden;
`;

const StyledBottomDivLeftButton = styled.div`
  display: grid;
  grid-column: 1;
  justify-items: end;
  grid-row: 3;
  align-items: center;
  justify-content: space-between;
  margin-left: 2rem;
`;

const StyledBottomDivRightButton = styled.div`
  display: grid;
  grid-column: 3;
  justify-items: start;
  grid-row: 3;
  align-items: center;
  justify-content: space-between;
  margin-right: 2rem;
`;

const ItemGridCard = ({
  id,
  title,
  backImg,
  releaseYear,
  overview,
  addItem,
  deleteItem,
}) => {
  const movieYear = releaseYear.slice(0, 4);

  const newOverview = overview.slice(0, 125);
  console.log(newOverview);
  const newOverviewIndex = newOverview.lastIndexOf(" ");
  const resliceOverview = newOverview.slice(0, newOverviewIndex);
  const finalOverview = resliceOverview.concat("...");
  console.log(finalOverview);
  //const newText = overview.find(" ")
  return (
    <StyledBaseDiv name="BaseDiv">
      <StyledImg
        src={"https://image.tmdb.org/t/p/w500" + backImg}
        title={title}
        alt="movie image"
      />
      <StyledContentDiv>
        <StyledTitle>{title}</StyledTitle>
        <StyledOverview>{finalOverview}</StyledOverview>
        <StyledBottomDivLeftButton>
          <Button add onClick={(e) => addItem(id, title, backImg)}>
            Add
          </Button>
        </StyledBottomDivLeftButton>
        <StyledBottomDivRightButton>
          <Button details onClick={() => console.log("give me more deats")}>
            Details
          </Button>
        </StyledBottomDivRightButton>
      </StyledContentDiv>
    </StyledBaseDiv>

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
