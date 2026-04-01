import React from "react";
import "./Macwindow.scss";
import { Rnd } from "react-rnd";

const Macwindow = ({ children, windowName, setWindowsState, width = "40vw", height = "40vh" }) => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  const defaultWidth = isMobile ? "90vw" : width;
  const defaultHeight = isMobile ? "75vh" : height;
  const defaultX = isMobile && typeof window !== 'undefined' ? window.innerWidth * 0.05 : 300;
  const defaultY = isMobile && typeof window !== 'undefined' ? window.innerHeight * 0.05 : 200;

  return (
    <Rnd
      default={{
        width: defaultWidth,
        height: defaultHeight,
        x: defaultX,
        y: defaultY
      }}
      style={{ zIndex: 50 }}
    >
      <div className="window">
        <div className="nav">
          <div className="dots">
            <div onClick={() => setWindowsState(prev => ({ ...prev, [windowName.toLowerCase()]: false }))} className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="title">
            <p>devashishsharma - zsh</p>
          </div>
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Macwindow;