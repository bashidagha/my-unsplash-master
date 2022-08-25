import { UIContextProvider } from "../store/ui-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UIContextProvider>
      <Component {...pageProps} />
    </UIContextProvider>
  );
}

export default MyApp;
