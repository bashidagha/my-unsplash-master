import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import AddPhoto from "../components/AddPhoto";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { onValue, ref } from "firebase/database";
import { database } from "../helper/DatabaseHelper";
import Loading from "../components/Loading";
import DeletePhoto from "../components/DeletePhoto";

export default function Home() {
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [showDeletePhoto, setDeletePhoto] = useState(false);

  const [idToBeDelete, setIdToBeDelete] = useState(0);
  const [imageObject, setImageObject] = useState(0);

  const [updatePhotos, setUpdatePhotos] = useState(false);
  const [images, setImages] = useState(null);
  const [shownImages, setShownImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef(); 

  function GetFromDatabase() {
    setIsLoading(true);

    const imagesRef = ref(database, "/images");
    onValue(imagesRef, (snapshot) => {
      const data = snapshot.val();
      setImageObject(data);
      setImages(Object.values(data));
      setShownImages(Object.values(data));
      setIsLoading(false);
      console.log(Object.keys(data))
    });
  }

  useEffect(() => {
    GetFromDatabase();
  }, [updatePhotos]);

  const searchPhotoHandler = (e) => {
    e.preventDefault();

    if (searchRef.current.value === "" || searchRef.current.value.length > 10) {
      setShownImages(images);
    } else {
      setShownImages(
        images.filter((image) => image.label.includes(searchRef.current.value))
      );
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <div className="container">
        <nav>
          <img src="/my_unsplash_logo.svg" alt="logo"></img>
          <div className="nav__navbar">
            <div className="nav__search">
              <form onSubmit={searchPhotoHandler}>
                <input placeholder="Search by name" ref={searchRef}></input>
              </form>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
                viewBox="0 0 48 48"
              >
                <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" />
              </svg>
            </div>

            <button className="mybtn" onClick={() => setShowAddPhoto(true)}>
              Add a photo
            </button>
          </div>
        </nav>

        {isLoading && <Loading />}

        {!isLoading && shownImages && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 1,
              450: 2,
              800: 3,
              1200: 4,
              1400: 5,
            }}
            className="gallery"
          >
            <Masonry columnsCount={4} gutter="10px">
              {shownImages.map((image) => (
                <div className="gallery__item" key={image.id}>
                  <img src={image.url} alt={image.label} />
                  <div>
                    <p>{image.label}</p>
                    <button
                      onClick={() => {
                        setDeletePhoto(true);
                        setIdToBeDelete(image.id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
        <div className="footer__owner">
          created by <a href="https://github.com/bashidagha">bashidagha</a> -
          devChallenges.io
        </div>
      </div>

      {showAddPhoto && (
        <AddPhoto
          setShowAddPhoto={setShowAddPhoto}
          setUpdatePhotos={setUpdatePhotos}
        />
      )}

      {showDeletePhoto && (
        <DeletePhoto
          setDeletePhoto={setDeletePhoto}
          setUpdatePhotos={setUpdatePhotos}
          id={idToBeDelete}
          imageObject={imageObject}
        />
      )}
    </>
  );
}
