import React, { useState } from "react";
import "./styles.css";
import MediaPlayer from "./components/MediaPlayer";

export default function App() {
  const [media, setMedia] = useState(null);
  const setVideo=()=>setMedia({
    format: 'video',
    src: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
  })
  const setImage = () => setMedia({
    format: 'image',
    src: "https://source.unsplash.com/random/300x200"
  })

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={setVideo}>Video</button>
      <button onClick={setImage}>Image</button>
      { media && <MediaPlayer {...media} /> }
    </div>
  );
}
