import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState('0');
  const [number2, setNumber2] = useState('0');
  const [result, setResult] = useState('0');

  const buttonPressed = (e, calc) => {
    if (calc === '+') setResult(parseInt(number1) + parseInt(number2) + "");
    else if (calc === '-') setResult(parseInt(number1) - parseInt(number2) + "");
    else if (calc === '/') setResult(parseInt(number1) / parseInt(number2) + "");
    else if (calc === '*') setResult(parseInt(number1) * parseInt(number2) + "");
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.calculator}>Calculator</Text>
      <View style={styles.inputFieldContainer}>
        <Text style={styles.text}>Number 1:</Text>
        <TextInput
          value={number1}
          onChangeText={text => setNumber1(text)}
          style={styles.textInput}
          keyboardType={'numeric'}
        />
      </View>
      <View style={styles.inputFieldContainer}>
        <Text style={styles.text}>Number 2:</Text>
        <TextInput
          value={number2}
          onChangeText={text => setNumber2(text)}
          style={styles.textInput}
          keyboardType={'numeric'}
        />
      </View>
      <View style={styles.buttonRow}>
        <Button title="  +  " onPress={(e) => buttonPressed(e, '+')} />
        <Button title="  -  " onPress={(e) => buttonPressed(e, '-')} />
        <Button title="  *  " onPress={(e) => buttonPressed(e, '*')} />
        <Button title="  /  " onPress={(e) => buttonPressed(e, '/')} />
      </View>
      <View style={styles.inputFieldContainer}>
        <Text style={styles.text}>Result:</Text>
        <TextInput
          placeholder="0"
          value={result}
          style={styles.textInput}
          editable={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  calculator: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '25%',
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
});
