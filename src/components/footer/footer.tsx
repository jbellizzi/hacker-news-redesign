import { FilterComponent, FilterController } from "../filter";
import styles from "./footer.module.css";

export const Footer = ({ filter, handleFilterChange }: FilterController) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerDivider} />
      <div className={styles.label}>Hacker News</div>
      <FilterComponent filter={filter} handleFilterChange={handleFilterChange} />
    </div>
  );
};
