import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, movielistSelector } from "../../slices/movielistSlice";
import styled from "styled-components";

import { Button } from "../../display/components/Buttons";

const RankedItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1;
  background-color: lightseagreen;
  align-items: center;
  justify-items: center;
  padding-bottom: 2em;
`;

const RankedItemsDisplay = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(movielistSelector);

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

  return (
    <RankedItemWrapper>
      <div display={false}>
        {itemsSortedByRank.map((movie) => {
          return (
            <StyledBaseDiv name="BaseDiv">
              <StyledImg
                src={"https://image.tmdb.org/t/p/w500" + movie.backImg}
                title={movie.title}
                alt="movie image"
              />
              <StyledContentDiv>
                <StyledTitle>{movie.title}</StyledTitle>
                <StyledBottomDivLeftButton>
                  <Button add onClick={() => console.log("hi")}>
                    Add
                  </Button>
                </StyledBottomDivLeftButton>
                <StyledBottomDivRightButton>
                  <Button
                    details
                    onClick={() => console.log("give me more deats")}
                  >
                    Details
                  </Button>
                </StyledBottomDivRightButton>
              </StyledContentDiv>
            </StyledBaseDiv>
          );
        })}
      </div>
    </RankedItemWrapper>
  );
};

export default RankedItemsDisplay;

//! taken from ItemGrid Card with some changes to props and references. Will need to move these/restructure into a proper components folder for better reference.

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
