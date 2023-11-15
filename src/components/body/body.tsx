import { Item, Story } from "../../redux/types";

import styles from "./body.module.css";
import { StoryComponent } from "./story";

interface BodyProps {
  items: Item[];
}

export const Body = ({ items }: BodyProps) => {
  return (
    <div className={styles.bodyContainer}>
      <ol>
        {items
          .filter((item): item is Story => item.type === "story")
          .map((story, i) => (
            <li key={story.id}>
              <StoryComponent story={story} rank={i + 1} />
            </li>
          ))}
      </ol>
      <button className={styles.showMoreButton}>show more</button>
    </div>
  );
};
