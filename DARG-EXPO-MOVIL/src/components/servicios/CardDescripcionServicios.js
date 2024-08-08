import React from 'react';
import { View, StyleSheet, Image } from 'react-native'; // Importa componentes necesarios de React Native
import fixedImage from '../../images/servicios/imagenServicio.png'; // Importa la imagen fija para la tarjeta
import Text from '../utilidades/Text'; // Importa el componente de texto personalizado

// Componente para mostrar la descripción de un servicio en una tarjeta horizontal
const CardDescripcion = ({ servicioData = {} }) => {
    // Imprime en la consola los datos del servicio para verificar que se reciben correctamente
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

// Hoja de estilos para el componente
const styles = StyleSheet.create({
    horizontalCard: {
        flexDirection: 'row', // Dispone los elementos hijos en una fila horizontal
        width: '92%', // Ancho de la tarjeta (92% del ancho del contenedor padre)
        borderRadius: 10, // Radio de los bordes redondeados
        marginBottom: 16, // Margen inferior de la tarjeta
        backgroundColor: '#fff', // Color de fondo de la tarjeta
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.8, // Opacidad de la sombra
        shadowRadius: 4, // Radio de difuminado de la sombra
        elevation: 5, // Elevación para la sombra en plataformas Android
        alignItems: 'center', // Alinea los elementos hijos al centro horizontalmente
        padding: 10, // Espacio interior de la tarjeta
    },
    imageContainer: {
        marginRight: 10, // Margen derecho del contenedor de la imagen
    },
    cardImage: {
        width: 160, // Ancho de la imagen
        height: 170, // Alto de la imagen
        resizeMode: 'cover', // Modo de ajuste de la imagen
        borderRadius: 10, // Radio de los bordes redondeados de la imagen
    },
    cardContent: {
        flex: 1, // Toma el espacio disponible en la tarjeta
        justifyContent: 'flex-start', // Alinea el contenido al inicio verticalmente
        alignItems: 'flex-start', // Alinea el contenido al inicio horizontalmente
        height: '100%', // Alto completo del contenedor de contenido
    },
});

export default CardDescripcion; // Exporta el componente CardDescripcion