import classNames from "classnames";
import { Link } from "react-router-dom";

import styles from "./filter.module.css";
import { FilterController } from ".";

export const FilterComponent = ({ filter }: FilterController) => {
  return (
    <>
      <Link className={classNames(styles.filter, { [styles.filterSelected]: filter === "latest" })} to="latest">
        latest
      </Link>
      <span className={styles.divider}>|</span>
      <Link className={classNames(styles.filter, { [styles.filterSelected]: filter === "starred" })} to="starred">
        starred
      </Link>
    </>
  );
};
