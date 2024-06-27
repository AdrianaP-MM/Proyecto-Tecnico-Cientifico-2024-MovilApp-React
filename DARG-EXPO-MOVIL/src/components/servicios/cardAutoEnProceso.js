import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
//Se importa una imagen dentro del proyecto como ejemplo
import fixedImage from '../../images/carros/imagenAuto.png';
import Text from '../utilidades/text';
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
                <Text texto='Marca:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${marca}`} />
                <Text texto='Modelo:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${modelo}`} />
                <Text texto='Tipo de vehiculo:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${tipoVehiculo}`} />
                <Text texto='Placa:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${placa}`} />
                <Text texto='Fecha de registro:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${fechaDeRegistro}`} />
                </ScrollView>
            </View>
        </View>
    );
};

//Hoja de estilos para la card de autos en proceso
const styles = StyleSheet.create({
    horizontalCard: {
        flexDirection: 'row', /*Direccion de la card en horizontal*/
        width: '95%', /*Ancho de la card con respecto al contenedor en el que se encuentra*/
        borderRadius: 10, /*Borde de la card redondeado*/
        marginBottom: 16, /*Separacion inferior entre cards*/
        backgroundColor: '#fff', /*Color de fondo de la card*/
        shadowColor: '#000', /*Color de la sombra de la card*/
        shadowOffset: { width: 0, height: 2 }, /*Orientacion de la sombra*/
        shadowOpacity: 0.8, /*Opacidad de la sombra*/
        shadowRadius: 4, /*Borde redondeado para la sombra*/
        elevation: 5, /*Elevacion de la card para la silueta de sombra*/
        alignItems: 'center',  /*Elementos de la card alineados al centro*/
        padding: 10, /*Separacion interior de los elementos de la card con respecto al borde*/
    },
    imageContainer: {
        marginRight: 0, /*Margen derecho del contendor de la imagen*/
    },
    cardImage: {
        width: 160, /*Ancho de la imagen de la card*/
        height: 170, /*Alto de la imagen de la card*/
        resizeMode: 'cover', /*Forma de contener la imagen*/
        borderRadius: 10, /*Borde redondeado de la imagen*/
    },
    verticalLine: {
        width: 1, /*Ancho de la linea vertical*/
        backgroundColor: '#000', /*Fondo de la linea vertical*/
        height: '100%', /*Alto de la linea vertical*/
        marginHorizontal: 10, /*Separacion izquierdo y derecho de la linea horizontal*/
    },
    cardContentContainer: {
        flex: 1, /*Propiedad flex*/
        maxHeight: 170, /*Alto maximo que se puede extender el contenedor de informacion de la card*/
    },
    cardTitle: {
        fontSize: 13, /*Tamaño de fuente*/
        marginBottom: 5, /*Separacion del titulo de la card*/
        fontWeight: 'bold', /*Tipo de fuente negrita*/
    },
    cardInfo: {
        fontSize: 12, /*Tamaño de fuente*/
        marginBottom: 5, /*Separacion inferior*/
        fontWeight: 'bold', /*Tipo de fuente negrita*/
    },
    cardText: {
        fontSize: 12, /*Tamaño de fuente*/
        marginBottom: 15, /*Separacion inferior*/
    },
});

export default AutoEnProceso;
