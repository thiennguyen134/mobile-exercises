import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Button, Linking } from 'react-native';
import { getMovieDetails } from './api';

const MovieDetailScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  const imageUrl = IMAGEPATH + movie.poster_path;

  useEffect(() => {
    const fetchData = async () => {
      const details = await getMovieDetails(movie.id);
      setMovieDetails(details);
    };

    fetchData();
  }, [movie.id]);

  if (!movieDetails) {
    return <Text>Loading...</Text>;
  }

  const playVideo = () => {
    const videoUrl = `https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`;
    Linking.openURL(videoUrl).catch((err) => console.error('An error occurred', err));
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>{movie.release_date}</Text>
      <Text style={styles.text}>{movie.overview}</Text>
      <Text style={styles.text}>Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}</Text>
      <Text style={styles.text}>Homepage: {movieDetails.homepage}</Text>
      {movieDetails.videos.results.length > 0 && <Button title="Play Video" onPress={playVideo} />}
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
