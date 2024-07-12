import React, { useState } from 'react';
import { View, TextInput, Button, Platform, Linking, StyleSheet } from 'react-native';

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const launchMap = () => {
    const location = `${latitude},${longitude}`;
    const url = Platform.select({
      ios: `maps:0,0?q=${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Latitude'
        onChangeText={(text) => setLatitude(text)}
        value={latitude}
      />
      <TextInput
        style={styles.input}
        placeholder='Longitude'
        onChangeText={(text) => setLongitude(text)}
        value={longitude}
      />
      <Button title='Launch a Map' onPress={launchMap} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});
