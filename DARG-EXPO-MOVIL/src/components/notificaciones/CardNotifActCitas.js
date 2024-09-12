import React from 'react';
import Text from '../utilidades/Text'; // Importa el componente de texto personalizado
import { StyleSheet, View, TouchableOpacity } from 'react-native'; // Importa los estilos y componentes necesarios de React Native

export default function CardActuEstadoCita({ title, vehicle, date, onPress }) {
    // Componente de tarjeta de notificación de actualizacion de estado cita
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.contenedorTotalCard}>
                <View style={styles.cardHeader}>
                    <Text texto='¡Tu cita ha sido actualizada!' font='PoppinsLightItalic' fontSize={15} color='white' />  
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.row}>
                        <Text texto={title} fontSize={11} font='PoppinsRegular' /> 
                        <Text texto={"Auto: " + vehicle} font='PoppinsRegular' color='blue' /> 
                    </View>
                    <View style={styles.cardFooter}>
                        <Text texto={`Cita el: ${date} `} font='PoppinsSemiBold' color='#E5383B' fontSize={10} />  
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// Estilos del componente CardNoti utilizando StyleSheet.create
const styles = StyleSheet.create({
    contenedorTotalCard: {
        width: '95%', // Ancho total del contenedor de la tarjeta
        backgroundColor: 'white', // Color de fondo blanco
        alignItems: 'flex-start', // Alinea los elementos a la izquierda
        justifyContent: 'flex-start', // Alinea los elementos arriba
        borderRadius: 20, // Borde redondeado
        borderBottomLeftRadius: 0, // Borde redondeado específico
        paddingBottom: 5, // Relleno inferior
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.25, // Opacidad de la sombra
        shadowRadius: 3.84, // Radio de la sombra
        elevation: 5, // Elevación para Android
        marginBottom: 20, // Margen inferior
    },
    cardHeader: {
        backgroundColor: '#E5383B', // Color de fondo del encabezado de la tarjeta
        width: '75%', // Ancho del encabezado de la tarjeta
        height: 32, // Altura del encabezado de la tarjeta
        borderTopRightRadius: 15, // Borde redondeado superior derecho
        borderBottomRightRadius: 15, // Borde redondeado inferior derecho
        justifyContent: 'center', // Alinea el contenido verticalmente al centro
        alignItems: 'flex-start', // Alinea el contenido horizontalmente a la izquierda
        paddingLeft: 15, // Relleno izquierdo
    },
    cardBody: {
        backgroundColor: 'white', // Color de fondo del cuerpo de la tarjeta
        width: '100%', // Ancho total del cuerpo de la tarjeta
        borderRadius: 20, // Borde redondeado
        paddingHorizontal: 15, // Relleno horizontal
        paddingTop: 20, // Relleno superior
        paddingBottom: 0, // Relleno inferior
    },
    cardFooter: {
        width: '100%', // Ancho total del pie de la tarjeta
        height: 'auto', // Altura automática del pie de la tarjeta
        backgroundColor: 'white', // Color de fondo blanco
        marginTop: 0, // Margen superior
        alignItems: 'flex-end', // Alinea los elementos a la derecha
    },
    row: {
        width: '100%', // Ancho total de la fila
        alignItems: 'flex-start' // Alinea los elementos a la izquierda
    },
});
