import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text
} from 'react-native';
import { Header, Input, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import useAxios from 'axios-hooks';

const WeatherForecast = (params) => {
  const city = params.city;
  const API_KEY = '27a889dfd839aba134637e5448340536';
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

  const [{ data, loading, error }, refetch] = useAxios(
    URL + city.name + '&appid=' + API_KEY + '&units=metric',
  );

  if (loading)
    return (
      <Card>
        <Card.Title>Loading....</Card.Title>
      </Card>
    );
  if (error)
    return (
      <Card>
        <Card.Title>Error loading weather forecast!</Card.Title>
      </Card>
    );

  return (
    <Card>
      <Card.Title>{city.name}</Card.Title>
      <Card.Divider/>
      <View>
        <Text>Temperature: {data.main.temp}°C</Text>
        <Text>Feels like: {data.main.feels_like}°C</Text>
        <Text>Humidity: {data.main.humidity}%</Text>
        <Text>Description: {data.weather[0].description}</Text>
      </View>
    </Card>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cityName, setCityName] = useState('');
  const [cities, setCities] = useState([]);

  const openDialog = () => {
    setModalVisible(true);
  };

  const addCity = () => {
    setCities([...cities, { id: Math.random(), name: cityName }]);
    setModalVisible(false);
  };

  const cancelCity = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <Header
        centerComponent={{ text: 'Weather App', style: { color: '#fff' } }}
        rightComponent={{ icon: 'add', color: '#fff', onPress: openDialog }}
      />
      <Dialog.Container visible={modalVisible}>
        <Dialog.Title>Add a new city</Dialog.Title>
        <View>
          <Input
            onChangeText={(text) => setCityName(text)}
            placeholder="Type city name here"
          />
        </View>
        <Dialog.Button label="Cancel" onPress={cancelCity} />
        <Dialog.Button label="Add" onPress={addCity} />
      </Dialog.Container>
      <ScrollView>
        {cities.map((city) => (
          <WeatherForecast key={city.id} city={city} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
