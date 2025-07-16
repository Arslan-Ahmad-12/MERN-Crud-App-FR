import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 5,
  search: "",
  sort: "desc",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setPage, setLimit, setSearch, setSort } = projectSlice.actions;
export default projectSlice.reducer;
