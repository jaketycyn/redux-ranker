import { createSlice } from "@reduxjs/toolkit";

//hasErrors/loading for external DB setup/acquisition

export const initialState = {
  loading: false,
  hasErrors: false,
  items: [],
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
      state.items = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getItemsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      console.log(state.items);
    },
    addItem: (state, action) => {
      console.log(action.payload);
    },

    toggleSelection: (state, action) => {
      const selectItem = state.find((item) => item.id === action.payload);
      if (selectItem) {
        state.selection = !state.selection;
      }
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
export const searchAddSelector = (state) => state.items;

// The reducer
export default searchAddSlice.reducer;
