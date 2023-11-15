import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Item } from "../types";

export const hnApi = createApi({
  reducerPath: "hnApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hacker-news.firebaseio.com/v0/" }),
  endpoints: (build) => ({
    getTopStories: build.query<number[], void>({
      query: () => "topstories.json",
    }),

    getItem: build.query<Item, number>({
      query: (id) => `item/${id}.json`,
    }),
  }),
});

export const { useGetTopStoriesQuery, useLazyGetItemQuery } = hnApi;
