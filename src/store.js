import { configureStore } from "@reduxjs/toolkit";
import movielistReducer from "./slices/movielistSlice";
import searchAddReducer from "./slices/searchAddSlice";
//Docs:
//https://redux-toolkit.js.org/api/configureStore
export default configureStore({
  reducer: {
    movies: movielistReducer,
    searchAdd: searchAddReducer,
  },
  //https://stackoverflow.com/questions/59785287/redux-trying-to-add-a-function-to-configurestore

  preloadedState: {},
});
