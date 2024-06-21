// CustomBackButton.js
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CustomBackButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={require('../images/icons/btnBack.png')} // Ruta a tu imagen personalizada
                style={{ width: 35, height: 27 }} // Ajusta el tamaño según tus necesidades
            />
        </TouchableOpacity>
    );
}
