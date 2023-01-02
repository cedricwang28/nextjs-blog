// import "../styles/globals.css";
import { useState, useEffect } from "react";
import "../styles/index.scss";
import "../styles/blog.scss";

export default function App({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return <Component {...pageProps} />;
}
