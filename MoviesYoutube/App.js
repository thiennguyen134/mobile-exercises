import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

import MovieListScreen from './MovieListScreen';
import MovieDetailScreen from './MovieDetailScreen';
import VideoScreen from './VideoScreen';

LogBox.ignoreLogs(['ViewPropTypes']);

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MoviesList"
          component={MovieListScreen}
          options={{ title: 'MovieList' }}
        />
        <Stack.Screen 
          name="MovieDetails" 
          component={MovieDetailScreen} 
          options={{ title: 'MovieDetails' }}
        />
        <Stack.Screen 
          name="VideoScreen" 
          component={VideoScreen} 
          options={{ title: 'Video' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
