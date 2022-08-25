import { createContext, useState } from "react";

const uiContext = createContext({
  ui: 1, //1-upload 2-loading 3-done
  setUI: () => {},
  imgUrl: null,
  setImgUrl: () => {},
});

export function UIContextProvider(props) {
  const [uiType, setUiType] = useState(1);
  const [imageURL, setImageURL] = useState(null);

  const handleUIType = (t) => {
    setUiType(t);
  };

  const handleImageURL = (url) => {
    setImageURL(url);
  };

  const context = {
    ui: uiType,
    setUI: handleUIType,
    imgUrl: imageURL,
    setImgUrl: handleImageURL,
  };

  return (
    <uiContext.Provider value={context}>{props.children}</uiContext.Provider>
  );
}

export default uiContext;
