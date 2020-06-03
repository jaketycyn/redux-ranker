import { createSlice } from "@reduxjs/toolkit";
import dataJson from "../../data.json";

export const initialState = {
  loading: false,
  hasErrors: false,
  movies: [],
};

//if returning proxy via a console log
// use JSON.stringify(state, undefined, 2)
// state = movies.state or whatever variable state is assigned to

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
      //action.payload = whatever is passed through to the changeRank reducer
      // in the case of movie.js it's the id currently
      const foundMovie = state.movies.find(element => element.id === action.payload.id) 

      console.log(JSON.stringify(foundMovie, undefined, 2))
      
      console.log(action.payload.id);
      if (action.payload.id === state) {
      //   const movieID = action.payload;
      
      //   console.log(action.payload);
      }

     
      // console.log(state.movies[action.payload.id - 1].title);

      //testing of the option property attachd to Movie component = works so far
      // console.log(action.payload.option)
      // state.movies[action.payload.id - 1].rank = 2;1
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
