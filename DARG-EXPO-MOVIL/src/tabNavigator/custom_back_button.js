// CustomBackButton.js
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Componente para un botón personalizado de retroceso
export default function CustomBackButton() {
    const navigation = useNavigation(); // Obtiene el objeto de navegación

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}> {/* Al presionar el boton se regresara a la pantalla anterior */}
            <Image
                source={require('../images/icons/btnBack.png')} // Ruta a la imagen del boton
                style={{ width: 35, height: 27 }} // Estilo para el tamaño de la imagen
            />
        </TouchableOpacity>
    );
}
