import * as React from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens files.
import FormScreen from './screens/FormScreen';
import IndexScreen from './screens/IndexScreen';
import DetailsScreen from './screens/DetailsScreen';

// Import constants.js
import * as constant from './controllers/constants'

// Declaration of the navigator stack.
const Stack = createStackNavigator();

const adjustedTheme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: '#E37399'
  // },
};

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions = {{
          headerStyle: {
            backgroundColor: constant.backgroundColor,
          },
          headerTintColor: constant.headerTintColor,
        }}
      >
      <Stack.Screen 
        name = "IndexScreen" 
        component = {IndexScreen} 
        options = {{ title: 'Contacts (Index)' }}
      />
      <Stack.Screen 
        name = "FormScreen" 
        component = {FormScreen} 
        options = {{ title: 'Add Contact (Form)' }}
      />
      <Stack.Screen 
       name = "DetailsScreen" 
       component = {DetailsScreen} 
       options = {{ title: 'Update Contact Info (Details)' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme = {adjustedTheme}>
      <MyStack />
    </NavigationContainer>
  );
}