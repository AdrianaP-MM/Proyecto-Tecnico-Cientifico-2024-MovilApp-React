import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../utilidades/Text'; // Importa el componente de texto personalizado

export default function Button({ textoBoton, accionBoton, fontSize = 15, width = 180, height = 55, marginTop = 0, marginBottom = 0, isValidCorreo = true }) {
    // Define el estilo dinámico del botón basado en las propiedades recibidas
    const buttonStyle = {
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
    };

    return (
        // Componente de botón que devuelve un TouchableOpacity con el texto personalizado
        <TouchableOpacity
            style={[isValidCorreo ? styles.button : styles.buttonDisabled, buttonStyle]}
            onPress={accionBoton}
            disabled={!isValidCorreo}
        >
            <Text
                texto={textoBoton} // Propiedad para el texto del botón
                fontSize={fontSize} // Propiedad opcional para el tamaño de fuente, por defecto 15
                color='white' // Color del texto, fijo en blanco
                font='PoppinsMedium' // Fuente del texto, fijo en PoppinsMedium
            />
        </TouchableOpacity>
    );
}

// Estilos del componente Button utilizando StyleSheet.create
const styles = StyleSheet.create({
    button: {
        alignItems: 'center', // Centra el contenido horizontalmente
        justifyContent: 'center', // Centra el contenido verticalmente
        backgroundColor: '#BA181B', // Color de fondo del botón cuando está activo
        borderRadius: 10, // Borde redondeado del botón
    },
    buttonDisabled: {
        alignItems: 'center', // Centra el contenido horizontalmente
        justifyContent: 'center', // Centra el contenido verticalmente
        backgroundColor: '#CED4DA', // Color de fondo del botón cuando está desactivado
        borderRadius: 10, // Borde redondeado del botón
    },
});

