import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Movie = (props) => {
  const { title, theatre, startTime } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.theatre}>{theatre}</Text>
      <Text style={styles.startTime}>{startTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  theatre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  startTime: {
    fontSize: 14,
  },
});

export default Movie;
