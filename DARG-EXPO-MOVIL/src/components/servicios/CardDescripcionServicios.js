import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import fixedImage from '../../images/servicios/imagenServicio.png';
import Text from '../utilidades/Text';

const CardDescripcion = ({ servicioData = {} }) => {
    // Verifica que los datos están llegando correctamente
    console.log('CardDescripcion props:', servicioData.nombre_servicio, servicioData.descripcion_servicio);

    return (
        <View style={styles.horizontalCard}>
            <View style={styles.imageContainer}>
                <Image source={fixedImage} style={styles.cardImage} />
            </View>
            <View style={styles.cardContent}>
                <Text texto='Nombre de servicio: ' font='PoppinsSemiBold' fontSize={15} />
                <Text texto={`${servicioData.nombre_servicio}`} font='PoppinsMedium'/>
                <Text texto='¿En qué consiste?: ' font='PoppinsSemiBold' fontSize={15} />
                <Text texto={`${servicioData.descripcion_servicio}`}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    horizontalCard: {
        flexDirection: 'row',
        width: '92%',
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        padding: 10,
    },
    imageContainer: {
        marginRight: 10,
    },
    cardImage: {
        width: 160,
        height: 170,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: '100%',
    },
});

export default CardDescripcion;
