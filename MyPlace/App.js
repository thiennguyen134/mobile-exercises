import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Header, Input } from 'react-native-elements';
import Dialog from 'react-native-dialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { FloatingAction } from 'react-native-floating-action';

const STORAGE_KEY = '@saved_places';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addActionIcon: {
    width: 24,
    height: 24,
  },
});

const App = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceDescription, setNewPlaceDescription] = useState('');
  const [newPlaceCoords, setNewPlaceCoords] = useState(null);

  useEffect(() => {
    retrieveData();
    getLocation();
  }, []);

  const retrieveData = async () => {
    try {
      const savedPlaces = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedPlaces !== null) {
        setPlaces(JSON.parse(savedPlaces));
      }
    } catch (e) {
      console.error('Error retrieving data: ', e);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(places));
    } catch (e) {
      console.error('Error saving data: ', e);
    }
  };

  const addPlace = () => {
    setDialogVisible(true);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    if (newPlaceName) {
      getCoordinates(newPlaceName);
    }
  }, [newPlaceName]);

  const handleSave = () => {
    if (!newPlaceCoords) {
      Alert.alert('No location selected', 'Please search for a location before saving.');
      return;
    }

    const newPlace = {
      id: places.length + 1,
      name: newPlaceName,
      description: newPlaceDescription,
      latitude: newPlaceCoords.latitude,
      longitude: newPlaceCoords.longitude,
    };

    setPlaces([...places, newPlace]);
    setDialogVisible(false);
    setNewPlaceName('');
    setNewPlaceDescription('');
    setNewPlaceCoords(null);

    saveData();
  };

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setLocation({
        name: data.display_name,
        coords: { latitude, longitude },
        description: '',
      });
    } catch (error) {
      console
      .error(error);
    }
  };

  const handlePlacePress = (place) => {
    setSelectedPlace(place);
  };

  const getCoordinates = async (city) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setNewPlaceCoords({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
      } else {
   //     Alert.alert('Location not found', `No results found for ${city}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const actions = [
    {
      text: 'Add Place',
      icon: (
        <Image
          source={require('./assets/plus.png')}
          resizeMode="contain"
          style={styles.addActionIcon}
        />
      ),
      name: 'add_place',
      position: 1,
    },
  ];
  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          ...location?.coords,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            title={place.name}
            description={place.description}
            onPress={() => handlePlacePress(place)}
          >
            <Callout>
              <View>
                <Text style={styles.calloutTitle}>{place.name}</Text>
                <Text>{place.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        {newPlaceCoords && (
          <Marker
            coordinate={{
              latitude: newPlaceCoords.latitude,
              longitude: newPlaceCoords.longitude,
            }}
            title={newPlaceName}
            pinColor="green"
            onPress={() =>
              setSelectedPlace({ name: newPlaceName, description: newPlaceDescription })
            }
          >
            <Callout>
              <View>
                <Text style={styles.calloutTitle}>{newPlaceName}</Text>
                <Text>{newPlaceDescription}</Text>
              </View>
            </Callout>
          </Marker>
        )}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            pinColor="blue"
          />
        )}
      </MapView>
      <FloatingAction
        actions={actions}
        onPressItem={() => {
          addPlace();
        }}
      />
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Add New Place</Dialog.Title>
        <Dialog.Description>Please enter the details below:</Dialog.Description>
        <Input placeholder="Name" value={newPlaceName} onChangeText={setNewPlaceName} />
        <Input
          placeholder="Description"
          value={newPlaceDescription}
          onChangeText={setNewPlaceDescription}
        />
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Save" onPress={handleSave} />
      </Dialog.Container>
      {selectedPlace && (
        <View style={styles.popupContainer}>
          <Text style={styles.popupTitle}>{selectedPlace.name}</Text>
          <Text>{selectedPlace.description}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
