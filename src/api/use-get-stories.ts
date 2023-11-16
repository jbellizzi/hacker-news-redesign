import { useCallback, useEffect, useRef } from "react";
import { Filter } from "../components";
import { addStarredStories, addStories, useGetTopStoriesQuery, useLazyGetStoryQuery } from "../redux/slices";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { FrontPageItem } from "../redux/types";

interface UseGetStoriesProps {
  filter: Filter;
  numberToFetch?: number;
}

export const useGetStories = ({ filter, numberToFetch = 12 }: UseGetStoriesProps) => {
  const dispatch = useAppDispatch();

  // get topStoryIds
  const { data: topStoryIds } = useGetTopStoriesQuery(undefined, {
    skip: filter !== "latest",
  });

  // fetch a list of stories by ids
  const [getStory, { isFetching: isFetchingStories }] = useLazyGetStoryQuery();
  const fetchStories = useCallback(
    async (idsToFetch: number[]) => {
      // fetch all at once, waiting for all to resolve
      const results = await Promise.all(idsToFetch.map((id) => getStory(id)));
      // map data to stories, filter out undefined
      const stories = results
        .map((result) => result.data)
        .filter((story): story is FrontPageItem => story !== undefined);

      // dispatch to stories slice
      if (filter === "starred") dispatch(addStarredStories(stories));
      else dispatch(addStories(stories));
    },
    [getStory, filter, dispatch]
  );

  // get all top stories and starred stories
  const topStories = useAppSelector((state) => state.stories);
  const starredStories = useAppSelector((state) => state.starred);

  // get all available storyIds based on filter
  const allStoryIds = filter === "starred" ? starredStories.starredIds : topStoryIds;
  // get # of fetched stories based on filter
  const fetchedIndex = filter === "starred" ? starredStories.fetchedIndex : topStories.fetchedIndex;
  const starredLoadedFromStorage = starredStories.loadedFromStorage || filter !== "starred";

  // on initial load, if no stories have been fetched, fetch the first batch
  const hasFetchedInitial = useRef<boolean>(false);
  useEffect(() => {
    // if haven't fetched initial and there are storyIds, fetch the first batch
    if (allStoryIds && !hasFetchedInitial.current && starredLoadedFromStorage) {
      hasFetchedInitial.current = true;
      // This initial fetch will re-run every page load, but if there's already data, it will be capped by # to fetch
      const idsToFetch = allStoryIds.slice(fetchedIndex, numberToFetch);
      fetchStories(idsToFetch);
    }
  }, [fetchStories, fetchedIndex, numberToFetch, allStoryIds, hasFetchedInitial, starredLoadedFromStorage]);

  // function to show next batch of stories
  const fetchMore = useCallback(() => {
    if (allStoryIds) fetchStories(allStoryIds.slice(fetchedIndex, fetchedIndex + numberToFetch));
  }, [fetchStories, fetchedIndex, numberToFetch, allStoryIds]);

  const stories = filter === "starred" ? starredStories.list : topStories.list;
  const isUninitialized = filter === "starred" ? starredStories.isUninitialized : topStories.isUninitialized;

  return {
    stories,
    fetchMore,
    isFetching: isFetchingStories,
    isLoading: isUninitialized && stories.length === 0,
    noMoreStories: fetchedIndex >= (allStoryIds?.length || 0),
  };
};

export type GetStories = ReturnType<typeof useGetStories>;
