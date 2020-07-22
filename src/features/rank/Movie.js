import React from "react";
import { useDispatch } from "react-redux";
import { changeRank, deleteMovie } from "../../slices/movielistSlice";
import styled from "styled-components";

import ItemGridCard from "../../display/components/ItemGridCard";
import { Button } from "../../display/components/Buttons";

export const Movie = ({ item, id, option, combatants, rankedItems }) => {
  const dispatch = useDispatch();

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

  return (
    <StyledMovieCardDiv>
      <StyledImg
        src={"https://image.tmdb.org/t/p/w500" + item.backImg}
        title={item.title}
        alt="movie image"
      />
      <ButtonLeft>
        <Button choose>Choose</Button>
      </ButtonLeft>
      <ButtonRight>
        <Button remove>remove</Button>
      </ButtonRight>
    </StyledMovieCardDiv>
  );
};

const StyledMovieCardDiv = styled.div`
  display: grid;
  grid-template-rows: 40% 40% 20%;
  grid-template-areas:
    "posterImg" "posterImg"
    "posterImg" "posterImg"
    "buttonLeft" "buttonRight";

  align-items: center;
  margin: 0.25rem;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.25);
  }
`;

const StyledImg = styled.img`
  display: grid;
  grid-area: "posterImg";
`;

const ButtonLeft = styled.div`
  display: grid;
  grid-area: "buttonLeft";
`;

const ButtonRight = styled.div`
  display: grid;
  grid-area: "buttonRight";
`;
//copied over ItemGridCard w/ overview
// <StyledBaseDiv name="BaseDiv">
//       <StyledImg
//         src={"https://image.tmdb.org/t/p/w500" + item.backImg}
//         title={item.title}
//         alt="movie image"
//       />
//       <StyledContentDiv>
//         <StyledTitle>{item.title}</StyledTitle>

//         <StyledBottomDivLeftButton>
//           <Button add onClick={(e) => updateRank(id)}>
//             Add
//           </Button>
//         </StyledBottomDivLeftButton>
//         <StyledBottomDivRightButton>
//           <Button details onClick={() => console.log("give me more deats")}>
//             Details
//           </Button>
//         </StyledBottomDivRightButton>
//       </StyledContentDiv>
//     </StyledBaseDiv>

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

// const StyledImg = styled.img`
//   position: relative;
//   width: 100%;
// `;

const StyledContentDiv = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
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

// const ItemGridCard = ({
//   id,
//   title,
//   backImg,
//   releaseYear,
//   overview,
//   addItem,
//   deleteItem,
// }) => {
