import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//import PanelPrincipal from '../screens/PanelPrincipal'; // Importación comentada, no utilizada actualmente
import Perfil from '../screens/EditarPerfil';  // Importación de la pantalla de perfil
import CarrosStack from './CarrosStack'; // Importación de la navegación en stack para Carros
import Servicios from './ServiciosStack'; // Importación de la navegación en stack para Servicios
import CitasStack from './CitasStack'; // Importación de la navegación en stack para Citas
import PanelStack from './PanelStack'; // Importación de la navegación en stack para Panel Principal

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Panel Principal" // Establece la pantalla inicial
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Asignar iconos a cada pestaña basado en la ruta
          if (route.name === 'Panel Principal') { 
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mi Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'CarrosVista') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Citas') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'GrupoServicios') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

           // Retornar el icono con un contenedor que cambia de estilo si está enfocado
          return (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'white', // Color del ícono activo
        tabBarInactiveTintColor: 'black', // Color del ícono inactivo
        tabBarShowLabel: false, // Ocultar etiquetas de texto de las pestañas
        tabBarStyle: styles.tabBar, // Estilos personalizados para la barra de pestañas
      })}
    >
      <Tab.Screen name="CarrosVista" component={CarrosStack} options={{ headerShown: false }} />
      <Tab.Screen name="Mi Perfil" component={Perfil} options={{ headerShown: false }} />
      <Tab.Screen name="Panel Principal" component={PanelStack}
        options={{ headerShown: false }} />
        <Tab.Screen name="Citas" component={CitasStack} options={{ headerShown: false }} />
      <Tab.Screen name="GrupoServicios" component={Servicios} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

//Estilos aplicados a la pantalla de pestañas
const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute', // Posicionamiento absoluto en la parte inferior
    left: 0,
    right: 0,
    bottom: 0,
    height: 80, // Altura de la barra de pestañas
    backgroundColor: 'white', // Color de fondo de la barra de pestañas
    borderTopWidth: 2, // Grosor del borde superior
    borderTopColor: 'red', // Color del borde superior
    borderTopLeftRadius: 50, // Radio de esquina superior izquierda
    borderTopRightRadius: 50, // Radio de esquina superior derecha
    borderBottomLeftRadius: 0, // Radio de esquina inferior izquierda
    borderBottomRightRadius: 0, // Radio de esquina inferior derecha
    overflow: 'hidden', // Ocultar desbordamiento de contenido
  },
  iconContainer: {
    justifyContent: 'center', // Centrado verticalmente
    alignItems: 'center', // Centrado horizontalmente
    width: 50, // Ancho del contenedor de icono
    height: 50, // Altura del contenedor de icono
  },
  iconContainerFocused: {
    justifyContent: 'center', // Centrado verticalmente
    alignItems: 'center', // Centrado horizontalmente
    width: 50, // Ancho del contenedor de icono
    height: 50, // Altura del contenedor de icono
    backgroundColor: 'rgb(229,56,59)', // Color de fondo cuando la pestaña está enfocada
    borderRadius: 10, // Radio de borde para resaltar el contenedor
  },
});

export default TabNavigator; // Exportar el componente de navegación de pestañas
