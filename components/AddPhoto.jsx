import { ref, set } from "firebase/database";
import React, { useRef } from "react";
import { database } from "../helper/DatabaseHelper";
import styles from "./Gallery.module.css";

const AddPhoto = (props) => {
  const labelRef = useRef();
  const urlRef = useRef();

  const closeModalHandler = () => {
    props.setShowAddPhoto(false);
  };

  const addPhotoHandler = (e) => {
    e.preventDefault();
    set(ref(database, "images/" + props.length), {
      label: labelRef.current.value,
      url: urlRef.current.value,
    });
    closeModalHandler();
    props.setPhotoAdded((prevState) => !prevState);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={closeModalHandler}></div>

      <div className={styles.add__photo} onSubmit={addPhotoHandler}>
        <h3>Add a new photo</h3>

        <form>
          <label>Label</label>
          <input type="text" required ref={labelRef}></input>
          <label>Photo URL</label>
          <input type="url" required ref={urlRef}></input>
          <button type="submit" className="mybtn">
            Submit
          </button>
          <button className="btn__cancel" onClick={closeModalHandler}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
