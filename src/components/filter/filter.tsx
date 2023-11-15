import classNames from "classnames";

import styles from "./filter.module.css";
import { FilterController } from ".";

export const FilterComponent = ({ filter }: FilterController) => {
  return (
    <>
      <a href="#" className={classNames(styles.filter, { [styles.filterSelected]: filter === "latest" })}>
        latest
      </a>
      &nbsp; | &nbsp;
      <a href="#" className={classNames(styles.filter, { [styles.filterSelected]: filter === "starred" })}>
        starred
      </a>
    </>
  );
};
