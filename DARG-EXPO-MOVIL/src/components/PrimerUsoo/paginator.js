import React from 'react';
import { View, useWindowDimensions, StyleSheet, Animated } from 'react-native';

const Paginator = ({ data, scrollX }) => {
    const { width } = useWindowDimensions(); // Obtener las dimensiones de la ventana

    if (!data || !Array.isArray(data) || data.length === 0) { // Comprobar si data es indefinido, no es un array o está vacío
        return null; // Manejar casos donde data no está definido o es un array vacío
    }
    
    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {data.map((_, i) => { // Iterar sobre el array data para crear los puntos de paginación
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]; // Rango de entrada para la interpolación

                const dotWidth = scrollX.interpolate({ // Interpolación para el ancho de los puntos
                    inputRange,
                    outputRange: [10, 20, 10], // Valores de salida para el ancho de los puntos
                    extrapolate: 'clamp', // Extrapolar para mantener los valores dentro del rango
                });

                const opacity = scrollX.interpolate({ // Interpolación para la opacidad de los puntos
                    inputRange,
                    outputRange: [0.3, 1, 0.3], // Valores de salida para la opacidad de los puntos
                    extrapolate: 'clamp', // Extrapolar para mantener los valores dentro del rango
                });

                return (
                    <Animated.View
                        style={[styles.dot, { width: dotWidth, opacity }]} // Estilo dinámico para el punto interpolado
                        key={i.toString()} // Clave única para cada punto
                    />
                );
            })}
        </View>
    );
};

// Estilos definidos con StyleSheet
const styles = StyleSheet.create({
    dot: {
        height: 10, // Altura del punto
        borderRadius: 5, // Radio de borde para hacerlo circular
        backgroundColor: '#717171', // Color de fondo del punto
        marginHorizontal: 8, // Margen horizontal para separar los puntos
    },
});

export default Paginator;
