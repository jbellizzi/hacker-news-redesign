import classNames from "classnames";
import hnLogo from "../../assets/hn-title-logo.svg";
import nightModeIcon from "../../assets/night-mode-icon.svg";

import styles from "./header.module.css";
import { FilterController } from "./hooks";

export const Header = ({ filter, handleFilterChange }: FilterController) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBorder} />
      <div className={styles.headerContent}>
        <div className={styles.leftHeaderContent}>
          <img src={hnLogo} alt="Hacker News Logo" className={styles.hnLogo} />
          <a href="#" className={classNames({ [styles.filterSelected]: filter === "latest" })}>
            latest
          </a>
          &nbsp; | &nbsp;
          <a href="#" className={classNames({ [styles.filterSelected]: filter === "starred" })}>
            starred
          </a>
        </div>
        <div className={styles.nightModeIconContainer}>
          <img src={nightModeIcon} className={styles.nightModeIcon} />
        </div>
      </div>
    </div>
  );
};
