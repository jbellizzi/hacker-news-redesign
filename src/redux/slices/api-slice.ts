import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FrontPageItem, Item } from "../types";

export const hnApi = createApi({
  reducerPath: "hnApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hacker-news.firebaseio.com/v0/" }),
  endpoints: (build) => ({
    getTopStories: build.query<number[], void>({
      query: () => "topstories.json",
    }),

    getStory: build.query<FrontPageItem, number>({
      query: (id) => `item/${id}.json`,
      transformResponse: (response: Item) => {
        if (response.type !== "story" && response.type !== "job" && response.type !== "poll") {
          throw new Error(`item ${response.id} is not a story`);
        }
        return response;
      },
    }),
  }),
});

export const { useGetTopStoriesQuery, useLazyGetStoryQuery } = hnApi;
