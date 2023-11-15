import { useCallback, useEffect } from "react";
import { addStories, useGetTopStoriesQuery, useLazyGetStoryQuery } from "../../redux/slices";
import { FrontPageItem } from "../../redux/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";

interface UseGetTopStoriesProps {
  numberToFetch?: number;
}

export const useGetTopStories = ({ numberToFetch = 12 }: UseGetTopStoriesProps = {}) => {
  const dispatch = useAppDispatch();

  // get topStoryIds
  const { data: topStoryIds, isLoading: isLoadingTopStories } = useGetTopStoriesQuery();

  // fetch a list of stories by ids
  const [getStory, { isLoading: isLoadingStories, isFetching: isFetchingStories }] = useLazyGetStoryQuery();

  const fetchStories = useCallback(
    async (idsToFetch: number[]) => {
      // fetch all at once, waiting for all to resolve
      const results = await Promise.all(idsToFetch.map((id) => getStory(id)));
      // map data to stories, filter out undefined
      const stories = results
        .map((result) => result.data)
        .filter((story): story is FrontPageItem => story !== undefined);

      // dispatch to stories slice
      dispatch(addStories(stories));
    },
    [getStory, dispatch]
  );

  const fetchedIndex = useAppSelector((state) => state.stories.fetchedIndex);
  const stories = useAppSelector((state) => state.stories.list);

  // on initial load, if no stories have been fetched, fetch the first batch
  useEffect(() => {
    if (fetchedIndex === 0 && topStoryIds) {
      const idsToFetch = topStoryIds.slice(fetchedIndex, numberToFetch);
      fetchStories(idsToFetch);
    }
  }, [fetchStories, fetchedIndex, numberToFetch, topStoryIds]);

  // function to show next batch of stories
  const fetchMore = useCallback(() => {
    if (topStoryIds) fetchStories(topStoryIds.slice(fetchedIndex, fetchedIndex + numberToFetch));
  }, [fetchStories, fetchedIndex, numberToFetch, topStoryIds]);

  return { stories, fetchMore, isFetching: isFetchingStories, isLoading: isLoadingStories || isLoadingTopStories };
};
