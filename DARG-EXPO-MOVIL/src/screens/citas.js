import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, SafeAreaView  } from 'react-native';
import Text from '../components/utilidades/text';
import ButtonPastilla from '../components/citas/btnPastilla';
import CardCita from '../components/citas/cardCita';

export default function AppCitas({ navigation }) {
    const [selectedButton, setSelectedButton] = useState('En espera');

    const changeEstado = (button) => {
        setSelectedButton(button);
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
        <SafeAreaView  style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#F9FAFB" />
            <View style={styles.contenedorTitulo}>
                <Text texto='Citas' font='PoppinsMedium' fontSize={25} />
                <TouchableOpacity onPress={() => navigation.navigate('AgregarCita')}>
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
                </ScrollView>
            </View>
        </SafeAreaView >
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