import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
//Imagen de ejemplo en archivos del proyecto
import fixedImage from '../images/imagenServicio.png'; 

//Constante de la card de descipcion con los parametros requeridoss
const CardDescripcion = ({ titulo, descripcion }) => {

    return (
        //Contenedor general de la card
        <View style={styles.horizontalCard}>
            <View style={styles.imageContainer} /*Contenedor de la imagen*/>
                <Image source={fixedImage} style={styles.cardImage}/>
            </View>
            <View style={styles.cardContent} /*Contenedor del contenido de la card*/>
                <Text style={styles.cardTitle}>Nombre de servicio: {titulo}</Text>
                <Text style={styles.cardText}>¿En que consiste?: {descripcion}</Text>
            </View>
        </View>
    );
};

//Hoja de estilos de la card de descripcion
const styles = StyleSheet.create({
    horizontalCard: {
        flexDirection: 'row', // Disposición horizontal
        width: '92%',
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center', // Alinea el contenido al centro horizontalmente
        padding: 10,
    },
    imageContainer: {
        marginRight: 10, // Espacio entre la imagen y el contenido
    },
    cardImage: {
        width: 160,
        height: 170, // Altura de la imagen
        resizeMode: 'cover',
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'flex-start', // Alinea el contenido al principio verticalmente
        alignItems: 'flex-start', // Alinea el contenido al principio horizontalmente
        height: '100%',
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
});

export default CardDescripcion;

