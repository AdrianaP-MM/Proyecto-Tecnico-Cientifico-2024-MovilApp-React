import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CarrosVista from '../screens/carros';
import AgregarVehiculo from '../screens/agregar_carro';
import InformacionCarro from '../screens/informacion_carro';
import CustomBackButton from './custom_back_button'; // Asegúrate de que esta ruta es correcta

const Stack = createStackNavigator();

const CarrosStack = () => {
  return (
    <Stack.Navigator initialRouteName="CarrosVista">
      <Stack.Screen 
        name="CarrosVista" 
        component={CarrosVista} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AgregarVehiculo" 
        component={AgregarVehiculo} 
        options={{
          headerShown: true, 
          headerBackImage: () => <CustomBackButton />,
          headerStyle: {
            backgroundColor: '#F9FAFB', // Color de fondo del header
          },
          title: 'Agregar vehículo',
        }} 
      />
      <Stack.Screen 
        name="InformacionCarro" 
        component={InformacionCarro} 
        options={{
          headerShown: true, 
          headerBackImage: () => <CustomBackButton />,
          headerStyle: {
            backgroundColor: '#F9FAFB', // Color de fondo del header
          },
          title: 'Información',
        }} 
      />
    </Stack.Navigator>
  );
}

export default CarrosStack;
