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

const App = () => {
  return (
    <View style={styles.container}>
      <Movie
        title="White Shark"
        theatre="Theatres 1"
        startTime="2:00 PM"
      />
      <Movie
        title="The Lion King"
        theatre="Cinemark 2"
        startTime="4:30 PM"
      />
      <Movie
        title="Termination II"
        theatre="Regal 1"
        startTime="7:00 PM"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'left',
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

export default App;
