import React, { useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

import MovieFinder from "../../apis/MovieFinder";
//listName = names' created by user or pregenerated (example: IMDB TOP 100)
//listStatus - denotes which lists items will be added to.
//'All Movies' should always be active so that items are always added to that list, but additional lists can be selected.
export const movielistSlice = createSlice({
  name: "movielist",
  initialState: {
    loading: false,
    hasErrors: false,
    movies: [],
    movielists: [
      {
        listName: "All Movies",
        id:
          "01101101011000010111001101110100011001010111001001101100011010010111001101110100",
        listStatus: "active",
      },
    ],
  },

  reducers: {
    getMovies: (state) => {
      state.loading = true;
    },
    getMoviesSuccess: (state, { payload }) => {
      state.movies = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getMoviesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      console.log(state.movies);
    },
    addList: (state, { payload }) => {
      const { listName, listId } = payload;
      console.log(listId);
      state.movielists.push({ listName, id: listId });
    },
    deleteList: (state, { payload }) => {
      const { listName, id } = payload;
      const index = state.movielists.findIndex(
        (list) => list.listName === listName && list.id === id
      );
      console.log(index);
      console.log("id");
      console.log(id);
      if (index !== -1 && index !== 0) {
        state.movielists.splice(index, 1);
      }
    },
    activateListStatus: (state, { payload }) => {
      const { listName } = payload;
      const listIndex = state.movielists.findIndex(
        (list) => list.listName === listName
      );
      console.log("variable");
      console.log(JSON.stringify(listIndex, undefined, 2));

      state.movielists[listIndex].listStatus = "active";
    },
    resetListStatus: (state, { payload }) => {
      const activeListID = state.movielists.reduce(
        (arr, e, i) => (e.listStatus === "active" && arr.push(i), arr),
        []
      );

      if (activeListID.length > 1) {
        console.log("activeListID");
        console.log(activeListID);
        const spliceID = activeListID.splice(1, activeListID.length - 1);
        console.log("spliceID");
        console.log(spliceID);

        activeListID.forEach(resetLists);

        function resetLists(index) {
          state.movielists[index].listStatus = "inactive";
        }
      }
    },
    changeRank: (state, action, movie_id) => {
      
        
        const user_movies_rank_update = (async (user_movie_rank, user_movie_id) => {
      
        const user_movie_list_id = 1;
        const user_movie_user_id = 1;
        try {
          const response = await MovieFinder.put(`/user_movies/${user_movie_rank}/${user_movie_id}/${user_movie_list_id}/${user_movie_user_id}`)
          console.log(response)
        } catch (err) {
          console.log(err.message)
        }
      })

      const OptionA = state.movies.find(
        (element) => element.movie_id === action.payload.combatants[0].movie_id
      );
      const OptionB = state.movies.find(
        (element) => element.movie_id === action.payload.combatants[1].movie_id
      );
      const startTopRank = 1000;
      const startBotRank = 9999;
      //already sorted and passed in via props sorted by rank
      const rankedItems = action.payload.rankedItems;
      const totalRankedItems = action.payload.totalRankedItems;

      //removes proxy
      console.log("ranked items below");
      console.log(rankedItems);
      console.log("totalRankedItems  below");
      console.log(totalRankedItems);
      // console.log(JSON.stringify(OptionA, undefined, 2));
      // console.log(JSON.stringify(OptionB, undefined, 2));

      //INITIAL RANKINGS

      if (OptionA.user_movie_rank === 0 && OptionB.user_movie_rank === 0)
        if (action.payload.option === "A") {
          console.log(
            "ORIGINAL INITIAL RANKING: " +
              OptionA.movie_title +
              " beat " +
              OptionB.movie_title
          );

          OptionA.user_movie_rank = startTopRank;
          user_movies_rank_update(startTopRank, OptionA.movie_id)

          OptionB.user_movie_rank = startBotRank;
          user_movies_rank_update(startBotRank, OptionB.movie_id)
          
        } else if (action.payload.option === "B") {
          console.log(
            "EXIT: ORIGINAL INITIAL RANKING: " +
              OptionB.movie_title +
              " beat " +
              OptionA.movie_title

          );
          OptionA.user_movie_rank = startBotRank;
          user_movies_rank_update(startBotRank, OptionA.movie_id)
          OptionB.user_movie_rank = startTopRank;
          user_movies_rank_update(startTopRank, OptionB.movie_id)

        } else {
          console.log("ERROR DURING INITIAL RANKING!!!");
        }
      //SUBSEQUENT RANKINGS - UNRANKED VS RANKED
      //Only assign a rank here as this is the initial ranking point - only ever change the rank from this point onwards as an item is exiting from 'active' status
      else if (
        OptionA.user_movie_rank === 0 &&
        OptionB.user_movie_rank !== 0 &&
        OptionA.user_movie_potential_rank === 0
      ) {
        const bIndex = rankedItems.findIndex(
          (movies) => movies.user_movie_rank === OptionB.user_movie_rank
        );
        OptionA.history = [];
        OptionA.history.push(OptionB.movie_id);
        if (action.payload.option === "A") {
          //CHALLENGER SELECTED
          console.log(
            "SUBSEQUENT INITIAL RANKING: " +
              OptionA.movie_title +
              " beat " +
              OptionB.movie_title
          );
          const newRank =
            (rankedItems[bIndex - 1].user_movie_rank + rankedItems[bIndex].user_movie_rank) / 2;
          OptionA.user_movie_potential_rank = newRank;
          OptionA.active = "won";
          OptionA.botBound = OptionB.user_movie_rank;
        }
        //INCUMBENT SELECTED
        else if (action.payload.option === "B") {
          if (rankedItems.length === bIndex + 1) {
            console.log(
              "EXIT: SUBSEQUENT INITIAL RANKING: Max Index reached - this item, " +
                OptionA.movie_title +
                " is the new bottom ranked item"
            );
            OptionA.user_movie_rank = rankedItems[bIndex].user_movie_rank * 2;
            delete OptionA.active;
            user_movies_rank_update(OptionA.user_movie_rank, OptionA.movie_id);
            
          } else {
            console.log(
              "SUBSEQUENT INITIAL RANKING: " +
                OptionB.movie_title +
                " beat " +
                OptionA.movie_title
            );
            OptionA.active = "lost";
            const lostNewRank =
              (rankedItems[bIndex].user_movie_rank + rankedItems[bIndex + 1].user_movie_rank) / 2;
            OptionA.user_movie_potential_rank = lostNewRank;
            OptionA.topBound = OptionB.user_movie_rank;
          }
        } else {
          console.log("SUBSEQUENT RANKING: ERROR!!!");
        }
      }
      // RANKED vs RANKED
      else if (OptionA.user_movie_potential_rank > 0 && OptionB.user_movie_rank > 0) {
        const bIndex = rankedItems.findIndex(
          (movies) => movies.user_movie_rank === OptionB.user_movie_rank
        );
        console.log("bIndex");
        console.log(bIndex);

        const bTotalIndex = totalRankedItems.findIndex(
          (movies) => movies.user_movie_rank === OptionB.user_movie_rank
        );

        console.log("bTotalIndex");
        console.log(bTotalIndex);

        if (action.payload.option === "A") {
          // ! A SELECTED
          console.log("RANKED VS RANKED: A SELECTED -->");
          OptionA.active = "won";
          OptionA.botBound = OptionB.user_movie_rank;
          //EXIT
          if (
            bIndex === 0 &&
            OptionA.user_movie_potential_rank < totalRankedItems[1].user_movie_rank
          ) {
            const newTopRank = rankedItems[bIndex].user_movie_rank / 2;
            OptionA.user_movie_rank = newTopRank;
            user_movies_rank_update(OptionA.user_movie_rank, OptionA.movie_id);
            delete OptionA.active;
            console.log(
              "EXIT: SUBSEQUENT INITIAL RANKING: Max Index reached - this item, " +
                OptionA.movie_title +
                " is the new top ranked item"
            );
          } else if (bIndex === 0) {
            OptionA.user_movie_rank = OptionA.user_movie_potential_rank;
            delete OptionA.active;
            user_movies_rank_update(OptionA.user_movie_rank, OptionA.movie_id);
            console.log(
              "EXIT: SUBSEQUENT RANKING - NEXT OPPONENT ALREADY FACED " +
                OptionA.movie_title +
                " beat " +
                OptionB.movie_title
            );

            // bIndex = 0 now prevents facing previous "bound" opponents due to removing the ranking of our 'incumbent' until it has exited the loop of ranking
          }
          // else if (aIndex === 0) {
          //   //EXIT
          //   const newTopRank = rankedItems[bIndex].user_movie_rank / 2;
          //   OptionA.user_movie_rank = newTopRank;
          //   delete OptionA.active;
          //   console.log(
          //     "SUBSEQUENT RANKING - NEXT OPPONENT ALREADY FACED EXITING LOOP: " +
          //       OptionA.movie_title +
          //       " beat " +
          //       OptionB.movie_title
          //   );
          // }
          else {
            const newRank =
              (rankedItems[bIndex - 1].user_movie_rank + rankedItems[bIndex].user_movie_rank) / 2;
            OptionA.user_movie_potential_rank = newRank;
            OptionA.botBound = OptionB.user_movie_rank;
            OptionA.history.push(OptionB.movie_id);
            console.log(
              "SUBSEQUENT RANKING: " + OptionA.movie_title + " beat " + OptionB.movie_title
            );
          }
        }
        // ! B SELECTED
        else if (action.payload.option === "B") {
          console.log("RANKED VS RANKED: B SELECTED -->");
          console.log(rankedItems);
          OptionA.active = "lost";
          OptionA.topBound = OptionB.user_movie_rank;
          //
          if (
            bIndex === 0 &&
            OptionA.user_movie_potential_rank < totalRankedItems[1].user_movie_rank
          ) {
            OptionA.user_movie_rank = OptionA.user_movie_potential_rank;
            user_movies_rank_update(OptionA.user_movie_rank, OptionA.movie_id);
            delete OptionA.active;
            console.log(
              "EXIT: SUBSEQUENT RANKING - LOSING TO TOP RANK: " +
                OptionB.movie_title +
                " beat " +
                OptionA.movie_title
            );
          } else if (
            OptionB.user_movie_rank === totalRankedItems[totalRankedItems.length - 1].user_movie_rank
          ) {
            delete OptionA.active;
            OptionA.user_movie_rank = rankedItems[bIndex].user_movie_rank * 2;
            user_movies_rank_update(OptionA.user_movie_rank, OptionA.movie_id);
            console.log(
              "EXIT: SUBSEQUENT RANKING - LOST TO BOTTOM RANKING: " +
                OptionB.movie_title +
                " beat " +
                OptionA.movie_title
            );
          } else if (
            bIndex === 0 ||
            (bIndex === 1 &&
              OptionA.botBound === totalRankedItems[bTotalIndex + 1].user_movie_rank)
          ) {
            const lostNewRank =
              (totalRankedItems[bTotalIndex].user_movie_rank +
                totalRankedItems[bTotalIndex + 1].user_movie_rank) /
              2;
            OptionA.user_movie_rank = lostNewRank;
            user_movies_rank_update(OptionA.user_movie_rank, OptionA.movie_id);
            delete OptionA.active;
            console.log(
              "EXIT: SUBSEQUENT RANKING - NEXT OPPONENT ALREADY FACED " +
                OptionB.movie_title +
                " beat " +
                OptionA.movie_title
            );
          }
          //else if (
          //   // if OptionA.user_movie_rank is the bottom of the ranked items then delete active
          //   aIndex - bIndex === 1 &&
          //   rankedItems[rankedItems.length - 1].user_movie_rank === OptionA.user_movie_rank
          // ) {
          //   console.log(
          //     "SUBSEQUENT RANKING - FOUND ITS SPOT - FACED ALL MATCHUPS: " +
          //       OptionB.movie_title +
          //       " beat " +
          //       OptionA.movie_title
          //   );
          //   delete OptionA.active;
          // }
          else {
            const lostNewRank =
              (totalRankedItems[bTotalIndex].user_movie_rank +
                totalRankedItems[bTotalIndex + 1].user_movie_rank) /
              2;
            OptionA.user_movie_potential_rank = lostNewRank;
            OptionA.topBound = OptionB.user_movie_rank;
            OptionA.history.push(OptionB.movie_id);
            console.log(
              "SUBSEQUENT RANKING: " + OptionB.movie_title + " beat " + OptionA.movie_title
            );
          }
        } else {
          console.log("ChangeRank input not working as intended");
        }
      }
    },
    addMovie: (state, { payload }) => {
      //push is an array method but we're dealing with an object
      // state.push(payload);

      // * https://stackoverflow.com/questions/48584267/get-the-indexes-of-javascript-array-elements-that-satisfy-condition
      const activeListID = state.movielists.reduce(
        (arr, e, i) => (e.listStatus === "active" && arr.push(i), arr),
        []
      );

      // state.movielists.forEach(
      //   (list) => list.listStatus === "active"
      // );
      console.log(activeListID);
      const { movie_id, movie_title, movie_poster_path, movie_overview } = payload;

      state.movies.push({
        movie_id,
        movie_title,
        movie_poster_path,
        movie_overview,
        user_movie_rank: 0,
        user_movie_potential_rank: 0,
        lists: activeListID,
      });
    },

    deleteMovie: (state, { payload }) => {
      const index = state.movies.findIndex((movie) => movie.movie_id === payload);
      console.log(index);
      if (index !== -1) {
        state.movies.splice(index, 1);
      }
    },
    deleteAllMovies: (state, { payload }) => {
      const movieListLength = state.movies.length;
      state.movies.splice(0, movieListLength);
    },
    reRankMovie: (state, { payload }) => {
      const index = state.movies.findIndex((movie) => movie.movie_id === payload);
      console.log(index);

      state.movies[index].user_movie_rank = 0;
      state.movies[index].user_movie_potential_rank = 0;
      state.movies[index].botBound = null;
      state.movies[index].topBound = null;
      state.movies[index].active = null;
      state.movies[index].history = [];
    },
  },
});

//Actions generated from the slice
export const {
  getMovies,
  getMoviesSuccess,
  getMoviesFailure,
  addList,
  deleteList,
  activateListStatus,
  resetListStatus,
  changeRank,
  addMovie,
  deleteMovie,
  deleteAllMovies,
  reRankMovie,
} = movielistSlice.actions;

// A selector

export const movielistSelector = (state) => state.movieRanker;

// The reducer
export default movielistSlice.reducer;

// function handleErrors(response) {
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response;
// }

//disabled useEffect for now cause i'm not retrieving anything from an api or external db

// //Async thunk action
// export function fetchMovies() {
//   return async (dispatch) => {
//     dispatch(getMovies());

//     try {
//       // let response = await fetch("../../datafd.json");
//       // handleErrors(response);
//       // const data = await response.json();

//       dispatch(getMoviesSuccess([]));
//     } catch (error) {
//       dispatch(getMoviesFailure(error));
//     }
//   };
// }
