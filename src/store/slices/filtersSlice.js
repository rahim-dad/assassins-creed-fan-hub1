import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  platform: 'All',
  year: 'All',
  sortBy: 'title-asc', // title-asc | rating-desc | date-desc | date-asc
  page: 1,
  pageSize: 8,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPlatform: (state, action) => {
      state.platform = action.payload;
      state.page = 1;
    },
    setYear: (state, action) => {
      state.year = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setPlatform, setYear, setSortBy, setPage, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
