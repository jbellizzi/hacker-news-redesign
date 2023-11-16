import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FrontPageItem } from "../types";

interface Starred {
  loadedFromStorage: boolean;
  isUninitialized: boolean;
  starredIds: number[];
  fetchedIds: number[];
  list: FrontPageItem[];
  fetchedIndex: number;
}

const initialState: Starred = {
  loadedFromStorage: false,
  isUninitialized: true,
  starredIds: [],
  fetchedIds: [],
  list: [],
  fetchedIndex: 0,
};

const starredSlice = createSlice({
  name: "starred",
  initialState,
  reducers: {
    // initialize starred stories from local storage. this is to simulate calling a users saved stories from a database
    initializeFromStorage: (state) => {
      const starredIds = window.localStorage.getItem("hn_starred");
      if (starredIds) {
        state.starredIds = JSON.parse(starredIds);
      }
      state.loadedFromStorage = true;
    },

    // toggle a story's saved status
    toggleStarredStory: (state, action: PayloadAction<number>) => {
      // if story is already saved, remove it from saved stories
      if (state.starredIds.includes(action.payload)) {
        const index = state.starredIds.indexOf(action.payload);
        state.starredIds = [...state.starredIds.slice(0, index), ...state.starredIds.slice(index + 1)];

        const fetchedIdsIndex = state.fetchedIds.indexOf(action.payload);
        state.fetchedIds = [
          ...state.fetchedIds.slice(0, fetchedIdsIndex),
          ...state.fetchedIds.slice(fetchedIdsIndex + 1),
        ];
        state.list = [...state.list.slice(0, fetchedIdsIndex), ...state.list.slice(fetchedIdsIndex + 1)];

        if (state.fetchedIndex > 0) state.fetchedIndex--;
      } else {
        state.starredIds.push(action.payload);
      }

      window.localStorage.setItem("hn_starred", JSON.stringify(state.starredIds));
    },

    addStarredStories: (state, action: PayloadAction<FrontPageItem[]>) => {
      state.fetchedIds.push(...action.payload.map((story) => story.id));
      state.list.push(...action.payload);
      state.fetchedIndex += action.payload.length;
      state.isUninitialized = false;
    },
  },
});

export const { initializeFromStorage, toggleStarredStory, addStarredStories } = starredSlice.actions;
export const { reducer: starredReducer } = starredSlice;
