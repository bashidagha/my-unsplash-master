import React, { useContext } from "react";
import uiContext from "../store/ui-context";
import styles from "../styles/Home.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loaded = () => {
  const ctx = useContext(uiContext);

  return (
    <>
      <div className={styles.loaded}>
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
          <path d="M18.9 35.7 7.7 24.5l2.15-2.15 9.05 9.05 19.2-19.2 2.15 2.15Z" />
        </svg>
        <h3>Uploaded Successfully!</h3>
        <img src={ctx.imgUrl} alt="image"></img>

        <div className={styles.loaded__link}>
          <p>{ctx.imgUrl}</p>

          <button onClick={() => {navigator.clipboard.writeText(ctx.imgUrl);toast("text copied to clipboard!");}}>
            Copy Link
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Loaded;
