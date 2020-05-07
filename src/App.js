import React from "react";
import "./styles.css";
import MediaPlayer from "./components/MediaPlayer";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <MediaPlayer
        format={"video"}
        src={"http://techslides.com/demos/sample-videos/small.mp4"}
      />
    </div>
  );
}
