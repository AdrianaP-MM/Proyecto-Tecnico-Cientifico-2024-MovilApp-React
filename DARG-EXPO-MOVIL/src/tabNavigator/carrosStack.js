import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CarrosVista from '../screens/carros_vista';
import AgregarVehiculo from '../screens/agregar_vehiculo';
import InformacionCarro from '../screens/informacion_carro';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CarrosVista">
        <Stack.Screen name="CarrosVista" component={CarrosVista} options={{ title: 'Mis carros' }} />
        <Stack.Screen name="AgregarVehiculo" component={AgregarVehiculo} options={{ title: 'Agregar vehículo' }} />
        <Stack.Screen name="InformacionCarro" component={InformacionCarro} options={{ title: 'Información' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
