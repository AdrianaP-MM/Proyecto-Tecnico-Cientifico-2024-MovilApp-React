import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificacionesSub from '../screens/notificaciones';
import PanelPrincipal from '../screens/panel_principal';
import CustomBackButton from './custom_back_button';

const Stack = createStackNavigator();

const PanelStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Panel Principal" component={PanelPrincipal} options={{ headerShown: false }} />
            <Stack.Screen name="Notificaciones" component={NotificacionesSub} options={{
                headerShown: true, headerBackImage: () => <CustomBackButton />,
                headerStyle: {
                    backgroundColor: '#F9FAFB', // Color de fondo del header
                },
                title: 'Regresar'
            }} />
        </Stack.Navigator>
    );
}

export default PanelStack;
