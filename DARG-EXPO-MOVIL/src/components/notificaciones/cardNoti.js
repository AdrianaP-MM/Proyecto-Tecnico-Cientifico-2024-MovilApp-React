import React from 'react';
import Text from '../text';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

export default function CardNoti({ accionCard }) {
    return (
        <TouchableOpacity onPress={accionCard}>
            <View style={styles.contenedorTotalCard}>
                <View style={styles.cardHeader}>
                    <Text texto='¡Revisa tu calendario!' font='PoppinsLightItalic' fontSize={15} color='white' />
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.row}>
                        <Text texto='Se acerca tú próximo cambio de aceite para tú vehículo:' fontSize={11} font='PoppinsRegular' />
                        <Text texto='Hyundai Bayon' font='PoppinsRegular' color='blue' />
                    </View>
                    <View style={styles.cardFooter}>
                        <Text texto='Recibido a las: 09:30 am.' font='PoppinsSemiBold' color='#E5383B' fontSize={10} />
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    contenedorTotalCard: {
        width: '95%',
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        paddingBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
    },
    cardHeader: {
        backgroundColor: '#E5383B',
        width: '75%',
        height: 32,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        alignItems: '',
        paddingLeft: 15,
    },
    cardBody: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 0,
    },
    cardFooter: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        marginTop: 0,
        alignItems: 'flex-end',
    },
    row: {
        width: '100%',
        alignItems: 'flex-start'
    },
});
