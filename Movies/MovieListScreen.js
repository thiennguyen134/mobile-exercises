import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import MovieListItem from './MovieListItem';

const MovieListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=a5fedf79d71a5958b33d9bf8621587df`)
      .then(response => {
        setMovies(response.data.results);
      });
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
