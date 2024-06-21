import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
//Import de la navegacion para poder cambiar la pantalla
import { useNavigation } from '@react-navigation/native';
//Import de imagen dentro del proyecto
import fixedImage from '../images/serviciosIcon.png'; 

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
                <Text style={styles.cardTitle}>Nombre de servicio:</Text>
                <Text style={styles.cardText}>{titulo}</Text>
                <Text style={styles.cardTitle}>Tipo de servicio:</Text>
                <Text style={styles.cardText}>{tipo}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('AutosEnServicio')} 
                >
                    <Text style={styles.buttonText}>Ver vehiculos</Text>
                </TouchableOpacity>
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
    cardTitle: {
        fontSize: 13,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    cardText: {
        fontSize: 12,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#BA181B',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignSelf: 'center', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
    },
});

export default VerticalCard;
