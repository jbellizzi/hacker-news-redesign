import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Item } from "../types";

interface StoriesState {
  storyIds: number[];
  stories: Item[];
  fetchedStories: number;
}

const initialState: StoriesState = {
  storyIds: [],
  stories: [],
  fetchedStories: 0,
};

const storiesSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStory: (state, action: PayloadAction<Item>) => {
      if (!state.storyIds.includes(action.payload.id)) {
        state.storyIds.push(action.payload.id);
        state.stories.push(action.payload);
        state.fetchedStories = state.stories.length;
      }
    },
    addStories: (state, action: PayloadAction<Item[]>) => {
      const storiesToAdd = action.payload.filter((story) => !state.storyIds.includes(story.id));
      state.storyIds.push(...storiesToAdd.map((story) => story.id));
      state.stories.push(...storiesToAdd);
      state.fetchedStories = state.stories.length;
    },
  },
});

export const { addStory, addStories } = storiesSlice.actions;
export const { reducer: storiesReducer } = storiesSlice;
