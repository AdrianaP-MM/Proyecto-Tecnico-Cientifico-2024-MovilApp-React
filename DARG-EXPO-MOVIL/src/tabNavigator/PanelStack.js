import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NotificacionesSub from '../screens/Notificaciones'; // Importa la pantalla NotificacionesSub desde su ruta
import PanelPrincipal from '../screens/PanelPrincipal_V2'; // Importa la pantalla PanelPrincipal desde su ruta
import CustomBackButton from './CustomBackButton'; // Importa el componente CustomBackButton desde su ruta
import { ImageBackground, View, Text, StyleSheet } from 'react-native';

const Stack = createStackNavigator(); // Crea un nuevo StackNavigator

const PanelStack = () => {

    const CustomHeaderWithBackground = ({ title }) => (
        <ImageBackground
            source={require('../images/panelPrincipal/backImage.png')} // Reemplaza con la ruta a tu imagen
            style={styles.headerBackground}
        >
            <View style={styles.headerContent}>
                <CustomBackButton />
                <Text style={styles.headerTitle}>{title}</Text>
            </View>
        </ImageBackground>
    );

    return (
        <Stack.Navigator>
            <Stack.Screen name="Panel Principal" component={PanelPrincipal} options={{ headerShown: false }} />
            <Stack.Screen name="Notificaciones" component={NotificacionesSub}
                options={{
                    headerShown: true,
                    headerBackImage: () => <CustomBackButton />,  // Componente personalizado para el botón de retroceso
                    header: (props) => <CustomHeaderWithBackground title="Regresar" />
                }} />
        </Stack.Navigator>
    );
}

export default PanelStack; // Exporta el componente PanelStack para su uso en la aplicación


const styles = StyleSheet.create({
    headerBackground: {
        width: '100%',
        height: 95,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        padding: 20,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 15,
    },
});
