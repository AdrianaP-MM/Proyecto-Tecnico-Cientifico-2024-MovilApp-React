import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Importar desde @react-navigation/native

const OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions(); // Obtener las dimensiones de la ventana
    const navigation = useNavigation(); // Usar useNavigation para la navegación

    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { resizeMode: 'contain' }]}/>

            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <TouchableRipple
                    onPress={() => navigation.navigate('Login')} // Navegar a la pantalla de inicio de sesión al presionar
                    rippleColor="rgba(128, 128, 128, .32)" // Color del efecto ripple
                    style={styles.touchableRipple}
                >
                    <Text style={styles.textoitem}>Saltar</Text>
                </TouchableRipple>
            </View>
        </View>
    );
};

// Estilos definidos con StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1, // El contenedor ocupa todo el espacio disponible
        alignItems: 'center', // Alinear el contenido al centro horizontalmente
        justifyContent: 'center', // Alinear el contenido al centro verticalmente
        backgroundColor: '#FFE0E1', // Color de fondo del contenedor
        padding: 20, // Padding alrededor del contenedor
    },
    image: {
        height: 300, // Altura de la imagen
        width: 300, // Ancho de la imagen
        marginBottom: 30, // Margen inferior para separar la imagen del texto
    },
    title: {
        padding: 10, // Padding alrededor del texto del título
        fontWeight: '800', // Grosor del texto
        fontSize: 28, // Tamaño de la fuente
        color: '#000', // Color del texto
        textAlign: 'center', // Alinear el texto al centro
    },
    description: {
        fontWeight: '400', // Grosor del texto
        fontSize: 15, // Tamaño de la fuente
        color: '#000', // Color del texto
        textAlign: 'center', // Alinear el texto al centro
        marginTop: 10, // Margen superior para separar el título de la descripción
        paddingHorizontal: 60, // Padding horizontal para darle espacio al texto dentro del contenedor
    },
    touchableRipple: {
        marginTop: 20, // Margen superior para separar la descripción del botón
        marginBottom: 10, // Margen inferior para darle espacio al botón
        alignItems: 'center', // Alinear el botón al centro horizontalmente
    },
    textoitem: {
        color: '#A7A7A7', // Color del texto dentro del botón
        fontWeight: '500', // Grosor del texto
        fontSize: 14, // Tamaño de la fuente
    },
});

export default OnboardingItem;
