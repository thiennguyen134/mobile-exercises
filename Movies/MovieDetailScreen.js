import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const MovieDetailScreen = ({ route }) => {
  const { movie } = route.params;
  const IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  const imageUrl = IMAGEPATH + movie.poster_path;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>{movie.release_date}</Text>
      <Text style={styles.text}>{movie.overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MovieDetailScreen;
