import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FrontPageItem } from "../types";

interface Stories {
  isUninitialized: boolean;
  // all story ids that have been fetched
  fetchedIds: number[];
  // all stories that have been fetched
  list: FrontPageItem[];
  // index of the last topStoryId fetched. used to determine starting point of next fetch batch
  fetchedIndex: number;
}

const initialState: Stories = {
  isUninitialized: true,
  fetchedIds: [],
  list: [],
  fetchedIndex: 0,
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStories: (state, action: PayloadAction<FrontPageItem[]>) => {
      state.fetchedIds.push(...action.payload.map((story) => story.id));
      state.list.push(...action.payload);
      state.fetchedIndex += action.payload.length;
      state.isUninitialized = false;
    },
  },
});

export const { addStories } = storiesSlice.actions;
export const { reducer: storiesReducer } = storiesSlice;
