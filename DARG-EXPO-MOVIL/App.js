import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyCarsScreen from './screens/MyCarsScreen';
import AddCarScreen from './screens/AddCarScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyCars">
        <Stack.Screen name="MyCars" component={MyCarsScreen} options={{ title: 'Mis carros' }} />
        <Stack.Screen name="AddCar" component={AddCarScreen} options={{ title: 'Agregar vehiculo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
