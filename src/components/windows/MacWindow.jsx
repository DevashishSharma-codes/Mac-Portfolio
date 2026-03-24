import React from "react";
import "./Macwindow.scss";
import { Rnd } from "react-rnd";

const Macwindow = ({ children, windowName,setWindowsState, width = "40vw", height = "40vh" }) => {
  return (
    <Rnd
      default={{
                width: width,
                height: height,
                x: 300,
                y: 200
            }}
    >
      <div className="window">
        <div className="nav">
          <div className="dots">
            <div onClick={()=> setWindowsState(prev => ({ ...prev, [windowName.toLowerCase()]: false }))} className="dot red"></div>
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