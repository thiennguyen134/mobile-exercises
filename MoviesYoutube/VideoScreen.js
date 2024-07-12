import React from 'react';
import { View, StyleSheet } from 'react-native';
import VideoPlayerComponent from './VideoPlayerComponent';

const VideoScreen = ({ route }) => {
  const { video } = route.params;

  return (
    <View style={styles.container}>
      <VideoPlayerComponent videoId={video.key} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoScreen;
