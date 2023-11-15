import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hnApi = createApi({
  reducerPath: "hnApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hacker-news.firebaseio.com/v0/" }),
  endpoints: (build) => ({
    getTopStories: build.query<number[], void>({
      query: () => "topstories.json",
    }),
  }),
});

export const { useGetTopStoriesQuery } = hnApi;
