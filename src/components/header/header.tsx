import hnLogo from "../../assets/hn-title-logo.svg";
import nightModeIcon from "../../assets/night-mode-icon.svg";

import styles from "./header.module.css";
import { FilterComponent, FilterController } from "../filter";

export const Header = ({ filter, handleFilterChange }: FilterController) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBorder} />
      <div className={styles.headerContent}>
        <div className={styles.leftHeaderContent}>
          <img src={hnLogo} alt="Hacker News Logo" className={styles.hnLogo} />
          <FilterComponent filter={filter} handleFilterChange={handleFilterChange} />
        </div>
        <div role="button" className={styles.nightModeIconContainer}>
          <img src={nightModeIcon} className={styles.nightModeIcon} />
        </div>
      </div>
    </div>
  );
};
