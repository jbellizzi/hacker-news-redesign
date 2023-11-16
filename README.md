# Hacker News Redesign

This project is a redesign of the [Hacker News](https://news.ycombinator.com/) website. It is built using React, Vite, Redux, RTK Query, and BlueprintJS.

A live demo of the application is running at [https://jbellizzi.github.io/hacker-news-redesign](https://jbellizzi.github.io/hacker-news-redesign)

## Getting Started

To run the application locally, clone the repository and run the following commands:

```bash
npm install
```

```bash
npm run dev
```

## Testing

The application uses vitest with react-testing-library for testing. To test the application, run the following command:

```bash
npm run test
```

## Details

### API

The application uses the [Hacker News API](https://github.com/HackerNews/API) for fetching posts, defined in the `api-slice.ts` file. [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) is used for querying data and storing in the Redux store.

`https://hacker-news.firebaseio.com/v0/topstories.json` fetches the top 500 post IDs.

`https://hacker-news.firebaseio.com/v0/item/${id}.json` fetches the post details for a given ID.

The `useGetStories` hook in `src/api/use-get-stories.ts` handles the fetching logic for batching data fetches from the item api. A more advanced implementation could include building an microservice using Express or GraphQL that handles the batching logic and caching, allowing the frontend to make a single request for the top stories.

### Saving Posts

Posts saved from `latest` page are saved in the redux store, and also stored in the browser's local storage to simulate storing an individual user's saved posts in a database. A production implementation would involve sending user saved data to a backend service for storage.
