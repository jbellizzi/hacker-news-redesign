import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import starEmptyIcon from "../../assets/star-empty.svg";
import { FrontPageItem } from "../../redux/types";
import { getDomainFromUrl } from "../../utilities";

import styles from "./story.module.css";

dayjs.extend(relativeTime);

interface StoryProps {
  story: FrontPageItem;
}

export const StoryComponent = ({ story }: StoryProps) => {
  const { id, type, title, time } = story;
  const isStory = type === "story";
  const isJob = type === "job";
  const isPoll = type === "poll";

  const date = time ? new Date(time * 1000) : new Date();

  const fromNow = dayjs(date).fromNow();

  return (
    <div className={styles.story}>
      <div className={styles.titleLine}>
        <>
          <a
            href={isStory || isJob ? story.url : `https://news.ycombinator.com/item?id=${id}`}
            className={styles.title}
          >
            {title}
          </a>
          {(isStory || isJob) && <span className={styles.linkContainer}>({getDomainFromUrl(story.url || "")})</span>}
        </>
      </div>
      <div className={styles.detailLine}>
        {(isStory || isPoll) && <>{story.score} points</>} {(isStory || isPoll) && <>by {story.by}</>} {fromNow} |&nbsp;
        {(isStory || isPoll) && <>{story.descendants} comments |&nbsp;</>}
        <div className={styles.saveContainer}>
          <img src={starEmptyIcon} alt="save-empty" /> &nbsp;save
        </div>
      </div>
    </div>
  );
};
