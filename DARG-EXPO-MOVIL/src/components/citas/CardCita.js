import React from 'react';
import Text from '../utilidades/Text'; // Importa el componente de texto personalizado
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'; // Importa los estilos y componentes necesarios de React Native

import Config from '../../utils/Constantes'; // Importa el objeto de configuración desde 'Constantes'

export default function CardCita({ accionCard, citaData, onLongPress }) {
    // Componente de tarjeta de cita que muestra información del automóvil y detalles de la cita
    return (
        <TouchableOpacity onPress={accionCard} onLongPress={onLongPress}>
            <View style={styles.contenedorTotalCard}>
                <View style={styles.numberContainer}>
                    <Text texto={`${citaData.id_cita}`} fontSize={20} color='white' />
                </View>
                <View style={styles.cardHeader}>
                    <Image
                        source={citaData.fotoCarro ?
                            { uri: `${Config.IMAGE_URL}automoviles/${citaData.fotoCarro}` }
                            : require('../../images/carros/carExample2.png')}
                        style={styles.image} // Estilos de la imagen del automóvil
                    />
                    <View style={styles.cardHeaderTextContainer}>
                        <View style={styles.rowUpper}>
                            <Text texto={`Fecha y hora de llegada: (${citaData.anio_cita})`} font='PoppinsLightItalic' fontSize={12} color='white' />
                        </View>
                        <View style={styles.row}>
                            <Text texto='Fecha: ' font='PoppinsSemiBold' fontSize={11} color='white' />
                            <Text texto={`${citaData.fecha_cita}`} fontSize={12} color='white' />
                        </View>
                        <View style={styles.row}>
                            <Text texto='hora: ' font='PoppinsSemiBold' fontSize={11} color='white' />
                            <Text texto={`${citaData.hora_cita}`} fontSize={12} color='white' />
                        </View>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <View style={styles.col}>
                        <View style={styles.colUpper}>
                            <Text texto='Información del carro:' font='PoppinsLightItalic' fontSize={12} color='#2F2F2F' />
                        </View>
                        <View style={styles.row}>
                            <Text texto='Modelo: ' font='PoppinsSemiBold' fontSize={11} />
                            <Text texto={`${citaData.modelo_automovil}`} fontSize={12} />
                        </View>
                        <View style={styles.row}>
                            <Text texto='Placa: ' font='PoppinsSemiBold' fontSize={11} />
                            <Text texto={`${citaData.placa_automovil}`} fontSize={12} />
                        </View>
                    </View>
                    <View style={styles.col}>
                        <View style={styles.colUpper}>
                            <Text texto='Detalles de la cita:' font='PoppinsLightItalic' fontSize={12} color='#2F2F2F' />
                        </View>
                        <View>
                            <Text texto='Movilización' font='PoppinsSemiBold' fontSize={11} />
                            <Text texto={`${citaData.movilizacion_vehiculo}`} fontSize={12} />
                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// Estilos del componente CardCita utilizando StyleSheet.create
const styles = StyleSheet.create({
    contenedorTotalCard: {
        width: '100%', // Ancho total del contenedor de la tarjeta
        backgroundColor: 'white', // Color de fondo blanco
        alignItems: 'center', // Centra el contenido horizontalmente
        justifyContent: 'center', // Centra el contenido verticalmente
        padding: 10, // Relleno interno
        paddingTop: 0, // Relleno superior cero
        borderRadius: 15, // Borde redondeado
        borderBottomWidth: 2, // Ancho del borde inferior
        borderColor: '#E4E5EB', // Color del borde
        marginBottom: 15, // Margen vertical
        marginTop: 12,
        position: 'relative'
    },
    cardHeader: {
        width: '100%', // Ancho total del encabezado de la tarjeta
        flexDirection: 'row', // Diseño en fila para alinear elementos horizontalmente
        backgroundColor: '#E5383B', // Color de fondo del encabezado
        alignItems: 'center', // Centra el contenido horizontalmente
        justifyContent: 'flex-end', // Alinea al final del eje principal
        borderRadius: 5, // Borde redondeado
    },
    image: {
        borderRadius: 5, // Borde redondeado de la imagen
        width: '50%', // Ancho de la imagen al 50% del contenedor
        height: 120, // Altura fija de la imagen
    },
    cardHeaderTextContainer: {
        width: '49%', // Ancho del contenedor del texto
        alignItems: 'flex-start', // Alinea el texto a la izquierda
        justifyContent: 'flex-end', // Alinea al final del eje principal
        marginLeft: 4, // Margen izquierdo
    },
    row: {
        width: '100%', // Ancho total de la fila
        flexDirection: 'row', // Diseño en fila para alinear elementos horizontalmente
        padding: 0, // Relleno interno cero
    },
    rowUpper: {
        width: '100%', // Ancho total de la fila superior
        marginBottom: 10, // Margen inferior
        borderBottomWidth: 1, // Ancho del borde inferior
        borderBottomColor: 'white', // Color del borde inferior
    },
    cardBody: {
        width: '95%', // Ancho del cuerpo de la tarjeta
        flexDirection: 'row', // Diseño en fila para alinear elementos horizontalmente
        marginTop: 15, // Margen superior
        alignItems: 'space-between', // Alineación entre los elementos
        justifyContent: 'space-between', // Espacio entre los elementos
    },
    col: {
        height: 80, // Altura fija de la columna
        width: '50%', // Ancho de la columna al 50% del contenedor
    },
    colUpper: {
        width: '100%', // Ancho total de la columna superior
        marginBottom: 10, // Margen inferior
        borderBottomWidth: 1, // Ancho del borde inferior
        alignItems: '', // Alineación del contenido
        borderBottomColor: '#D9D9D9', // Color del borde inferior
    },
    numberContainer:{
        backgroundColor: 'black',
        borderRadius: 100,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 3,
        alignSelf: 'flex-start'
    }
});
