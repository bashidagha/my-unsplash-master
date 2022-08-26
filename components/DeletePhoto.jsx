import { ref, set } from "firebase/database";
import React, { useRef } from "react";
import { database } from "../helper/DatabaseHelper";
import styles from "./Gallery.module.css";

const DeletePhoto = (props) => {
  const passwordRef = useRef();

  const closeModalHandler = () => {
    props.setDeletePhoto(false);
  };

  const addPhotoHandler = (e) => {
    e.preventDefault();
    
    closeModalHandler();
    props.setUpdatePhotos((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={closeModalHandler}></div>

      <div className={styles.add__photo} onSubmit={addPhotoHandler}>
        <h3>Are you sure?</h3>

        <form>
          <label>Password</label>
          <input type="text" required ref={passwordRef}></input>

          <button type="submit" className="mybtn mybtn__danger">
            Delete
          </button>
          <button className="btn__cancel" onClick={closeModalHandler}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default DeletePhoto;
