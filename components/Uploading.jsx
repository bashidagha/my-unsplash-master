import React from "react";
import styles from "../styles/Home.module.css";

const Uploading = () => {
  return (
    <div className={styles.uploading}>
      <h3>Uploading...</h3>
      <div className={styles.progress}>
        <div></div>
      </div>
    </div>
  );
};

export default Uploading;
