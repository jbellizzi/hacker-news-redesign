import { useEffect, useState } from "react";
import { addStories, useGetTopStoriesQuery, useLazyGetItemQuery } from "../../redux/slices";
import { Item } from "../../redux/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";

interface UseGetLatestStoriesProps {
  numberToFetch?: number;
}

export const useGetLatestStories = ({ numberToFetch = 12 }: UseGetLatestStoriesProps = {}) => {
  const { data: topStoryIds, isLoading: isTopStoriesQueryLoading } = useGetTopStoriesQuery();

  const [getItem] = useLazyGetItemQuery();

  const dispatch = useAppDispatch();

  const [isLatestStoriesLoading, setIsLatestStoriesLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (topStoryIds) {
        setIsLatestStoriesLoading(true);
        const results = await Promise.all(topStoryIds?.slice(0, numberToFetch).map((id) => getItem(id)));
        const items = results.map((result) => result.data).filter((item): item is Item => item !== undefined);

        addStories(items);
        dispatch(addStories(items));
        setIsLatestStoriesLoading(false);
      }
    })();
  }, [getItem, topStoryIds, numberToFetch, dispatch]);

  const latestStories = useAppSelector((state) => state.stories.stories);

  return { latestStories, isLoading: isTopStoriesQueryLoading || isLatestStoriesLoading };
};
