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
      console.log("Redux action.payload:  ");
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

      // console.log(JSON.stringify(OptionA, undefined, 2));
      // console.log(JSON.stringify(OptionB, undefined, 2));

      //?initial rankings
      if (OptionA.rank === 0 && OptionB.rank === 0)
        if (action.payload.option === "A") {
          console.log("Option A selected");
          OptionA.rank = startTopRank;
          OptionB.rank = startBotRank;
        } else if (action.payload.option === "B") {
          console.log("Option B selected");
          OptionA.rank = startBotRank;
          OptionB.rank = startTopRank;
        } else {
          console.log("INITIAL RANKING ERROR!!!");
        }
      //Subsequent Rankings
      else if (OptionA.rank === 0 && OptionB.rank !== 0)
        if (action.payload.option === "A") {
          //!Challenger Selected
          console.log("Option A Selected - Challenger");
          const index = rankedMovies.findIndex(
            (movies) => movies.rank === OptionB.rank
          );
          const newRank =
            (rankedMovies[index - 1].rank + rankedMovies[index].rank) / 2;
          OptionA.rank = newRank;
          OptionA.active = "won";
        }
        //!Incumbent Selected
        else if (action.payload.option === "B") {
          console.log("Option B Selected - Incumbent");
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
          console.log("SUBSEQUENT RANKING ERROR!!!");
        }
      else if (OptionA.rank > 0 && OptionB.rank > 0)
        if (action.payload.option === "A") {
          const index = rankedMovies.findIndex(
            (movies) => movies.rank === OptionB.rank
          );
          console.log("newish index: " + index);
          if (index === 0) {
            const newTopRank = rankedMovies[index].rank / 2;
            OptionA.rank = newTopRank;
            //could clean up this naming convention later
            //purpose is to catalog historical information on who it beat
            OptionA.active = "fin_newTopRank".concat("vs_" + OptionB.title);
          } else {
            const newRank =
              (rankedMovies[index - 1].rank + rankedMovies[index].rank) / 2;
            OptionA.rank = newRank;
            console.log("SUBSEQUENT ALL RANKED NON 0 INDEX");
          }
        } else if (action.payload.option === "B") {
          const index = rankedMovies.findIndex(
            (movies) => movies.rank === OptionB.rank
          );
          console.log("SUBSEQENT SUBSEQUENT ALL RANKED - B SELECTED");
          console.log(index);
          if (index === 0) {
            OptionA.active = "fin_lost".concat("vs_" + OptionB.title);
          }
          //  todo: index not 0 how to not keep having hte same values face one another?  exit loop conditions
          else {
            console.log("Option B Selected - Incumbent");
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
