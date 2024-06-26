import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, SafeAreaView  } from 'react-native';
import Text from '../components/utilidades/text'; // Importación del componente de texto personalizado
import ButtonPastilla from '../components/citas/btnPastilla'; // Importación del componente de botón personalizado
import CardCita from '../components/citas/cardCita'; // Importación del componente de tarjeta de cita personalizado

export default function AppCitas({ navigation }) {
    const [selectedButton, setSelectedButton] = useState('En espera'); // Estado para el botón seleccionado

    // Función para cambiar el estado del botón seleccionado
    const changeEstado = (button) => {
        setSelectedButton(button);
    };

    // Función para navegar a la pantalla de detalles de la cita
    const verDetalles = () => {
        navigation.navigate('Detalles de la cita', {
            fecha: '22/03/2024',
            hora: '3:30pm',
            auto: 'Ferrari Electra',
            movilizacion: 'Dejaré el automovil',
            zona: 'San Salvador',
            ida: 'De mi casa al taller',
            regreso: 'Del taller, A mi casa',
        });
    };

    return (
        <SafeAreaView  style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#F9FAFB" /> {/* Barra de estado personalizada */}
            <View style={styles.contenedorTitulo}>
                <Text texto='Citas' font='PoppinsMedium' fontSize={25} /> {/* Texto personalizado para el título */}
                <TouchableOpacity onPress={() => navigation.navigate('AgregarCita')}>
                    <Image
                        source={require('../images/icons/iconAdd.png')} /// Ruta de la imagen de botón de agregar
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.contenedorCuerpo}>
                <View style={styles.contenedorOpciones}>
                        {/* Botones personalizados para filtrar citas */}
                    <ButtonPastilla
                        textoBoton='En espera'
                        accionBoton={() => changeEstado('En espera')}
                        selected={selectedButton === 'En espera'}
                    />
                    <ButtonPastilla
                        textoBoton='Aceptadas'
                        accionBoton={() => changeEstado('Aceptadas')}
                        selected={selectedButton === 'Aceptadas'}
                    />
                    <ButtonPastilla
                        textoBoton='Finalizadas'
                        accionBoton={() => changeEstado('Finalizadas')}
                        selected={selectedButton === 'Finalizadas'}
                    />
                </View>
                <ScrollView style={styles.scrollCitas}>
                    {/* Tarjetas de cita personalizadas */}
                    <CardCita accionCard={verDetalles} />
                    <CardCita accionCard={verDetalles} />
                    <CardCita accionCard={verDetalles} />
                    <CardCita accionCard={verDetalles} />
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}

// Estilos para los componentes de la pantalla de citas
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
    contenedorTitulo: {
        width: '100%', // Ancho completo
        backgroundColor: '#F9FAFB', // Fondo gris claro
        flexDirection: 'row', // Disposición en fila para los elementos hijos
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio horizontalmente
        marginVertical: 20, // Margen vertical de 20 unidades
        paddingHorizontal: 15, // Relleno horizontal de 15 unidades
    },
    image: {
        marginLeft: 10, // Margen izquierdo de 10 unidades para la imagen
        width: 40, // Ancho fijo de 40 unidades
        height: 40, // Altura fija de 40 unidades
    },
    contenedorCuerpo: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: 'white', // Fondo blanco para el cuerpo principal
        alignItems: 'center', // Alinea elementos al centro horizontalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio verticalmente
    },
    contenedorOpciones: {
        width: '100%', // Ancho completo
        height: 'auto', // Altura automática basada en su contenido
        backgroundColor: '#F9FAFB', // Fondo gris claro
        flexDirection: 'row', // Disposición en fila para los elementos hijos
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'space-around', // Espacio uniformemente distribuido entre elementos
        position: 'sticky', // Se mantiene fijo mientras se hace scroll
        top: 0, // Desde la parte superior
        zIndex: 1, // Orden en la pila
        borderBottomWidth: 0, // Sin borde inferior
        borderColor: '#E4E5EB', // Color del borde
    },
    scrollCitas: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: 'white', // Fondo blanco para el área de desplazamiento
        paddingTop: 10, // Relleno superior de 10 unidades
    },
});