import React from 'react';
import YouTube from 'react-native-youtube';
import APIConfiguration from './APIConfiguration';

const VideoPlayerComponent = ({ videoId }) => {
  return (
    <YouTube
      apiKey={APIConfiguration.YOUTUBE_API_KEY}
      videoId={videoId}
      play
      fullscreen
      loop
      style={{ alignSelf: 'stretch', height: 300 }}
    />
  );
};

export default VideoPlayerComponent;
