import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fixedImage from '../../images/servicios/serviciosIcon.png';
import Text from '../utilidades/Text';
import Button from '../buttons/ButtonRojo';

const VerticalCard = ({ title, tipo, idServiciosDisponibles }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.verticalCard}>
            <View style={styles.imageContainer}>
                <Image source={fixedImage} style={styles.cardImage} />
            </View>
            <View style={styles.line} />
            <View style={styles.cardContent}>
                <Text texto='Nombre de servicio:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${title}`} />
                <Text texto='Tipo de servicio:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${tipo}`} />
                <Button
                    textoBoton='Ver vehículos'
                    fontSize={14}
                    width='95%'
                    accionBoton={() => navigation.navigate('AutosEnProceso', { idServiciosDisponibles })}
                    marginTop={15}
                    marginBottom={15}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    verticalCard: {
        width: '48%',
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
    },
    imageContainer: {
        marginTop: 20,
    },
    cardImage: {
        width: 65,
        height: 65,
        resizeMode: 'cover',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '80%',
        marginTop: 20,
    },
    cardContent: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});

export default VerticalCard;
