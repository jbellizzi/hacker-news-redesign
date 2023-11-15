import hnLogo from "../../assets/hn-title-logo.svg";
import hnLogoDarkMode from "../../assets/hn-title-logo-dark-mode.svg";
import darkModeIcon from "../../assets/dark-mode-icon.svg";
import lightModeIcon from "../../assets/light-mode-icon.svg";

import styles from "./header.module.css";
import { FilterComponent, FilterController } from "../filter";
import { Button } from "@blueprintjs/core";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useCallback } from "react";
import { toggleTheme } from "../../redux/slices";

export const Header = ({ filter }: FilterController) => {
  const dispatch = useAppDispatch();
  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const themeMode = useAppSelector((state) => state.theme.mode);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBorder} />
      <div className={styles.headerContent}>
        <div className={styles.leftHeaderContent}>
          <img src={themeMode === "dark" ? hnLogoDarkMode : hnLogo} alt="Hacker News Logo" className={styles.hnLogo} />
          <FilterComponent filter={filter} />
        </div>
        <Button
          className={styles.themeButton}
          icon={<img src={themeMode === "dark" ? lightModeIcon : darkModeIcon} className={styles.nightModeIcon} />}
          minimal={true}
          onClick={handleToggleTheme}
        />
      </div>
    </div>
  );
};
