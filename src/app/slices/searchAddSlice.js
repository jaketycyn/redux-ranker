import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  itemTitles: [],
};

const searchAddSlice = createSlice({
  name: "searchAdd",
  initialState,
  reducers: {
    addItem: (state) => {},
  },
});

//Actions generated from the slice
export const { addItem } = searchAddSlice.actions;

// A selector
export const searchAddSelector = (state) => state.itemTitles;

// The reducer
export default searchAddSlice.reducer;
