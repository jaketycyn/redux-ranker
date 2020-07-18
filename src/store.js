import { configureStore } from "@reduxjs/toolkit";
import movielistReducer from "./slices/movielistSlice";
import searchAddReducer from "./slices/searchAddSlice";
export default configureStore({
  reducer: {
    movies: movielistReducer,
    searchAdd: searchAddReducer,
  },
  preloadedState: {},
});
