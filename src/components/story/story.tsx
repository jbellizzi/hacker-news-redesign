import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { FrontPageItem } from "../../redux/types";
import { getDomainFromUrl } from "../../utilities";

import styles from "./story.module.css";
import classNames from "classnames";

dayjs.extend(relativeTime);

type FrontPageItemStarred = FrontPageItem & {
  starred: boolean;
};

interface StoryProps {
  story: FrontPageItemStarred;
  toggleStarredStory: (id: number) => void;
}

/** ================ Story Component ================
 * Renders a single story item */
export const StoryComponent = ({ story, toggleStarredStory }: StoryProps) => {
  const { id, type, title, time, starred } = story;
  // story item can be a story, job, or poll type, each containing different properties.
  // conditionally render proper detail fields based on type
  const isStory = type === "story";
  const isJob = type === "job";
  const isPoll = type === "poll";

  // calculate time ago from now
  const date = time ? new Date(time * 1000) : new Date();
  const fromNow = dayjs(date).fromNow();

  const handleStarStory = () => {
    toggleStarredStory(id);
  };

  return (
    <div className={styles.story}>
      <div className={styles.titleLine}>
        <>
          {/* title */}
          <a
            href={isStory || isJob ? story.url : `https://news.ycombinator.com/item?id=${id}`}
            className={styles.title}
          >
            {title}
          </a>
          {/* Show domain for story or job item */}
          {(isStory || isJob) && <span className={styles.linkContainer}>({getDomainFromUrl(story.url || "")})</span>}
        </>
      </div>
      <div className={styles.detailLine}>
        {/* points and author for story or poll item */}
        {(isStory || isPoll) && (
          <>
            {story.score} points by {story.by}
          </>
        )}{" "}
        {/* time ago from now */}
        {fromNow} |&nbsp;
        {/* comments for story or poll item */}
        {(isStory || isPoll) && (
          <>
            <a className={styles.comment} href={`https://news.ycombinator.com/item?id=${id}`}>
              {story.descendants} comments
            </a>
            &nbsp;|&nbsp;
          </>
        )}
        {/* save button */}
        <div className={styles.saveContainer} onClick={handleStarStory}>
          <img
            className={classNames({ [styles.emptyStarIcon]: !starred, [styles.filledStarIcon]: starred })}
            alt="save-empty"
          />{" "}
          &nbsp;<span>{starred ? "saved" : "save"}</span>
        </div>
      </div>
    </div>
  );
};
