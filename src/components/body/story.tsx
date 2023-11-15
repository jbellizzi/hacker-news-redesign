import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import starEmptyIcon from "../../assets/star-empty.svg";
import { Story } from "../../redux/types";
import { getDomainFromUrl } from "../../utilities";

import styles from "./story.module.css";

dayjs.extend(relativeTime);

interface StoryProps {
  story: Story;
  rank: number;
}

export const StoryComponent = ({ story }: StoryProps) => {
  const { url, title, score, by, time, descendants } = story;
  const date = time ? new Date(time * 1000) : new Date();

  const fromNow = dayjs(date).fromNow();

  return (
    <div className={styles.story}>
      <div className={styles.titleLine}>
        <a href={url} className={styles.title}>
          {title}
        </a>
        <span className={styles.linkContainer}>({getDomainFromUrl(url || "")})</span>
      </div>
      <div className={styles.detailLine}>
        {score} points by {by} {fromNow} | {descendants} comments |{" "}
        <div className={styles.saveContainer}>
          <img src={starEmptyIcon} /> &nbsp;save
        </div>
      </div>
    </div>
  );
};
