import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../components/utilidades/text';
import ButtonPastilla from '../components/citas/btnPastilla';
import CardCita from '../components/citas/cardCita';

import { useNavigation } from '@react-navigation/native';

export default function AppCitas() {
    const navigation = useNavigation();
    const [selectedButton, setSelectedButton] = useState('En espera');

    const changeEstado = (button) => {
        setSelectedButton(button);
    };

    // Función para manejar la navegación a Pantalla2
    const navigateToPantalla2 = () => {
        navigation.navigate('Agendar');
    };
    // Función para manejar la navegación a Pantalla3
    const navigateToPantalla3 = () => {
        navigation.navigate('Pantalla3');
    };

    // Función para manejar la navegación a Pantalla4
    const navigateToPantalla4 = () => {
        navigation.navigate('Pantalla4');
    };

    const verDetalles = () => {
        navigation.navigate('Detalles de la cita', {
            fecha: '22/03/2024',
            hora: '3:30pm',
            auto: 'Ferrari Electra',
            movilizacion: 'Dejaré el automovil',
            zona: 'San Salvador',
            ida: 'De mi casa al taller',
            regreso: 'Del taller, A mi casa',
        });
    };
    return (
        <View style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#ffffff" />
            <View style={styles.contenedorTitulo}>
                <Text texto='Citas' font='PoppinsMedium' fontSize={25} />
                <TouchableOpacity onPress={navigateToPantalla2}>
                    <Image
                        source={require('../images/icons/iconAdd.png')} // Ruta de tu imagen
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.contenedorCuerpo}>
                <View style={styles.contenedorOpciones}>
                    <ButtonPastilla
                        textoBoton='En espera'
                        accionBoton={() => changeEstado('En espera')}
                        selected={selectedButton === 'En espera'}
                    />
                    <ButtonPastilla
                        textoBoton='Aceptadas'
                        accionBoton={() => changeEstado('Aceptadas')}
                        selected={selectedButton === 'Aceptadas'}
                    />
                    <ButtonPastilla
                        textoBoton='Finalizadas'
                        accionBoton={() => changeEstado('Finalizadas')}
                        selected={selectedButton === 'Finalizadas'}
                    />
                </View>
                <ScrollView style={styles.scrollCitas}>
                    {<CardCita accionCard={verDetalles} />}
                    <TouchableOpacity onPress={navigateToPantalla3}>
                        <Text texto=' Ir a Notificaciones' font='PoppinsRegular' fontSize={15} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToPantalla4}>
                        <Text texto=' Ir a Restablecer contraseña' font='PoppinsRegular' fontSize={15} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 20,
        paddingTop: 20,
        padding: 0,
    },
    contenedorTitulo: {
        width: '100%',
        backgroundColor: '',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 20,
        paddingHorizontal: 15,
    },
    image: {
        marginLeft: 10,
        width: 40,
        height: 40,
    },
    contenedorCuerpo: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    contenedorOpciones: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#F9FAFB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        borderBottomWidth: 0,
        borderColor: '#E4E5EB',
    },
    scrollCitas: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        paddingTop: 10,
    },
});