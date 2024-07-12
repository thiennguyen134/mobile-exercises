import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import MovieListItem from './MovieListItem';
import { getNowPlayingMovies } from './api';

const MovieListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNowPlayingMovies().then((movies) => setMovies(movies));
  }, []);

  const itemPressed = (index) => {
    navigation.navigate('MovieDetails', { movie: movies[index] });
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {movies.map((movie, index) => (
          <TouchableOpacity key={index} onPress={() => itemPressed(index)} underlayColor="lightgray">
            <MovieListItem movie={movie} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieListScreen;
