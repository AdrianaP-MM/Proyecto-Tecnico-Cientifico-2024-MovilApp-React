import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Importa componentes necesarios de React Native
import { useNavigation } from '@react-navigation/native'; // Hook para navegación
import fixedImage from '../../images/servicios/serviciosIcon.png'; // Importa la imagen fija para la tarjeta
import Text from '../utilidades/Text'; // Importa el componente de texto personalizado
import Button from '../buttons/ButtonRojo'; // Importa el componente de botón personalizado

// Componente para una tarjeta vertical de servicios
const VerticalCard = ({ title, tipo, idServiciosDisponibles }) => {
    const navigation = useNavigation(); // Hook para navegación

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
                    textoBoton='Ver vehículos' // Texto del botón
                    fontSize={14} // Tamaño de fuente del texto del botón
                    width='95%' // Ancho del botón
                    accionBoton={() => navigation.navigate('AutosEnProceso', { idServiciosDisponibles })} // Acción al presionar el botón
                    marginTop={15} // Margen superior del botón
                    marginBottom={15} // Margen inferior del botón
                />
            </View>
        </View>
    );
};

// Hoja de estilos para el componente
const styles = StyleSheet.create({
    verticalCard: {
        width: '48%', // Ancho de la tarjeta (48% del ancho del contenedor padre)
        borderRadius: 10, // Radio de los bordes redondeados
        marginBottom: 16, // Margen inferior de la tarjeta
        backgroundColor: '#fff', // Color de fondo de la tarjeta
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.8, // Opacidad de la sombra
        shadowRadius: 4, // Radio de difuminado de la sombra
        elevation: 5, // Elevación para la sombra en plataformas Android
        alignItems: 'center', // Alinea los elementos hijos al centro horizontalmente
    },
    imageContainer: {
        marginTop: 20, // Margen superior del contenedor de la imagen
    },
    cardImage: {
        width: 65, // Ancho de la imagen
        height: 65, // Alto de la imagen
        resizeMode: 'cover', // Modo de ajuste de la imagen
    },
    line: {
        borderBottomColor: 'black', // Color de la línea separadora
        borderBottomWidth: 1, // Ancho de la línea separadora
        width: '80%', // Ancho de la línea separadora
        marginTop: 20, // Margen superior de la línea separadora
    },
    cardContent: {
        padding: 16, // Espacio interior del contenedor de contenido
        alignItems: 'center', // Alinea los elementos hijos al centro horizontalmente
        justifyContent: 'center', // Alinea los elementos hijos al centro verticalmente
        width: '100%', // Ancho completo del contenedor de contenido
    },
});

export default VerticalCard; // Exporta el componente VerticalCard
