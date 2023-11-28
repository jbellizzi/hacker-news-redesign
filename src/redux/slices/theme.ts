import { createSlice } from "@reduxjs/toolkit";

interface Theme {
  mode: "light" | "dark";
}

const storedTheme = window.localStorage.getItem("hn_theme");

const initialState: Theme = {
  mode: storedTheme === "dark" ? "dark" : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // toggle between light and dark mode
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      window.localStorage.setItem("hn_theme", state.mode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const { reducer: themeReducer } = themeSlice;
