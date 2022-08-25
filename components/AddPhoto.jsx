import React from 'react'
import styles from "./Gallery.module.css";


const AddPhoto = (props) => {
  return (
    <>
    <div className={styles.backdrop} onClick={()=>props.setShowAddPhoto(false)}></div>
    

    <div className={styles.add__photo}>

    </div>
    </>
   
  )
}

export default AddPhoto