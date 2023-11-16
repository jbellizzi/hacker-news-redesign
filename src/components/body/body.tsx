import { Button, NonIdealState } from "@blueprintjs/core";

import styles from "./body.module.css";
import { StoryComponent, StorySkeleton } from "../story";
import { GetStories, useGetStories } from "../../api";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleStarredStory } from "../../redux/slices";

interface BodyProps extends GetStories {
  noData?: React.ReactNode;
}

/** ================ Body ================
 * Main body component to render list of stories and allow for data fetching */
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
        // show skeleton if loading
        <StorySkeleton />
      ) : stories.length === 0 ? (
        // show noData render if no stories
        noData
      ) : (
        // render list of stories
        <>
          <ol>
            {stories
              // add starred property to each story
              .map((story) => ({ ...story, starred: starredIds.includes(story.id) }))
              .map((story) => (
                <li key={story.id} className={styles.listItem}>
                  <StoryComponent story={story} toggleStarredStory={handleStarStory} />
                </li>
              ))}
          </ol>
          {/* show more button. disabled if data is loading, or there are no more stories to load */}
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

/** ================ Latest Stories ================
 * Renders a list of latest stories */
export const LatestStories = () => {
  const getStories = useGetStories({ filter: "latest" });

  return <Body {...getStories} />;
};

/** ================ Starred Stories ================
 * Renders a list of starred stories */
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
