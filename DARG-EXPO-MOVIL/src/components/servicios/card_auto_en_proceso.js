import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
//Se importa una imagen dentro del proyecto como ejemplo
import fixedImage from '../images/imagenAuto.png';

//Constante de la card de autos en proceso con sus parametros requeridos
const AutoEnProceso = ({ marca, modelo, tipoVehiculo, placa, fechaDeRegistro }) => {
    return (
        /*Contenedor principal de card*/
        <View style={styles.horizontalCard}>
            
            <View style={styles.imageContainer} /*Contenedor de la imagen*/>
                <Image source={fixedImage} style={styles.cardImage} />
            </View>

            
            <View style={styles.verticalLine} /*Linea vertical para dividir la imagen de la informacion*/ />

            <View style={styles.cardContentContainer} /*Contenedor de la info de la card*/>
                <ScrollView /*Contenedor con scroll para la informacion*/>
                    <Text style={styles.cardInfo}>Marca: {marca}</Text>
                    <Text style={styles.cardInfo}>Modelo: {modelo}</Text>
                    <Text style={styles.cardInfo}>Tipo de vehiculo: {tipoVehiculo}</Text>
                    <Text style={styles.cardInfo}>Placa: {placa}</Text>
                    <Text style={styles.cardInfo}>Fecha de registro: {fechaDeRegistro}</Text>
                </ScrollView>
            </View>
        </View>
    );
};

//Hoja de estilos para la card de autos en proceso
const styles = StyleSheet.create({
    horizontalCard: {
        flexDirection: 'row', 
        width: '95%',
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
        marginRight: 0, 
    },
    cardImage: {
        width: 160,
        height: 170, 
        resizeMode: 'cover',
        borderRadius: 10,
    },
    verticalLine: {
        width: 1, 
        backgroundColor: '#000', 
        height: '100%',
        marginHorizontal: 10,
    },
    cardContentContainer: {
        flex: 1,
        maxHeight: 170, 
    },
    cardTitle: {
        fontSize: 13,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    cardInfo: {
        fontSize: 12,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 12,
        marginBottom: 15,
    },
});

export default AutoEnProceso;
