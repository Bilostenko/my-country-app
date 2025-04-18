// features/search/searchSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchValue: string;
  error: boolean;
}

const initialState: SearchState = {
  searchValue: "",
  error: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
    resetSearch(state) {
      state.searchValue = "";
      state.error = false;
    },
  },
});

export const { setSearchValue, setError, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
