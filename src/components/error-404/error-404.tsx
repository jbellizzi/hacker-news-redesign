import { NonIdealState } from "@blueprintjs/core";
import styles from "./error-404.module.css";

export const Error404 = () => {
  return (
    <NonIdealState
      className={styles.error}
      icon="error"
      title="404 - Page Not Found"
      description={
        <div>
          The page you are looking for does not exist. Please <a href={"/"}>click here</a> to go back to the home page.
        </div>
      }
    />
  );
};
