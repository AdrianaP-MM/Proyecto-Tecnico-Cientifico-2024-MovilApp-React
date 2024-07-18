import React from 'react';
import Text from '../utilidades/text'; // Importa el componente de texto personalizado
import { StyleSheet, TouchableOpacity } from 'react-native'; // Importa los estilos y el componente TouchableOpacity de React Native

export default function ButtonPastilla({ textoBoton, accionBoton, selected }) {
    // Componente de botón tipo pastilla que cambia el estilo según esté seleccionado o no
    return (
        <TouchableOpacity style={[styles.button, selected ? styles.selectedButton : null]} onPress={accionBoton}>
            <Text
                texto={textoBoton} // Propiedad para el texto del botón
                fontSize={14} // Tamaño de fuente fijo en 14
                color={selected ? 'black' : undefined} // Color del texto dependiendo de si está seleccionado
            />
        </TouchableOpacity>
    );
}

// Estilos del componente ButtonPastilla utilizando StyleSheet.create
const styles = StyleSheet.create({
    button: {
        alignItems: 'center', // Centra el contenido horizontalmente
        justifyContent: 'center', // Centra el contenido verticalmente
        height: 'auto', // Altura automática basada en el contenido
        width: '30%', // Ancho del botón fijo al 30% del contenedor
        backgroundColor: '#F9FAFB', // Color de fondo del botón por defecto
        padding: 5, // Relleno interno del botón
        paddingVertical: 7, // Relleno vertical adicional
        //borderRadius: 15,
        //borderBottomWidth: 2,  
        //borderBottomColor: '#E5383B',

        borderColor: '#E4E5EB', // Color del borde por defecto
        borderBottomWidth: 0, // Ancho del borde inferior
        borderWidth: 1, // Ancho del borde general
        borderTopLeftRadius: 10, // Radio de borde superior izquierdo
        borderTopRightRadius: 10, // Radio de borde superior derecho
    },
    selectedButton: {
        borderColor: '#E4E5EB', // Color del borde cuando el botón está seleccionado
        backgroundColor: 'white', // Color de fondo cuando el botón está seleccionado
    },
});
