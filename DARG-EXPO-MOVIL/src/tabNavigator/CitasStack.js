import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AgregarCita from '../screens/AgregarCita'; // Asegúrate de que la ruta sea correcta
import CustomBackButton from './CustomBackButton'; // Importa el componente CustomBackButton desde su ruta
import Citas from '../screens/Citas'; // Importa la pantalla Citas desde su ruta

const Stack = createStackNavigator(); // Crea un nuevo StackNavigator

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

const CitasStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Citas" component={Citas} options={{ headerShown: false }} />
            <Stack.Screen
                name="AgregarCita"
                component={AgregarCita}
                options={{
                    headerShown: true,
                    headerBackImage: () => <CustomBackButton />,  // Componente personalizado para el botón de retroceso
                    header: (props) => <CustomHeaderWithBackground title="Agendar cita" />
                }}
            />
            <Stack.Screen
                name="Detalles de la cita"
                component={AgregarCita}
                options={{
                    headerShown: true,
                    headerBackImage: () => <CustomBackButton />,  // Componente personalizado para el botón de retroceso
                    header: (props) => <CustomHeaderWithBackground title="Detalles de la cita" />
                }}
            />
        </Stack.Navigator>
    );
}

export default CitasStack; // Exporta el componente CitasStack para su uso en la aplicación

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
