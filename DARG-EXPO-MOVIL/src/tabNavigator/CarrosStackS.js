// Importa las dependencias necesarias
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CarrosVista from '../screens/Carros'; // Importa la pantalla CarrosVista
import AgregarVehiculo from '../screens/AgregarCarro'; // Importa la pantalla AgregarVehiculo
import InformacionCarro from '../screens/InfoCarro'; // Importa la pantalla InformacionCarro
import CustomBackButton from './custom_back_button'; // Importa el componente CustomBackButton

// Crea un Stack Navigator
const Stack = createStackNavigator();

// Componente que define la pila de navegación para Carros
const CarrosStack = () => {
  return (
    <Stack.Navigator initialRouteName="CarrosVista">
      
      <Stack.Screen 
        name="CarrosVista" 
        component={CarrosVista} 
        options={{ headerShown: false }} // Oculta el header
      />
      
      <Stack.Screen 
        name="AgregarVehiculo" 
        component={AgregarVehiculo} 
        options={{
          headerShown: true, // Muestra el header
          headerBackImage: () => <CustomBackButton />, // Usa un componente personalizado para el botón de retroceso
          headerStyle: {
            backgroundColor: '#F9FAFB', // Color de fondo del header
          },
          title: 'Agregar vehículo', // Título del header
        }} 
      />
      
      <Stack.Screen 
        name="InformacionCarro" 
        component={InformacionCarro} 
        options={{
          headerShown: true, // Muestra el header
          headerBackImage: () => <CustomBackButton />, // Usa un componente personalizado para el botón de retroceso
          headerStyle: {
            backgroundColor: '#F9FAFB', // Color de fondo del header
          },
          title: 'Información', // Título del header
        }} 
      />
    </Stack.Navigator>
  );
}

// Exporta el componente CarrosStack para su uso en la aplicación
export default CarrosStack;
