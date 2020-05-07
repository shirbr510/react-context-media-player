import React, { useRef, useCallback,useEffect, useState} from "react";
import "./MediaPlayer.css";

const stringifyTime = (timeInSeconds = 0) => {
  const time = Math.floor(timeInSeconds);
  const timeInMinutes = Math.floor(time / 60)
  const restSeconds = time % 60
  return `${timeInMinutes}:${restSeconds}`
}

const Media = ({ time, format, alt, isPlaying, onTimeUpdate, ...props }) => {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  useEffect(()=>{
    const currentVideo = videoRef.current;
    if(currentVideo){
      if (isPlaying) {
        currentVideo.play()
      }
      else {
        currentVideo.pause()
      }
    }
    
  },[isPlaying])

  useEffect(() => {
    const currentVideo = videoRef.current;
    if (currentVideo) {
      const {currentTime} = currentVideo;
      if ( Math.abs(currentTime - time) > 1) {
        
        currentVideo.currentTime = time;
      }
    }

  }, [time])

  const updateTime = useCallback((e) => onTimeUpdate(e.target.currentTime), [onTimeUpdate])
  if (format === "video") {
    return <video ref={videoRef} onTimeUpdate={updateTime} {...props} />;
  }
  if (format === "image") {
    return <img ref={imageRef} alt={alt || props.src} {...props} />;
  }
  return <div>PLACEHOLDER</div>;
};

const Controls = ({ time, duration, onPlayClick, isPlaying, disableIsPlaying, onNextClick, disableNext, onPreviousClick, disablePrevious}) => {

  const stringifiedDuration = stringifyTime(duration);
  const stringifiedTime = stringifyTime(time);
  
  return (
    <div className="media-player-controls">
      <section className="media-player-controls-section flex-justify-start">
        <time>{stringifiedTime} / {stringifiedDuration}</time>
      </section>
      <section className="media-player-controls-section flex-justify-center">
        <button disabled={disableNext} onClick={onNextClick}>Next</button>
        <button disabled={disableIsPlaying} onClick={onPlayClick}>{isPlaying ? "pause" : "play"}</button>
        <button disabled={disablePrevious} onClick={onPreviousClick}>Prev</button>
      </section>
      <section className="media-player-controls-section flex-justify-end">
      </section>
    </div>
  );
}

const Seeker = ({ time, duration, onSeek})=>{
  const progressPercentile = time/duration * 100;
  const onChange = (e) => {
    const progressPercentile = e.target.value;
    const time = progressPercentile * duration / 100;
    onSeek(time);
  };
  return <input className="media-player-seeker" type="range" value={progressPercentile} min={0} max={100} step="0.001" onChange={onChange} />
}

const MediaPlayer = ({ src, format }) => {
  const [isPlaying,setPlayingState] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const togglePlayingState = () => setPlayingState(!isPlaying);
  const handleTimeEvent = useCallback(setTime, [setTime])
  const onDurationChange  = (e) => {
    setDuration(e.target.duration)
    setTime(0)
  }
  

  return (
    <div className="media-player">
      <Media time={time} format={format} src={src} isPlaying={isPlaying} onTimeUpdate={handleTimeEvent} onEnded={togglePlayingState} onDurationChange={onDurationChange } />
      <Seeker time={time} duration={duration} onSeek={setTime}/>
      <Controls time={time} duration={duration} disableIsPlaying={format !== "video"} isPlaying={isPlaying} onPlayClick={togglePlayingState} onSeek={setTime}/>
    </div>
  );
};

export default MediaPlayer;
