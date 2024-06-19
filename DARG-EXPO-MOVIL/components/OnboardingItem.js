import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const OnboardingItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { resizeMode: 'contain' }]}/>

            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <TouchableRipple
                    onPress={() => console.log('Pressed')}
                    rippleColor="rgba(128, 128, 128, .32)"
                    style={styles.touchableRipple} // Define estilos para el TouchableRipple si es necesario
                >
                    <Text style={styles.textoitem}>Saltar</Text>
                </TouchableRipple>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFE0E1', // Establecer el color de fondo
        padding: 20, // Agregar padding para asegurarse de que hay suficiente espacio
    },
    image: {
        height: 300, // Ajustar la altura de la imagen
        width: 300, // Ajustar el ancho de la imagen
        marginBottom: 30, // Agregar margen para el espacio
    },
    title: {
        padding: 10,
        fontWeight: '800',
        fontSize: 28,
        color: '#000',
        textAlign: 'center',
    },
    description: {
        fontWeight: '400',
        fontSize: 15,
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 60,
    },
    touchableRipple: {
        marginTop: 20, 
        marginBottom: 10,
        alignItems: 'center',
    },
    textoitem: {
        color: '#A7A7A7',
        fontWeight: '500',
        fontSize: 14,
    },
});

export default OnboardingItem;
