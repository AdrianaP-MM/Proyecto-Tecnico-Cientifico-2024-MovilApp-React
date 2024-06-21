import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Input from '../components/inputs/allBorder';
import Button from '../components/buttons/btnRojo';

export default function AppAddCita({ route }) {
    const { fecha, hora, auto, movilizacion, zona, ida, regreso } = route.params || {};
    return (
        <SafeAreaView style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#F9FAFB" />
            <View style={styles.contenedorForm}>
                <Input
                    placeholder='Fecha de llegada'
                    value={fecha}
                />
                <Input
                    placeholder='Hora de llegada'
                    value={hora}
                />
                <Input
                    placeholder='Automóvil'
                    value={auto}
                />
                <Input
                    placeholder='Movilizacion del vehiculo'
                    value={movilizacion}
                />
                <Input
                    placeholder='Zona habilitada'
                    value={zona}
                />
                <Input
                    placeholder='Dirección ida'
                    value={ida}
                />
                <Input
                    placeholder='Dirección regreso'
                    value={regreso}
                />
            </View>
            <View style={styles.contenedorBtn} >
                <Button textoBoton='Aceptar' />
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingBottom: 85,
    },
    contenedorForm: {
        height: 'auto',
        width: '100%',
        padding: 20,
    },
    contenedorBtn: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
