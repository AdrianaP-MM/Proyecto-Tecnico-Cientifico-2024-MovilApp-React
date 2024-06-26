import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificacionesSub from '../screens/notificaciones'; // Importa la pantalla NotificacionesSub desde su ruta
import PanelPrincipal from '../screens/panel_principal'; // Importa la pantalla PanelPrincipal desde su ruta
import CustomBackButton from './custom_back_button'; // Importa el componente CustomBackButton desde su ruta

const Stack = createStackNavigator(); // Crea un nuevo StackNavigator

const PanelStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Panel Principal" component={PanelPrincipal} options={{ headerShown: false }} />  {/* Pantalla PanelPrincipal sin mostrar el header */}
            <Stack.Screen name="Notificaciones" component={NotificacionesSub} options={{
                headerShown: true, headerBackImage: () => <CustomBackButton />, // Componente personalizado para el botón de retroceso
                headerStyle: {
                    backgroundColor: '#F9FAFB', // Color de fondo del header
                },
                title: 'Regresar' // Título en el header
            }} />
        </Stack.Navigator>
    );
}

export default PanelStack; // Exporta el componente PanelStack para su uso en la aplicación
