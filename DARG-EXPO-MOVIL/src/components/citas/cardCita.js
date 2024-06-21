import React from 'react';
import Text from '../utilidades/text';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function CardCita({ accionCard }) {
    return (
        <TouchableOpacity onPress={accionCard}>
            <View style={styles.contenedorTotalCard}>
                <View style={styles.cardHeader}>
                    <Image
                        source={require('../../images/carros/carExample.png')}
                        style={styles.image}
                    />
                    <View style={styles.cardHeaderTextContainer}>
                        <View style={styles.rowUpper}>
                            <Text texto='Fecha y hora de llegada:' font='PoppinsLightItalic' fontSize={12} color='white' />
                        </View>
                        <View style={styles.row}>
                            <Text texto='Fecha: ' font='PoppinsSemiBold' fontSize={11} color='white' />
                            <Text texto=' Lunes 22 de Marzo' fontSize={12} color='white' />
                        </View>
                        <View style={styles.row}>
                            <Text texto='hora: ' font='PoppinsSemiBold' fontSize={11} color='white' />
                            <Text texto='3:30pm' fontSize={12} color='white' />
                        </View>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.col}>
                        <View style={styles.colUpper}>
                            <Text texto='Información del carro:' font='PoppinsLightItalic' fontSize={12} color='#2F2F2F' />
                        </View>
                        <View style={styles.row}>
                            <Text texto='Marca: ' font='PoppinsSemiBold' fontSize={11} />
                            <Text texto='Ferrari Electra' fontSize={12} />
                        </View>
                        <View style={styles.row}>
                            <Text texto='Placa: ' font='PoppinsSemiBold' fontSize={11} />
                            <Text texto='123456789' fontSize={12} />
                        </View>
                    </View>
                    <View style={styles.col}>
                        <View style={styles.colUpper}>
                            <Text texto='Detalles de la cita:' font='PoppinsLightItalic' fontSize={12} color='#2F2F2F' />
                        </View>
                        <View>
                            <Text texto='Movilización' font='PoppinsSemiBold' fontSize={11} />
                            <Text texto='Dejaré el automovil' fontSize={12} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contenedorTotalCard: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingVertical: 15,
        borderRadius: 15,
        borderBottomWidth: 2,
        borderColor: '#E4E5EB',
    },
    cardHeader: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#E5383B',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: 5,
    },
    image: {
        borderRadius: 5,
        width: '50%',
        height: 120,
    },
    cardHeaderTextContainer: {
        width: '49%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginLeft: 4,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        padding: 0,
    },
    rowUpper: {
        width: '100%',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
    },
    cardBody: {
        width: '95%',
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'space-between',
        justifyContent: 'space-between',
    },
    col: {
        height: 80,
        width: '50%',
    },
    colUpper: {
        width: '100%',
        marginBottom: 10,
        borderBottomWidth: 1,
        alignItems: '',
        borderBottomColor: '#D9D9D9',
    },
});
