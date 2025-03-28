import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./styles.css";

function PersistentGame() {
  const location = useLocation();
  const [isGameVisible, setIsGameVisible] = useState(true);


  useEffect(() => {
    const handleMessage = (event) => {
      console.log("📩 [Web -> React] Full Event:", event);
      console.log("📩 [Web -> React] Data Received:", event.data);
  
      if (event.data?.type === "unityMessage") {
        console.log("✅ Unity gửi:", event.data);
      }
    };
  
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
      sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
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
