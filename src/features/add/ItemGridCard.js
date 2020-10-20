import React, { useState } from "react";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";

import { Button } from "../../display/components/Buttons";
import { StyledBaseDiv, StyledContentDiv } from "../../display/components/Divs";
import { StyledImg } from "../../display/components/Imgs";
import { StyledTitle } from "../../display/components/Text";
import { deleteMovie } from "../../redux/slices/movielistSlice";

import styled from "styled-components";

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
  movie_id,
  movie_title,
  movie_poster_path,
  movie_releaseYear,
  movie_overview,
  addItem,
  deleteItem,
}) => {
  const [added, setAdded] = useState(false);
  //const movieYear = releaseYear.slice(0, 4);

  //adding ellipsesis for multiple line overviews
  const addItemToList = () => {
    addItem(movie_id, movie_title, movie_poster_path, movie_overview);
    setAdded(!added);
  };

  const newOverview = movie_overview.slice(0, 125);
  //console.log(newOverview);
  const newOverviewIndex = newOverview.lastIndexOf(" ");
  const resliceOverview = newOverview.slice(0, newOverviewIndex);
  const finalOverview = resliceOverview.concat("...");

  //adding Ellipsis for multiple line titles

  const newTitle = movie_title.slice(0, 46);
  //console.log(newOverview);
  const newTitleIndex = newTitle.lastIndexOf(" ");
  const resliceTitle = newTitle.slice(0, newOverviewIndex);
  const ellipsisTitle = resliceTitle.concat("...");

  //console.log(finalOverview);
  //const newText = movie_overview.find(" ")
  /* removed for now can add back in on backside of card or when i want to add in more sizes/showing txt only on desktop
  <StyledOverview>{finalOverview}</StyledOverview> */
  const renderItemCard = () => {
    if (movie_title.length >= 46) {
      return (
        <StyledBaseDiv name="BaseDiv">
          <StyledImg
            src={"https://image.tmdb.org/t/p/w500" + movie_poster_path}
            movie_title={movie_title}
            alt="movie image"
          />
          <StyledContentDiv>
            <StyledTitle>{ellipsisTitle}</StyledTitle>
            <StyledBottomDivLeftButton>
              <Button
                add
                added={added}
                onClick={(e) => addItemToList()}
                style={{ backgroundColor: "red" }}
              >
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
            src={"https://image.tmdb.org/t/p/w500" + movie_poster_path}
            movie_title={movie_title}
            alt="movie image"
          />
          <StyledContentDiv>
            <StyledTitle>{movie_title}</StyledTitle>
            <StyledBottomDivLeftButton>
              {added ? (
                <Button
                  add
                  onClick={(e) => addItemToList( )}
                  added={added}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  add
                  onClick={(e) => addItemToList( )}
                  added={added}
                >
                  Add
                </Button>
              )}
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
