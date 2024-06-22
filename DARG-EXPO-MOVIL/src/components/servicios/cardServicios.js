import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
//Import de la navegacion para poder cambiar la pantalla
import { useNavigation } from '@react-navigation/native';
//Import de imagen dentro del proyecto
import fixedImage from '../../images/servicios/serviciosIcon.png';
import Text from '../utilidades/text';
import Button from '../buttons/btnRojo';

//Constante de la card de servicios 
const VerticalCard = ({ titulo, tipo }) => {
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
                <Text texto={`${titulo}`} />
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
