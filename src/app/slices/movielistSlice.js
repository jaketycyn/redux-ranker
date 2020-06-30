import { createSlice } from "@reduxjs/toolkit";
import dataJson from "../../data.json";

export const initialState = {
  loading: false,
  hasErrors: false,
  movies: [],
};

const movielistSlice = createSlice({
  name: "movielist",
  initialState,
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
    changeRank: (state, action, id) => {
      //payload
      console.log(action.payload);
      //

      const OptionA = state.movies.find(
        (element) => element.id === action.payload.combatants[0].id
      );
      const OptionB = state.movies.find(
        (element) => element.id === action.payload.combatants[1].id
      );
      const startTopRank = 1000;
      const startBotRank = 10000;
      //already sorted and passed in via props sorted by rank
      const rankedMovies = action.payload.rankedMovies;
      //removes proxy
      console.log(JSON.stringify(OptionA, undefined, 2));
      console.log(JSON.stringify(OptionB, undefined, 2));

      //?initial rankings
      if (
        action.payload.option === "A" &&
        OptionA.rank === 0 &&
        OptionB.rank === 0
      ) {
        console.log("Option A selected");
        OptionA.rank = startTopRank;
        OptionB.rank = startBotRank;
      } else if (
        action.payload.option === "B" &&
        OptionA.rank === 0 &&
        OptionB.rank === 0
      ) {
        console.log("Option B selected");
        OptionA.rank = startBotRank;
        OptionB.rank = startTopRank;
      }

      //subsequent Rankings
      //!Challenger Selected
      else if (
        action.payload.option === "A" &&
        OptionA.rank === 0 &&
        OptionB.rank !== 0
      ) {
        console.log("Option A Selected - subsequent");
        const index = rankedMovies.findIndex(
          (movies) => movies.rank === OptionB.rank
        );
        const wonNewRank =
          (rankedMovies[index - 1].rank + rankedMovies[index].rank) / 2;
        OptionA.rank = wonNewRank;
        OptionA.active = "won";
      }
      //!incumbent Selected
      else if (
        action.payload.option === "B" &&
        OptionA.rank === 0 &&
        OptionB.rank !== 0
      ) {
        console.log("Option B Selected - subsequent");
        const index = rankedMovies.findIndex(
          (movies) => movies.rank === OptionB.rank
        );
        if (rankedMovies.length === index + 1) {
          console.log("this is the max index");
          OptionA.rank = rankedMovies[index].rank * 2;
        } else {
          const lostNewRank =
            (rankedMovies[index].rank + rankedMovies[index + 1].rank) / 2;
          OptionA.rank = lostNewRank;
        }

        OptionA.active = "lost";
      } else {
        console.log("ChangeRank input not working as intended");
      }
    },
  },
});

//Actions generated from the slice
export const {
  getMovies,
  getMoviesSuccess,
  getMoviesFailure,
  changeRank,
} = movielistSlice.actions;

// A selector
export const movielistSelector = (state) => state.movies;

// The reducer
export default movielistSlice.reducer;

// function handleErrors(response) {
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response;
// }

//Async thunk action
export function fetchMovies() {
  return async (dispatch) => {
    dispatch(getMovies());

    try {
      // let response = await fetch("../../datafd.json");
      // handleErrors(response);
      // const data = await response.json();

      dispatch(getMoviesSuccess(dataJson));
    } catch (error) {
      dispatch(getMoviesFailure());
    }
  };
}
