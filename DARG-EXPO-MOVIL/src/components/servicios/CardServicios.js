import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
//Import de la navegacion para poder cambiar la pantalla
import { useNavigation } from '@react-navigation/native';
//Import de imagen dentro del proyecto
import fixedImage from '../../images/servicios/serviciosIcon.png';
import Text from '../utilidades/Text';
import Button from '../buttons/ButtonRojo';

//Constante de la card de servicios 
const VerticalCard = ({ title, tipo }) => {
    //Constante para la navegacion para cambiar de pantalla
    const navigation = useNavigation();

    return (
        //Contenedor general para la card
        <View style={styles.verticalCard}>

            <View style={styles.imageContainer} /*Contenedor de la imagen*/ >
                <Image source={fixedImage} style={styles.cardImage} />
            </View>

            <View style={styles.line} /*Linea para dividir el contenido de la card*/ />

            <View style={styles.cardContent} /*Contenedor de la informacion de la card*/ >
                <Text texto='Nombre de servicio:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${title}`} />
                <Text texto='Tipo de servicio:' font='PoppinsSemiBold' fontSize={13} />
                <Text texto={`${tipo}`} />
                <Button textoBoton='Ver vehículos' fontSize={14} width='95%' accionBoton={() => navigation.navigate('AutosEnProceso')}
                    marginTop={15} marginBottom={15} />
            </View>
        </View>
    );
};

//Hoja de estilos de la card de servicios
const styles = StyleSheet.create({
    verticalCard: {
        width: '48%', /*Ancho de la card horizontañ*/
        borderRadius: 10, /*Borde redondeado de la card*/
        marginBottom: 16, /*Separacion inferoior netre cards*/
        backgroundColor: '#fff', /*Fondo de color de la card*/
        shadowColor: '#000', /*Color de la sombra*/
        shadowOffset: { width: 0, height: 2 }, /*Orientacion de la sombra*/
        shadowOpacity: 0.8, /*Opacidad de la sombra*/
        shadowRadius: 4, /*Borde redondeado de la sombra*/
        elevation: 5, /*Dispercion de la sombra*/
        alignItems: 'center', /*Alinear contenido de manera vertical*/
    },
    imageContainer: {
        marginTop: 20, /*Separacion superior de la imagen*/
    },
    cardImage: {
        width: 65, /*Ancho de la imagen de la card*/
        height: 65, /*Alto de la imagen de la card*/
        resizeMode: 'cover', /*Como contener la imagen*/
    },
    line: {
        borderBottomColor: 'black', /*Borde inferior de color*/
        borderBottomWidth: 1, /*Ancho inferior*/
        width: '80%', /*Ancho de la linea*/
        marginTop: 20, /*Separacion superior*/
    },
    cardContent: {
        padding: 16, /*Separacion de contenido del contenedor internamente*/
        alignItems: 'center', /*Alinea los elementos de manera vertical*/
        justifyContent: 'center', /*Alinea los elementros de manera horizontal*/
        width: '100%', /*Ancho del contenido de la card*/
    },
});

export default VerticalCard;
