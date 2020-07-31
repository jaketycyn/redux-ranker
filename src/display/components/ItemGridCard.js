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
  grid-template-columns: minmax(6.25em, 20%) 1fr;
  margin: 0.1rem;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.mainLight};
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.25);
  }

  @media ${(props) => props.theme.mediaQueries.sm} {
    grid-template-columns: minmax(7em, 40%) 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.md} {
    grid-template-columns: minmax(9em, 40%) 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.lg} {
    grid-template-columns: minmax(12.5em, 40%) 1fr;
  }

  @media ${(props) => props.theme.mediaQueries.xl} {
    grid-template-columns: minmax(16em, 40%) 1fr;
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
  grid-template-rows: 65% 35%;
  max-height: 30em;
`;

const StyledTitle = styled.h1`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 1;
  margin: 0.5em;
  align-items: center;
  text-align: center;
  justify-self: center;
  font-size: 1rem;
  font-weight: 700;
  color: black;
  padding-top: 0.5rem;
  overflow: hidden;

  @media ${(props) => props.theme.mediaQueries.md} {
    font-size: 1.25rem;
  }
  @media ${(props) => props.theme.mediaQueries.lg} {
    font-size: 1.5rem;
  }
  @media ${(props) => props.theme.mediaQueries.xl} {
    font-size: 2rem;
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

const StyledBottomDivLeftButton = styled.div`
  display: grid;
  grid-column: 1;
  grid-row: 2;
`;

const StyledBottomDivRightButton = styled.div`
  display: grid;
  grid-column: 2;
  grid-row: 2;
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
  //const movieYear = releaseYear.slice(0, 4);

  //adding ellipsesis for multiple line overviews

  const newOverview = overview.slice(0, 125);
  //console.log(newOverview);
  const newOverviewIndex = newOverview.lastIndexOf(" ");
  const resliceOverview = newOverview.slice(0, newOverviewIndex);
  const finalOverview = resliceOverview.concat("...");

  //adding Ellipsis for multiple line titles

  const newTitle = title.slice(0, 45);
  //console.log(newOverview);
  const newTitleIndex = newTitle.lastIndexOf(" ");
  const resliceTitle = newTitle.slice(0, newOverviewIndex);
  const ellipsisTitle = resliceTitle.concat("...");

  //console.log(finalOverview);
  //const newText = overview.find(" ")

  /* removed for now can add back in on backside of card or when i want to add in more sizes/showing txt only on desktop
  <StyledOverview>{finalOverview}</StyledOverview> */
  const renderItemCard = () => {
    if (title.length >= 45) {
      return (
        <StyledBaseDiv name="BaseDiv">
          <StyledImg
            src={"https://image.tmdb.org/t/p/w500" + backImg}
            title={title}
            alt="movie image"
          />
          <StyledContentDiv>
            <StyledTitle>{ellipsisTitle}</StyledTitle>
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
      );
    } else {
      return (
        <StyledBaseDiv name="BaseDiv">
          <StyledImg
            src={"https://image.tmdb.org/t/p/w500" + backImg}
            title={title}
            alt="movie image"
          />
          <StyledContentDiv>
            <StyledTitle>{title}</StyledTitle>
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
      );
    }
  };
  return <div>{renderItemCard()}</div>;
};

export default ItemGridCard;
