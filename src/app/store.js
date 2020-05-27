import { configureStore } from "@reduxjs/toolkit";
import movielistReducer from "./slices/movielistSlice";
export default configureStore({
  reducer: {
    movies: movielistReducer,
  },
});
