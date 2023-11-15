import { Button, Spinner } from "@blueprintjs/core";
import { useGetTopStories } from "../../api";

import styles from "./body.module.css";
import { StoryComponent } from "./story";
import { StorySkeleton } from "./story-skeleton";

export const Body = () => {
  const { stories, fetchMore, isLoading, isFetching } = useGetTopStories();

  const handleShowMore = () => {
    fetchMore();
  };

  return (
    <div className={styles.bodyContainer}>
      {isLoading ? (
        <StorySkeleton />
      ) : (
        <ol>
          {stories.map((story) => (
            <li key={story.id} className={styles.listItem}>
              <StoryComponent story={story} />
            </li>
          ))}
        </ol>
      )}
      <Button className={styles.showMoreButton} onClick={handleShowMore} disabled={stories.length === 0 || isFetching}>
        {stories.length === 0 || isFetching ? <Spinner size={15} /> : <>show more</>}
      </Button>
    </div>
  );
};
