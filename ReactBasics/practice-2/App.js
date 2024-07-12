import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import Constants from 'expo-constants';
export default function App() {
  // count state-variable
  const [numbers, setNumbers] = useState([]);

  // call hook to set a new array to numbers
  // ...numbers is all the numbers before and add a new random one
  const addNumber = () => {
    setNumbers([...numbers, Math.random()]);
  }

  // use map to loop through numbers
  // generate Text element to show number
  // call addNumber function when button is pressed
  return (
    <View style={styles.container}>
      <Button title="Randomize" onPress={addNumber}/>
      <ScrollView>
        {
          numbers.map( (item,index) => (
            <Text key={index}>{item}</Text>
          ))
        }
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});