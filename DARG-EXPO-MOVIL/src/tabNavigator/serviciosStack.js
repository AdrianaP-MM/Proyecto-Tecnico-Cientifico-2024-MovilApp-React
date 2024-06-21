import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GrupoServicios from '../screens/grupo_servicios';
import Servicios from '../screens/servicios_disponibles';
import AutosEnProceso from '../screens/autos_en_servicio';

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
