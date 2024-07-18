import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GrupoServicios from '../screens/GrupoServicios';
import Servicios from '../screens/ServiciosDisponibles';
import AutosEnProceso from '../screens/CarrosEnServicio';

const Stack = createStackNavigator();

const ServiciosStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GrupoServicios" component={GrupoServicios} options={{ headerShown: false }} />
            <Stack.Screen name="Servicios" component={Servicios} options={{ headerShown: false }} />
            <Stack.Screen name="AutosEnProceso" component={AutosEnProceso} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default ServiciosStack;
