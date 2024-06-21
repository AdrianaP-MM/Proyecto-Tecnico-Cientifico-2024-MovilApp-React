import React from 'react';
import Text from '../utilidades/text';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ButtonPastilla({ textoBoton, accionBoton, selected }) {
    return (
        <TouchableOpacity style={[styles.button, selected ? styles.selectedButton : null]} onPress={accionBoton}>
            <Text
                texto={textoBoton}
                fontSize={14}
                color={selected ? 'black' : undefined}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        width: '30%',
        backgroundColor: '#F9FAFB',
        padding: 5,
        paddingVertical: 7,
        //borderRadius: 15,
        //borderBottomWidth: 2,  
        //borderBottomColor: '#E5383B',

        borderColor: '#E4E5EB',
        borderBottomWidth: 0,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    selectedButton: {
        borderColor: '#E4E5EB',
        backgroundColor: 'white',
    },
});
