import React from "react";
import { useDispatch } from "react-redux";
import { changeRank, deleteMovie, reRankMovie } from "../../redux/slices/movielistSlice";
import styled from "styled-components";

import { Button } from "../../display/components/Buttons";

export const Movie = ({
  item,
  id,
  option,
  combatants,
  rankedItems,
  totalRankedItems,
}) => {
  const dispatch = useDispatch();

  function updateRank() {
    dispatch(
      changeRank({
        id: id,
        option: option,
        combatants: combatants,
        rankedItems: rankedItems,
        totalRankedItems: totalRankedItems,
      })
    );
  }

  const reRankItem = (id) => {
    if (window.confirm("Do you want to rerank this item?")) {
      dispatch(reRankMovie(id));
    }
  };

  console.log("combatants are: ");
  console.log(combatants);
  //function combines
  //keeping to demonstrate how to combine dispatches for future uses
  function combinedUpdater() {
    updateRank();
  }

  const deleteItem = (id) => {
    dispatch(deleteMovie((id: id)));
  };

  return (
    <StyledMovieCardDiv name="StyledMovieCard">
      <StyledImg
        src={"https://image.tmdb.org/t/p/w500" + item.backImg}
        title={item.title}
        alt="movie image"
      />
      <ButtonWrapper>
        <Button choose onClick={updateRank}>
          Choose
        </Button>
        <Button choose onClick={() => reRankItem(id)}>Restart</Button>
      </ButtonWrapper>
    </StyledMovieCardDiv>
  );
};

const StyledMovieCardDiv = styled.div`
  display: grid;
  grid-template-rows: 80% 20%;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
  background-color: ${(props) => props.theme.colors.whiteColor};
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.25);
  }
`;
const ButtonWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  display: grid;
  width: auto;
  height: 30vh;
  overflow: hidden;
`;
