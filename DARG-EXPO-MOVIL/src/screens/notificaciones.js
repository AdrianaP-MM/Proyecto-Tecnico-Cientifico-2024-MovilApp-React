import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Text from '../components/utilidades/text'; // Importación del componente de texto personalizado
import CardNoti from '../components/notificaciones/cardNoti'; // Importación del componente de tarjeta de notificación personalizado

export default function AppNotificaciones() {
    return (
        <View style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#ffffff" /> {/* Barra de estado personalizada */}
            <View style={styles.col}>
                <View style={styles.contenedorTitulo}>
                    <Text texto='Notificaciónes' font='PoppinsMedium' fontSize={25} /> {/* Texto personalizado para el título */}
                    <Image
                        source={require('../images/icons/iconCampana.png')}  // Ruta de la imagen de campana
                        style={styles.image}
                    />
                </View>
                <Text texto='Tienes n notificaciónes nuevas' font='PoppinsRegular' fontSize={14} color='#6A6A6A' /> {/* Texto personalizado para el subtitulo */}
            </View>
            <ScrollView style={styles.scrollCards}>
                {<CardNoti />}  {/* Renderizado del componente de tarjeta de notificación */}
            </ScrollView>
        </View>
    );
}

// Estilos para los componentes de la pantalla de notificaciones
const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1, // Ocupa todo el espacio disponible
        backgroundColor: '#F9FAFB', // Fondo gris claro
        alignItems: 'flex-start', // Alinea elementos al inicio horizontalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio verticalmente
        marginTop: 20, // Margen superior de 20 unidades
        paddingTop: 20, // Relleno superior de 20 unidades
        padding: 0, // Sin relleno horizontal adicional
    },
    col: {
        width: '100%', // Ancho completo
        paddingHorizontal: 15, // Relleno horizontal de 15 unidades
        marginVertical: 20, // Margen vertical de 20 unidades
        backgroundColor: '#F9FAFB', // Fondo gris claro
    },
    contenedorTitulo: {
        width: '100%', // Ancho completo
        backgroundColor: '#F9FAFB', // Fondo gris claro
        flexDirection: 'row', // Disposición en fila para los elementos hijos
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio horizontalmente
    },
    image: {
        marginLeft: 10, // Margen izquierdo de 10 unidades para la imagen
        width: 25, // Ancho fijo de 25 unidades
        height: 28, // Altura fija de 28 unidades
    },
    scrollCards: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: '#F9FAFB', // Fondo gris claro para el área de desplazamiento
        paddingTop: 10, // Relleno superior de 10 unidades
    }
});
