import { createSlice } from "@reduxjs/toolkit";

interface Theme {
  mode: "light" | "dark";
}

const initialState: Theme = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const { reducer: themeReducer } = themeSlice;
