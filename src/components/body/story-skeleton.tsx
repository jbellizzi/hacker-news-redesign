import { SKELETON } from "@blueprintjs/core/lib/esm/common/classes";
import classNames from "classnames";

import styles from "./story-skeleton.module.css";

const SKELETON_LENGTH = 8;

export const StorySkeleton = () => {
  return (
    <ol>
      {Array.from({ length: SKELETON_LENGTH }).map((_, index) => (
        <li className={styles.item} key={index}>
          <div className={classNames(SKELETON, styles.titleLine)}>TITLE</div>
          <div className={classNames(SKELETON, styles.detailLine)}>TITLE</div>
        </li>
      ))}
    </ol>
  );
};
