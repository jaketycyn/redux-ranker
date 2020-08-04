import { combineReducers } from "@reduxjs/toolkit";

import movielistReducer from "./slices/movielistSlice";

const futureReducer = (state = "stuff", action) => state;

const rootReducer = combineReducers({
  movies: movielistReducer,
  futureReducer,
  //future reducers
});

export default rootReducer;
