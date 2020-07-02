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
      const startBotRank = 10000;
      //already sorted and passed in via props sorted by rank
      const rankedMovies = action.payload.rankedMovies;
      //removes proxy

      // console.log(JSON.stringify(OptionA, undefined, 2));
      // console.log(JSON.stringify(OptionB, undefined, 2));

      //INITIAL RANKINGS

      if (OptionA.rank === 0 && OptionB.rank === 0)
        if (action.payload.option === "A") {
          console.log("INITIAL RANKING: Option A selected");
          OptionA.rank = startTopRank;
          OptionB.rank = startBotRank;
        } else if (action.payload.option === "B") {
          console.log("INITIAL RANKING: Option B selected");
          OptionA.rank = startBotRank;
          OptionB.rank = startTopRank;
        } else {
          console.log("INITIAL RANKING ERROR!!!");
        }
      //SUBSEQUENT RANKINGS - UNRANKED VS RANKED
      else if (OptionA.rank === 0 && OptionB.rank !== 0) {
        const index = rankedMovies.findIndex(
          (movies) => movies.rank === OptionB.rank
        );
        OptionA.history = [];
        OptionA.history.push(OptionB.id);
        if (action.payload.option === "A") {
          //CHALLENGER SELECTED
          console.log("SUBSEQUENT RANKING: Option A Selected - Challenger");
          const newRank =
            (rankedMovies[index - 1].rank + rankedMovies[index].rank) / 2;
          OptionA.rank = newRank;
          OptionA.active = "won";
        }
        //INCUMBENT SELECTED
        else if (action.payload.option === "B") {
          console.log("SUBSEQUENT RANKING: Option B Selected - Incumbent");
          OptionA.active = "lost";
          if (rankedMovies.length === index + 1) {
            console.log(
              "Max Index reached - this item is the new bottom ranked - EXIT LOOP"
            );
            OptionA.rank = rankedMovies[index].rank * 2;
            delete OptionA.active;
          } else {
            const lostNewRank =
              (rankedMovies[index].rank + rankedMovies[index + 1].rank) / 2;
            OptionA.rank = lostNewRank;
          }
        } else {
          console.log("SUBSEQUENT RANKING: ERROR!!!");
        }
      }
      // RANKED vs RANKED
      else if (OptionA.rank > 0 && OptionB.rank > 0) {
        if (action.payload.option === "A") {
          // ! A SELECTED
          const index = rankedMovies.findIndex(
            (movies) => movies.rank === OptionB.rank
          );
          console.log("RANKED VS RANKED: A SELECTED -->");
          console.log(rankedMovies);
          OptionA.active = "won";

          if (rankedMovies[0].rank === OptionA.rank) {
            console.log("WE SHOULD KICK THIS OUT OF THE LOOP - redux slice");
            delete OptionA.active;
          } else if (index === 0) {
            const newTopRank = rankedMovies[index].rank / 2;
            OptionA.rank = newTopRank;
            delete OptionA.active;
          } else if (OptionA.history.includes(OptionB.id) === true) {
            console.log("EXIT THE LOOP WE GOT HIM");
            delete OptionA.active;
          } else {
            const newRank =
              (rankedMovies[index - 1].rank + rankedMovies[index].rank) / 2;
            OptionA.rank = newRank;
            OptionA.history.push(OptionB.id);
            console.log("SUBSEQUENT ALL RANKED NON 0 INDEX");
          }
        }
        // ! B SELECTED
        else if (action.payload.option === "B") {
          //console.log(rankedMovies);
          console.log("RANKED VS RANKED: B SELECTED -->");
          const index = rankedMovies.findIndex(
            (movies) => movies.rank === OptionB.rank
          );
          OptionA.active = "lost";
          OptionA.history.push(OptionB.id);
          if (OptionA.history.includes(OptionB.id)) {
            console.log(console.log("EXIT THE LOOP WE GOT HIM"));
            delete OptionA.active;
          }
          // LOSING TO TOP RANKED ITEM
          else if (index === 0) {
            delete OptionA.active;
            console.log("index 0 event loss occured - lost to top dawg");
          } else if (index === rankedMovies.length - 1) {
            delete OptionA.active;
            OptionA.rank = rankedMovies[index].rank * 2;
          } else {
            const lostNewRank =
              (rankedMovies[index].rank + rankedMovies[index + 1].rank) / 2;
            OptionA.rank = lostNewRank;

            console.log("Option B Selected - Incumbent");
          }
        } else {
          console.log("ChangeRank input not working as intended");
        }
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
