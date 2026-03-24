import React from "react";
import MacWindow from "./MacWindow";
import "./spotify.scss";

const Spotify = ({ setWindowsState, windowName }) => {
  return (
    <MacWindow setWindowsState={setWindowsState} windowName={windowName} width="30vw">
      <div className="spotify-window">
   <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO3n0Aus?utm_source=generator"
        width="100%"
         height="380"
        frameborder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      ></iframe>
      </div>
      
    </MacWindow>
  );
};

export default Spotify;