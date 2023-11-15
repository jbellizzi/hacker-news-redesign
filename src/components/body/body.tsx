import { Button, NonIdealState } from "@blueprintjs/core";

import styles from "./body.module.css";
import { StoryComponent } from "./story";
import { StorySkeleton } from "./story-skeleton";
import { GetStories, useGetStories } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleStarredStory } from "../../redux/slices";

interface BodyProps extends GetStories {
  noData?: React.ReactNode;
}

export const Body = ({ stories, fetchMore, isLoading, isFetching, noMoreStories, noData }: BodyProps) => {
  const handleShowMore = () => {
    fetchMore();
  };

  const dispatch = useAppDispatch();
  const starredIds = useAppSelector((state) => state.starred.starredIds);

  const handleStarStory = (id: number) => {
    dispatch(toggleStarredStory(id));
  };

  return (
    <div className={styles.bodyContainer}>
      {isLoading ? (
        <StorySkeleton />
      ) : stories.length === 0 ? (
        noData
      ) : (
        <>
          <ol>
            {stories
              .map((story) => ({ ...story, starred: starredIds.includes(story.id) }))
              .map((story) => (
                <li key={story.id} className={styles.listItem}>
                  <StoryComponent story={story} toggleStarredStory={handleStarStory} />
                </li>
              ))}
          </ol>
          <Button
            className={styles.showMoreButton}
            onClick={handleShowMore}
            loading={isLoading || isFetching}
            disabled={noMoreStories}
          >
            show more
          </Button>
        </>
      )}
    </div>
  );
};

export const LatestStories = () => {
  const getStories = useGetStories({ filter: "latest" });

  return <Body {...getStories} />;
};

export const StarredStories = () => {
  const getStories = useGetStories({ filter: "starred" });

  return (
    <Body
      {...getStories}
      noData={
        <NonIdealState
          icon="star"
          title="No Starred Stories"
          description={`Add starred stories by saving stories from the "latest" view`}
        />
      }
    />
  );
};
