import { ref, set } from "firebase/database";
import React, { useRef } from "react";
import { database } from "../helper/DatabaseHelper";
import styles from "./Gallery.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeletePhoto = (props) => {
  const passwordRef = useRef();

  const closeModalHandler = () => {
    props.setDeletePhoto(false);
  };

  const addPhotoHandler = (e) => {
    e.preventDefault();

    if (passwordRef.current.value === process.env.NEXT_PUBLIC_deletepassword) {
      closeModalHandler();
      props.setUpdatePhotos((prevState) => !prevState);
    } else {
      toast("Wrong password!");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.backdrop} onClick={closeModalHandler}></div>

      <div className={styles.add__photo} onSubmit={addPhotoHandler}>
        <h3>Are you sure?</h3>

        <form>
          <label>Password</label>
          <input
            type="password"
            required
            ref={passwordRef}
            autoComplete="new-password"
          ></input>

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
