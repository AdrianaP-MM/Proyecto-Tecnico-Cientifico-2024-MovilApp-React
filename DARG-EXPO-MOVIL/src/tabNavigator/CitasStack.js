import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Citas from '../screens/Citas'; // Importa la pantalla Citas desde su ruta
import AgregarCita from '../screens/AgregarCita'; // Importa la pantalla AgregarCita desde su ruta
import CustomBackButton from './CustomBackButton'; // Importa el componente CustomBackButton desde su ruta

const Stack = createStackNavigator(); // Crea un nuevo StackNavigator

const CitasStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Citas" component={Citas} options={{ headerShown: false }} />
            <Stack.Screen name="AgregarCita" component={AgregarCita} options={{
                headerShown: true, headerBackImage: () => <CustomBackButton />,  // Componente personalizado para el botón de retroceso
                headerStyle: {
                    backgroundColor: '#E5383B', // Color de fondo del header
                },
                headerTintColor: 'white',
                title: 'Agregar cita'
            }} />
            <Stack.Screen name="Detalles de la cita" component={AgregarCita} options={{
                headerShown: true, headerBackImage: () => <CustomBackButton />,  // Componente personalizado para el botón de retroceso
                headerStyle: {
                    backgroundColor: '#E5383B', // Color de fondo del header
                },
                headerTintColor: 'white',
            }} />
        </Stack.Navigator>
    );
}

export default CitasStack; // Exporta el componente CitasStack para su uso en la aplicación
