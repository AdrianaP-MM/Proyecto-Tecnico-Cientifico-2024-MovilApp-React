import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
//Imagen de ejemplo en archivos del proyecto
import fixedImage from '../../images/servicios/imagenServicio.png';
import Text from '../utilidades/Text';

//Constante de la card de descipcion con los parametros requeridoss
const CardDescripcion = ({ title, descripcion }) => {

    return (
        //Contenedor general de la card
        <View style={styles.horizontalCard}>
            <View style={styles.imageContainer} /*Contenedor de la imagen*/>
                <Image source={fixedImage} style={styles.cardImage} />
            </View>
            <View style={styles.cardContent} /*Contenedor del contenido de la card*/>
                <Text texto='Nombre de servicio: ' font='PoppinsSemiBold' fontSize={15} />
                <Text texto={`${title}`} font='PoppinsMedium'/>
                <Text texto='¿En que consiste?: ' font='PoppinsSemiBold' fontSize={15} />
                <Text texto={`${descripcion}`}/>
            </View>
        </View>
    );
};

//Hoja de estilos de la card de descripcion
const styles = StyleSheet.create({
    horizontalCard: {
        flexDirection: 'row', /*Dispocion horizontal*/
        width: '92%', /*Ancho de la card*/
        borderRadius: 10, /*Borde redondeado de la card*/
        marginBottom: 16, /*Separacion inferior entre cards*/
        backgroundColor: '#fff', /*Fondo de color para la card*/
        shadowColor: '#000', /*Color de la sombra*/
        shadowOffset: { width: 0, height: 2 }, /*Orientacion de la sombra*/
        shadowOpacity: 0.8, /*Opacidad de la sombra*/
        shadowRadius: 4, /*Borde redodndeado de la sombra*/
        elevation: 5, /*Doispersion de la sombra*/
        alignItems: 'center', /*Alineacion horizontal al centro*/
        padding: 10, /*Separacion interior de los elementos de la card con respecto al borde*/
    },
    imageContainer: {
        marginRight: 10, /*Espacio entre la imagen y contenido*/
    },
    cardImage: {
        width: 160, /*Ancho de la imagen*/
        height: 170, /*Alto de la imagen*/
        resizeMode: 'cover', /*Forma de contener la imagen*/
        borderRadius: 10, /*Borde redondeado de la imagen*/
    },
    cardContent: {
        flex: 1, /*Propiedad flex*/
        justifyContent: 'flex-start', /*Aliena el contenido al principio horizontalmente*/
        alignItems: 'flex-start', /*Alinea el contenido al principio verticalmente*/
        height: '100%', /*Alto del contenedor de la inforamcion de la carta*/
    },
    cardTitle: {
        fontSize: 13, /*Tamaño de la fuente*/
        marginBottom: 5, /*Separacion inferior del titulo de la card*/
        fontWeight: 'bold', /*Tipo de fuente*/
    },
    cardText: {
        fontSize: 12, /*Tamaño de la fuente*/
        marginBottom: 15, /*Separacion inferior del texto de la card*/
    },
});

export default CardDescripcion;

