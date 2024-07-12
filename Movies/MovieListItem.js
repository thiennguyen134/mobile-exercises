import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieListItem = ({ movie }) => {
  const IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  const imageUrl = IMAGEPATH + movie.poster_path;

  return (
    <View style={styles.movieItem}>
      <View style={styles.movieItemImage}>
        <Image source={{ uri: imageUrl }} style={{ width: 99, height: 146 }} />
      </View>
      <View style={{ marginRight: 50 }}>
        <Text style={styles.movieItemTitle}>{movie.title}</Text>
        <Text style={styles.movieItemText}>{movie.release_date}</Text>
        <Text numberOfLines={6} ellipsizeMode="tail" style={styles.movieItemText}>{movie.overview}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row'
  },
  movieItemImage: {
    marginRight: 5
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap'
  }
});

export default MovieListItem;
