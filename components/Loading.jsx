import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
