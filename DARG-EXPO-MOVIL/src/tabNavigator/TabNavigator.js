import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//import PanelPrincipal from '../screens/panel_principal';
import Perfil from '../screens/perfil';
import CarrosStack from './carrosStack';
import Servicios from './serviciosStack';
import CitasStack from './citasStack';
import PanelStack from './panelStack';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Panel Principal"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Asignar iconos a cada pestaña
          if (route.name === 'Panel Principal') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Mi Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Mis Automóviles') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Citas') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'GrupoServicios') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          // Retornar el icono con un fondo sombreado si está enfocado
          return (
            <View style={focused ? styles.iconContainerFocused : styles.iconContainer}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false, // Ocultar el nombre de la pestaña
        tabBarStyle: styles.tabBar,
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

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderTopColor: 'red',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  iconContainerFocused: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'rgb(229,56,59)',
    borderRadius: 10,
  },
});

export default TabNavigator;

