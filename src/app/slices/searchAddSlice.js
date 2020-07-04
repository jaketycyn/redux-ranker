import { createSlice } from "@reduxjs/toolkit";

//hasErrors/loading for external DB setup/acquisition

export const initialState = {
  loading: false,
  hasErrors: false,
  itemTitles: [],
  selection: false,
};

const searchAddSlice = createSlice({
  name: "searchAdd",
  initialState,
  reducers: {
    getItems: (state) => {
      state.loading = true;
    },
    getItemsSuccess: (state, { payload }) => {
      state.itemTitles = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getItemsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      console.log(state.itemTitles);
    },
    addItem: (state) => {
      //action.payload.(PROPS PASSSED VIA STATE)
    },
    updateSelection: (state) => {
      state.selection = !state.selection;
    },
  },
});

//Actions generated from the slice
export const {
  getItems,
  getItemsSuccess,
  getItemsFailure,
  addItem,
  updateSelection,
} = searchAddSlice.actions;

// A selector
export const searchAddSelector = (state) => state.itemTitles;

// The reducer
export default searchAddSlice.reducer;
