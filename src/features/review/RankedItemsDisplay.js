import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  deleteMovie,
  deleteAllMovies,
  reRankMovie,
  movielistSelector,
} from "../../redux/slices/movielistSlice";
import styled from "styled-components";

import { ReviewPageButton, Button } from "../../display/components/Buttons";
import { StyledBaseDiv, StyledContentDiv } from "../../display/components/Divs";
import { StyledImg } from "../../display/components/Imgs";
import { StyledTitle } from "../../display/components/Text";

const RankedReviewGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1;
  background-color: ${(props) => props.theme.colors.mainBlack};
  align-items: center;
  justify-items: center;
  padding-bottom: 2em;
`;

const RankedItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  background-color: ${(props) => props.theme.colors.mainLighter};
`;

const StyledBottomDivLeftButton = styled.div`
  display: grid;
  grid-column: 1;
  grid-row: 2;
  align-items: center;
  justify-items: center;
`;

const StyledBottomDivRightButton = styled.div`
  display: grid;
  grid-column: 2;
  grid-row: 2;
  align-items: center;
  justify-items: center;
`;

const StyledRankingNum = styled.h1`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-column: 1;
`;
const RankedItemsDisplay = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(movielistSelector);
  const [view, setView] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchMovies());
  // }, [dispatch]);

  let rankedItems = movies.filter((movie) => movie.rank >= 1);
  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };
    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  const itemsSortedByRank = rankedItems
    .slice()
    .sort(sort_by("rank", false, parseInt));

  //custom remove prompt

  const deleteEverything = () => {
    if (window.confirm("Do you want to delete everything?")) {
      dispatch(deleteAllMovies());
    }
  };

  const reRankItem = (id) => {
    if (window.confirm("Do you want to rerank this item?")) {
      dispatch(reRankMovie(id));
    }
  };

  const removeItem = (id) => {
    if (window.confirm("Remove this item?")) {
      dispatch(deleteMovie(id));
    }
  };

  const toggleListView = () => {
    setView(!view);
    console.log(view);
  };

  let ranking = 1;
  //test//
  if (view) {
    return (
      <RankedReviewGridWrapper>
        <button onClick={() => toggleListView()}>Show Images</button>
        <div display={false}>
          {itemsSortedByRank.map((movie) => {
            return (
              <RankedItemWrapper>
                <StyledRankingNum>{ranking++}</StyledRankingNum>
                <StyledBaseDiv>
                  <StyledTitle>{movie.title}</StyledTitle>
                  <StyledBottomDivLeftButton>
                    <ReviewPageButton
                      reRank
                      onClick={() => reRankItem(movie.id)}
                    >
                      ReRank
                    </ReviewPageButton>
                  </StyledBottomDivLeftButton>
                  <StyledBottomDivRightButton>
                    <ReviewPageButton
                      remove
                      onClick={() => removeItem(movie.id)}
                    >
                      Remove
                    </ReviewPageButton>
                  </StyledBottomDivRightButton>
                </StyledBaseDiv>
              </RankedItemWrapper>
            );
          })}
        </div>
      </RankedReviewGridWrapper>
    );
  }

  return (
    <RankedReviewGridWrapper>
      <button onClick={() => toggleListView()}>Hide Images</button>
      <button onClick={() => deleteEverything()}>Delete Everything</button>

      <div display={false}>
        {itemsSortedByRank.map((movie) => {
          return (
            <RankedItemWrapper>
              <StyledRankingNum>{ranking++}</StyledRankingNum>
              <StyledBaseDiv reviewPage>
                <StyledImg
                  src={"https://image.tmdb.org/t/p/w500" + movie.backImg}
                  title={movie.title}
                  alt="movie image"
                />
                <StyledContentDiv>
                  <StyledTitle>{movie.title}</StyledTitle>
                  <StyledBottomDivLeftButton>
                    <ReviewPageButton
                      reRank
                      onClick={() => reRankItem(movie.id)}
                    >
                      ReRank
                    </ReviewPageButton>
                  </StyledBottomDivLeftButton>
                  <StyledBottomDivRightButton>
                    <ReviewPageButton
                      remove
                      onClick={() => removeItem(movie.id)}
                    >
                      Remove
                    </ReviewPageButton>
                  </StyledBottomDivRightButton>
                </StyledContentDiv>
              </StyledBaseDiv>
            </RankedItemWrapper>
          );
        })}
      </div>
    </RankedReviewGridWrapper>
  );
};

export default RankedItemsDisplay;

//! taken from ItemGrid Card with some changes to props and references. Will need to move these/restructure into a proper components folder for better reference.
