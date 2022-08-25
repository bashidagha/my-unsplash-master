import React from "react";
import styles from "./Gallery.module.css";

const AddPhoto = (props) => {
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => props.setShowAddPhoto(false)}
      ></div>

      <div className={styles.add__photo}>
        <h3>Add a new photo</h3>

        <form>
          <label>Label</label>
          <input></input>
          <label>Photo URL</label>
          <input></input>
          <button type="submit" className="mybtn">Submit</button>
          <button className="btn__cancel">Cancel</button>
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
