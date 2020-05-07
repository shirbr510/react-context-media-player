import React from "react";

const Media = ({ format, alt, ...props }) => {
  if (format === "video") {
    return <video {...props} />;
  }
  if (format === "image") {
    return <img alt={alt || props.src} {...props} />;
  }
  return <div>PLACEHOLDER</div>;
};

const MediaPlayer = ({ src, format }) => {
  return (
    <div>
      <Media format={format} src={src} />
    </div>
  );
};

export default MediaPlayer;
