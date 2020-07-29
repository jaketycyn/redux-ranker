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

const StyledBaseDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, 20%) 1fr;
  margin: 0.25rem;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.25);
  }

  @media ${(props) => props.theme.mediaQueries.md} {
    grid-template-columns: minmax(150px, 20%) 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.lg} {
    grid-template-columns: minmax(155px, 20%) 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.xl} {
    grid-template-columns: minmax(300px, 40%) 1fr;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  margin: 2px;
  max-width: 12em;
  display: flex;

  @media ${(props) => props.theme.mediaQueries.md} {
    max-width: 14em;
  }

  @media ${(props) => props.theme.mediaQueries.lg} {
    max-width: 16em;
  }

  @media ${(props) => props.theme.mediaQueries.xl} {
    max-width: 18em;
  }
`;

const StyledContentDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 60% 40%;
  max-height: 30em;
`;

const StyledTitle = styled.h1`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 1;
  align-items: center;
  text-align: center;
  justify-self: center;
  font-size: 1rem;
  font-weight: 700;
  color: black;
  padding-top: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media ${(props) => props.theme.mediaQueries.sm} {
    font-size: 1.25rem;
  }
  @media ${(props) => props.theme.mediaQueries.md} {
    font-size: 1.5rem;
  }
  @media ${(props) => props.theme.mediaQueries.lg} {
    font-size: 2rem;
  }
  @media ${(props) => props.theme.mediaQueries.xl} {
    font-size: 2.5rem;
  }
`;

const StyledOverview = styled.p`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 2;
  font-size: 1rem;
  font-weight: 600;
  color: black;
  padding: 0.5rem;
  overflow: hidden;
  display: none;

  @media ${(props) => props.theme.mediaQueries.lg} {
    display: flex;
  }
`;

//might be able to do styling just within the buttons themselves and ignore the need for divs/wrappers for the buttons

// const StyledBottomDivLeftButton = styled.div`
//   display: grid;
//   grid-column: 1;
//   justify-items: end;
//   grid-row: 2;
//   align-items: center;
//   justify-content: space-between;
//   margin-left: 0.5rem;
// `;

// const StyledBottomDivRightButton = styled.div`
//   display: grid;
//   grid-column: 2;
//   justify-items: start;
//   grid-row: 2;
//   align-items: center;
//   justify-content: space-between;
//   margin-right: 0.5rem;
// `;

const ItemGridCard = ({
  id,
  title,
  backImg,
  releaseYear,
  overview,
  addItem,
  deleteItem,
}) => {
  //const movieYear = releaseYear.slice(0, 4);
  const newOverview = overview.slice(0, 125);
  //console.log(newOverview);
  const newOverviewIndex = newOverview.lastIndexOf(" ");
  const resliceOverview = newOverview.slice(0, newOverviewIndex);
  const finalOverview = resliceOverview.concat("...");
  //console.log(finalOverview);
  //const newText = overview.find(" ")

  /* removed for now can add back in on backside of card or when i want to add in more sizes/showing txt only on desktop
  <StyledOverview>{finalOverview}</StyledOverview> */

  return (
    <StyledBaseDiv name="BaseDiv">
      <StyledImg
        src={"https://image.tmdb.org/t/p/w500" + backImg}
        title={title}
        alt="movie image"
      />
      <StyledContentDiv>
        <StyledTitle>{title}</StyledTitle>
        <Button add onClick={(e) => addItem(id, title, backImg)}>
          Add
        </Button>
        <Button details onClick={() => console.log("give me more deats")}>
          Details
        </Button>
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
