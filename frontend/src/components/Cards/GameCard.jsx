import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const GameCard = () => {

    const location = useLocation();     
    const isGamePage = location.pathname === "/home";

    const [visible, setVisible] = useState(() => {
        return localStorage.getItem("unityGameVisible") === "false" ? false : true;
    });

    useEffect(() => {
        localStorage.setItem("unityGameVisible", visible);
        setVisible(isGamePage);
    }, [visible]);

  return (
    <div>
        <div 
            style={{ 
                display: visible ? "block" : "none",
                width: "100vw",
                height: "100vh",
                zIndex: -1
             }}
        >
           <iframe
                id="unity-frame"
                src="/Build/index.html"
                width="100%"
                height="100%"
                style={{ border: "none" }}
            ></iframe>
        </div>
    </div>
  );
};

export default GameCard;
