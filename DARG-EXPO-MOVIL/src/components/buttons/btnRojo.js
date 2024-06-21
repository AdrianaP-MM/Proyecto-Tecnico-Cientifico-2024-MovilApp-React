import React from 'react';
import Text from '../utilidades/text';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function Button({ textoBoton, accionBoton, fontSize = 15, width = 180, height = 55, marginTop = 0, marginBottom = 0,}) {
    const buttonStyle = {
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom: marginBottom,
    };
    
    return (
        <TouchableOpacity style={[styles.button, buttonStyle,]} onPress={accionBoton}>
            <Text
                texto={textoBoton}
                fontSize={fontSize}
                color='white'
                font='PoppinsMedium'
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BA181B',
        borderRadius: 10,
    },
});
