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
    changeRank: (state, action, id) => {
      // payload
      // console.log("Redux action.payload:  ");
      // console.log(action.payload);
      const OptionA = state.movies.find(
        (element) => element.id === action.payload.combatants[0].id
      );
      const OptionB = state.movies.find(
        (element) => element.id === action.payload.combatants[1].id
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

      if (OptionA.rank === 0 && OptionB.rank === 0)
        if (action.payload.option === "A") {
          console.log(
            "ORIGINAL INITIAL RANKING: " +
              OptionA.title +
              " beat " +
              OptionB.title
          );
          OptionA.rank = startTopRank;
          OptionB.rank = startBotRank;
        } else if (action.payload.option === "B") {
          console.log(
            "ORIGINAL INITIAL RANKING: " +
              OptionB.title +
              " beat " +
              OptionA.title
          );
          OptionA.rank = startBotRank;
          OptionB.rank = startTopRank;
        } else {
          console.log("ERROR DURING INITIAL RANKING!!!");
        }
      //SUBSEQUENT RANKINGS - UNRANKED VS RANKED
      //Only assign a rank here as this is the initial ranking point - only ever change the rank from this point onwards as an item is exiting from 'active' status
      else if (
        OptionA.rank === 0 &&
        OptionB.rank !== 0 &&
        OptionA.potentialRank === 0
      ) {
        const bIndex = rankedItems.findIndex(
          (movies) => movies.rank === OptionB.rank
        );
        OptionA.history = [];
        OptionA.history.push(OptionB.id);
        if (action.payload.option === "A") {
          //CHALLENGER SELECTED
          console.log(
            "SUBSEQUENT INITIAL RANKING: " +
              OptionA.title +
              " beat " +
              OptionB.title
          );
          const newRank =
            (rankedItems[bIndex - 1].rank + rankedItems[bIndex].rank) / 2;
          OptionA.potentialRank = newRank;
          OptionA.active = "won";
          OptionA.botBound = OptionB.rank;
        }
        //INCUMBENT SELECTED
        else if (action.payload.option === "B") {
          if (rankedItems.length === bIndex + 1) {
            console.log(
              "SUBSEQUENT INITIAL RANKING: Max Index reached - this item, " +
                OptionA.title +
                " is the new bottom ranked item- EXIT LOOP"
            );
            OptionA.rank = rankedItems[bIndex].rank * 2;
            delete OptionA.active;
          } else {
            console.log(
              "SUBSEQUENT INITIAL RANKING: " +
                OptionB.title +
                " beat " +
                OptionA.title
            );
            OptionA.active = "lost";
            const lostNewRank =
              (rankedItems[bIndex].rank + rankedItems[bIndex + 1].rank) / 2;
            OptionA.potentialRank = lostNewRank;
            OptionA.topBound = OptionB.rank;
          }
        } else {
          console.log("SUBSEQUENT RANKING: ERROR!!!");
        }
      }
      // RANKED vs RANKED
      else if (OptionA.potentialRank > 0 && OptionB.rank > 0) {
        const bIndex = rankedItems.findIndex(
          (movies) => movies.rank === OptionB.rank
        );
        console.log("bIndex");
        console.log(bIndex);

        const bTotalIndex = totalRankedItems.findIndex(
          (movies) => movies.rank === OptionB.rank
        );

        console.log("bTotalIndex");
        console.log(bTotalIndex);

        if (action.payload.option === "A") {
          // ! A SELECTED
          console.log("RANKED VS RANKED: A SELECTED -->");
          OptionA.active = "won";
          OptionA.botBound = OptionB.rank;
          //EXIT
          if (
            bIndex === 0 &&
            OptionA.potentialRank < totalRankedItems[1].rank
          ) {
            const newTopRank = rankedItems[bIndex].rank / 2;
            OptionA.rank = newTopRank;
            delete OptionA.active;
            console.log(
              "SUBSEQUENT INITIAL RANKING: Max Index reached - this item, " +
                OptionA.title +
                " is the new top ranked item- EXIT LOOP"
            );
          } else if (bIndex === 0) {
            OptionA.rank = OptionA.potentialRank;
            delete OptionA.active;
            console.log(
              "SUBSEQUENT RANKING - NEXT OPPONENT ALREADY FACED EXITING LOOP: " +
                OptionA.title +
                " beat " +
                OptionB.title
            );

            // bIndex = 0 now prevents facing previous "bound" opponents due to removing the ranking of our 'incumbent' until it has exited the loop of ranking
          }
          // else if (aIndex === 0) {
          //   //EXIT
          //   const newTopRank = rankedItems[bIndex].rank / 2;
          //   OptionA.rank = newTopRank;
          //   delete OptionA.active;
          //   console.log(
          //     "SUBSEQUENT RANKING - NEXT OPPONENT ALREADY FACED EXITING LOOP: " +
          //       OptionA.title +
          //       " beat " +
          //       OptionB.title
          //   );
          // }
          else {
            const newRank =
              (rankedItems[bIndex - 1].rank + rankedItems[bIndex].rank) / 2;
            OptionA.potentialRank = newRank;
            OptionA.botBound = OptionB.rank;
            OptionA.history.push(OptionB.id);
            console.log(
              "SUBSEQUENT RANKING: " + OptionA.title + " beat " + OptionB.title
            );
          }
        }
        // ! B SELECTED
        else if (action.payload.option === "B") {
          console.log("RANKED VS RANKED: B SELECTED -->");
          console.log(rankedItems);
          OptionA.active = "lost";
          OptionA.topBound = OptionB.rank;
          //
          if (
            bIndex === 0 &&
            OptionA.potentialRank < totalRankedItems[1].rank
          ) {
            OptionA.rank = OptionA.potentialRank;
            delete OptionA.active;
            console.log(
              "SUBSEQUENT RANKING - LOSING TO TOP RANK: " +
                OptionB.title +
                " beat " +
                OptionA.title
            );
          } else if (
            OptionB.rank === totalRankedItems[totalRankedItems.length - 1].rank
          ) {
            delete OptionA.active;
            OptionA.rank = rankedItems[bIndex].rank * 2;
            console.log(
              "SUBSEQUENT RANKING - LOST TO BOTTOM RANKING: " +
                OptionB.title +
                " beat " +
                OptionA.title
            );
          } else if (
            bIndex === 0 ||
            (bIndex === 1 &&
              OptionA.botBound === totalRankedItems[bTotalIndex + 1].rank)
          ) {
            const lostNewRank =
              (totalRankedItems[bTotalIndex].rank +
                totalRankedItems[bTotalIndex + 1].rank) /
              2;
            OptionA.rank = lostNewRank;
            delete OptionA.active;
            console.log(
              "SUBSEQUENT RANKING - NEXT OPPONENT ALREADY FACED EXITING LOOP: " +
                OptionB.title +
                " beat " +
                OptionA.title
            );
          }
          //else if (
          //   // if OptionA.rank is the bottom of the ranked items then delete active
          //   aIndex - bIndex === 1 &&
          //   rankedItems[rankedItems.length - 1].rank === OptionA.rank
          // ) {
          //   console.log(
          //     "SUBSEQUENT RANKING - FOUND ITS SPOT - FACED ALL MATCHUPS: " +
          //       OptionB.title +
          //       " beat " +
          //       OptionA.title
          //   );
          //   delete OptionA.active;
          // }
          else {
            const lostNewRank =
              (totalRankedItems[bTotalIndex].rank +
                totalRankedItems[bTotalIndex + 1].rank) /
              2;
            OptionA.potentialRank = lostNewRank;
            OptionA.topBound = OptionB.rank;
            OptionA.history.push(OptionB.id);
            console.log(
              "SUBSEQUENT RANKING: " + OptionB.title + " beat " + OptionA.title
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
      const { id, title, backImg } = payload;

      state.movies.push({
        id,
        title,
        backImg,
        rank: 0,
        potentialRank: 0,
        lists: activeListID,
      });
    },

    deleteMovie: (state, { payload }) => {
      const index = state.movies.findIndex((movie) => movie.id === payload);
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
      const index = state.movies.findIndex((movie) => movie.id === payload);
      console.log(index);

      state.movies[index].rank = 0;
      state.movies[index].potentialRank = 0;
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
