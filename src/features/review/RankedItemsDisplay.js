import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  deleteMovie,
  deleteAllMovies,
  reRankMovie,
  movielistSelector,
} from "../../redux/slices/movielistSlice";
import MovieFinder from "../../apis/MovieFinder"

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

  let rankedItems = movies.filter((movie) => movie.movie_rank >= 1);
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
      user_movies_deleteAll();
    }
  };

  const reRankItem = (movie_id) => {
    if (window.confirm("Do you want to rerank this item?")) {
      dispatch(reRankMovie(movie_id));
    }
  };

  const removeItem = (movie_id) => {
    if (window.confirm("Remove this item?")) {
      dispatch(deleteMovie(movie_id));
      user_movies_deleteItem(movie_id)
    }
  };

  const user_movies_deleteItem = async (movie_id) => {
    const user_movie_id = movie_id

    //TODO: will be passed down in future
    const user_movie_list_id = 1
    //TODO: will be passed down in future
    const user_movie_user_id = 1
    try {
      //TODO: how to reference both movie_Id and user_id
      const response = await MovieFinder.delete(`/user_movies/${user_movie_id}/${user_movie_list_id}/${user_movie_user_id}`)
     // (`/user_movies/${movie_id}`)
      console.log(response)
      }
     catch(err) {
      console.error(err.message)
    }
    console.log("delete Item from Server fired")
  }

  const user_movies_deleteAll = async () => {
    //TODO: will be passed down in future
    const user_movie_list_id = 1
    //TODO: will be passed down in future
    const user_movie_user_id = 1
    try {
      //TODO: how to reference both movie_Id and user_id
      const response = await MovieFinder.delete(`/user_movies/${user_movie_list_id}/${user_movie_user_id}`)
     // (`/user_movies/${movie_id}`)
      console.log(response)
      }
     catch(err) {
      console.error(err.message)
    }
    console.log("delete Item from Server fired")
  }

  const toggleListView = () => {
    setView(!view);
    console.log("view is " + view);
    // const reduxdata = JSON.stringify(movies)
    // console.log("redux data " + reduxdata)
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
                  <StyledTitle>{movie.movie_title}</StyledTitle>
                  <StyledBottomDivLeftButton>
                    <ReviewPageButton
                      reRank
                      onClick={() => reRankItem(movie.movie_id)}
                    >
                      ReRank
                    </ReviewPageButton>
                  </StyledBottomDivLeftButton>
                  <StyledBottomDivRightButton>
                    <ReviewPageButton
                      remove
                      onClick={() => removeItem(movie.movie_id)}
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
                  src={"https://image.tmdb.org/t/p/w500" + movie.movie_poster_path}
                  title={movie.movie_title}
                  alt="movie image"
                />
                <StyledContentDiv>
                  <StyledTitle>{movie.movie_title}</StyledTitle>
                  <StyledBottomDivLeftButton>
                    <ReviewPageButton
                      reRank
                      onClick={() => reRankItem(movie.movie_id)}
                    >
                      ReRank
                    </ReviewPageButton>
                  </StyledBottomDivLeftButton>
                  <StyledBottomDivRightButton>
                    <ReviewPageButton
                      remove
                      onClick={() => removeItem(movie.movie_id)}
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
