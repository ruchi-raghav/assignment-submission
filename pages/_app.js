import '../styles/globals.css';

import data from '../data';

function MyApp({ Component, pageProps }) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("data", JSON.stringify(data));
  }

  return <Component {...pageProps} />;
}

export default MyApp;
