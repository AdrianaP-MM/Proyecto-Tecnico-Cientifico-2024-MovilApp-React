import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Citas from '../screens/citas';
import AgregarCita from '../screens/agregar_cita';
import CustomBackButton from './custom_back_button';

const Stack = createStackNavigator();

const CitasStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Citas" component={Citas} options={{ headerShown: false }} />
            <Stack.Screen name="AgregarCita" component={AgregarCita} options={{
                headerShown: true, headerBackImage: () => <CustomBackButton />,
                headerStyle: {
                    backgroundColor: '#F9FAFB', // Color de fondo del header
                },
            }} />
            <Stack.Screen name="Detalles de la cita" component={AgregarCita} options={{
                headerShown: true, headerBackImage: () => <CustomBackButton />,
                headerStyle: {
                    backgroundColor: '#F9FAFB', // Color de fondo del header
                },
            }} />
        </Stack.Navigator>
    );
}

export default CitasStack;
