import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

function PersistentGame() {
  const location = useLocation();
  const [isGameVisible, setIsGameVisible] = useState(true);

    console.log(location.pathname);

  useEffect(() => {
    setIsGameVisible(location.pathname === "/home");
    const iframe = document.getElementById("game-frame");

    const handleScroll = (e) => {
      window.scrollBy(0, e.deltaY);
    };

    if (iframe) {
      iframe.contentWindow?.addEventListener("wheel", handleScroll);
    }

    return () => {
      iframe?.contentWindow?.removeEventListener("wheel", handleScroll);
    };
  }, [location]);

  return (
    <iframe
      id="game-frame"
      src="/Build/index.html" 
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
        zIndex: -1, 
        display: isGameVisible ? "block" : "none",
      }}
    />
  );
}

export default PersistentGame;
