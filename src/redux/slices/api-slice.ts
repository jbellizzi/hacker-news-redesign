import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FrontPageItem, Item } from "../types";

// API to query hacker news public api
export const hnApi = createApi({
  reducerPath: "hnApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hacker-news.firebaseio.com/v0/" }),
  endpoints: (build) => ({
    // get a list of the top story ids
    getTopStories: build.query<number[], void>({
      query: () => "topstories.json",
    }),

    // get a story by id
    getStory: build.query<FrontPageItem, number>({
      query: (id) => `item/${id}.json`,
      transformResponse: (response: Item) => {
        // throw error if item is not a story, job, or poll
        if (response.type !== "story" && response.type !== "job" && response.type !== "poll") {
          throw new Error(`item ${response.id} is not a story`);
        }
        return response;
      },
    }),
  }),
});

export const { useGetTopStoriesQuery, useLazyGetStoryQuery } = hnApi;
