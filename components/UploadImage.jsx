import React, { useContext, useRef, useState } from "react";
import uiContext from "../store/ui-context";
import styles from "../styles/Home.module.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../helper/uploadHelper";
import Uploading from "./Uploading";
import Loaded from "./Loaded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadImage = () => {
  const inputRef = useRef();
  const [dragActive, setDragActive] = useState(false);
  const ctx = useContext(uiContext);

  const imageUploaderHelper = (file) => {
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    if (!file) return;

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        // );
        // setProgresspercent(progress);
        ctx.setUI(2);
      },
      (error) => {
        alert(error);
        ctx.setUI(1);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          ctx.setImgUrl(downloadURL);
          ctx.setUI(3);
        });
      }
    );
  };

  const chooseFileHandler = () => {
    inputRef.current.click();
  };

  const getSelectedFileHandler = () => {
    const file = inputRef.current.files[0];
    if (file.type.slice(0, 5) !== "image") {
      toast("Just upload Image, please!");
    } else {
      imageUploaderHelper(file);
    }
  };

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type.slice(0, 5) === "image"
    ) {
      ctx.setUI(2);
      imageUploaderHelper(e.dataTransfer.files[0]);
    }

    if (e.dataTransfer.files[0].type.slice(0, 5) !== "image") {
      toast("Just upload Image, please!");
    }
  };

  return (
    <>
      {ctx.ui === 2 && <Uploading />}
      {ctx.ui === 1 && (
        <div className={styles.upload}>
          <h3>Upload your image</h3>
          <p>File should be Jpeg, Png,...</p>

          <div
            className={`${styles.upload__drag} ${
              dragActive ? styles.active : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <img src="/image.svg" alt="image upload"></img>
            <div>Drag & Drop your image here</div>
          </div>

          <p>Or</p>
          <button onClick={chooseFileHandler}>Choose a file</button>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={getSelectedFileHandler}
          ></input>
        </div>
      )}
      {ctx.ui === 3 && <Loaded />}
      <ToastContainer />
    </>
  );
};

export default UploadImage;
