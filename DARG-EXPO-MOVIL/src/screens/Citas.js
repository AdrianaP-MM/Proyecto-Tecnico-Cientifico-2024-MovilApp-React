import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Animated, Easing } from 'react-native';
import Text from '../components/utilidades/Text'; // Importación del componente de texto personalizado
import ButtonPastilla from '../components/citas/ButtonPastilla'; // Importación del componente de botón personalizado
import CardCita from '../components/citas/CardCita'; // Importación del componente de tarjeta de cita personalizado

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
            movilizacion: 'Dejaré el automóvil',
            zona: 'San Salvador',
            ida: 'De mí casa al taller',
            regreso: 'Del taller, A mi casa',
        });
    };

    const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar el menú de filtros
    const animation = useRef(new Animated.Value(0)).current; // Valor de animación

    // Función para manejar el toggle del menú de filtros
    const toggleFilters = () => {
        const toValue = showFilters ? 0 : 120; // Altura del menú de filtros cuando está visible
        setShowFilters(!showFilters);

        Animated.timing(animation, {
            toValue,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
    };

    return (
        <SafeAreaView style={styles.contenedorTotal}>
            <StatusBar style="light" backgroundColor="#E5383B" />
            <Text texto='REVOLUTION GARAGE' font='PoppinsBold' fontSize={13} color='white' textAlign='center' />
            <View style={styles.contenedorTitulo}>
                <Text texto='Citas' font='PoppinsMedium' fontSize={25} color='white' />
                <TouchableOpacity onPress={() => navigation.navigate('AgregarCita')}>
                    <Image
                        source={require('../images/icons/iconAddWht.png')} /// Ruta de la imagen de botón de agregar
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.contenedorCuerpo}>
                <View style={styles.contenedorOpciones}>
                    <TouchableOpacity style={styles.iconImageContainer} onPress={toggleFilters}>
                        <Image
                            source={require('../images/icons/iconArrowMore.png')} /// Ruta de la imagen de botón de agregar
                            style={styles.iconImage}
                        />
                    </TouchableOpacity>
                    <Animated.View style={[styles.contenedorFiltros, { height: animation }]}>
                        <View style={styles.contenedorFecha}>

                        </View>
                        <View style={styles.contenedorNumero}>

                        </View>
                    </Animated.View>
                    <View style={styles.contenedorMenu}>
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


                </View>
                <ScrollView style={styles.scrollCitas}>
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
        backgroundColor: '#E5383B', // Fondo gris claro
        alignItems: 'center', // Alinea elementos al inicio horizontalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio verticalmente
        marginTop: 20, // Margen superior de 20 unidades
        paddingTop: 30, // Relleno superior de 20 unidades
        paddingBottom: 40,
        padding: 0, // Sin relleno horizontal adicional
    },
    contenedorTitulo: {
        width: '100%', // Ancho completo
        backgroundColor: '#E5383B', // Fondo gris claro
        flexDirection: 'row', // Disposición en fila para los elementos hijos
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio horizontalmente
        marginBottom: 10, // Margen vertical de 20 unidades
        marginTop: 15,
        paddingHorizontal: 20, // Relleno horizontal de 15 unidades
    },
    image: {
        marginLeft: 10, // Margen izquierdo de 10 unidades para la imagen
        width: 40, // Ancho fijo de 40 unidades
        height: 40, // Altura fija de 40 unidades
    },
    iconImageContainer: {
        width: 17, // Ancho fijo de 40 unidades
        height: 17, // Altura fija de 40 unidades
        marginHorizontal: 40,
        marginBottom: 5,
    },
    iconImage: {
        width: 17, // Ancho fijo de 40 unidades
        height: 17, // Altura fija de 40 unidades
    },
    contenedorCuerpo: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: 'white', // Fondo blanco para el cuerpo principal
        alignItems: 'center', // Alinea elementos al centro horizontalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio verticalmente
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingBottom: 50,
        paddingTop: 10,
        paddingHorizontal: 0,
    },
    contenedorOpciones: {
        width: '100%', // Ancho completo
        height: 'auto', // Altura automática basada en su contenido
        backgroundColor: 'white', // Fondo gris claro
        flexDirection: 'col', // Disposición en fila para los elementos hijos
        alignItems: 'flex-end', // Alinea elementos al centro verticalmente
        justifyContent: 'center', // Espacio uniformemente distribuido entre elementos
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingBottom: 5,
    },
    contenedorMenu: {
        width: '100%', // Ancho completo
        height: 'auto', // Altura automática basada en su contenido
        backgroundColor: 'white', // Fondo gris claro
        flexDirection: 'row', // Disposición en fila para los elementos hijos
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'center', // Espacio uniformemente distribuido entre elementos
        position: 'sticky', // Se mantiene fijo mientras se hace scroll
        top: 0, // Desde la parte superior
        zIndex: 1, // Orden en la pila
        borderRadius: 50,
        paddingVertical: 10,
    },
    contenedorFiltros: {
        width: '100%', // Ancho completo
        height: 'auto', // Altura automática basada en su contenido
        backgroundColor: 'pink', // Fondo gris claro
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'space-between', // Espacio uniformemente distribuido entre elementos
        top: 0, // Desde la parte superior
        zIndex: 1, // Orden en la pila
        borderRadius: 15,
    },
    contenedorFecha:{
        width: '100%',
        height: 55,
        borderRadius: 15,
        backgroundColor: 'red',
    },
    contenedorNumero:{
        width: '100%',
        height: 55,
        borderRadius: 15,
        backgroundColor: 'red',
    },
    scrollCitas: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: 'white', // Fondo blanco para el área de desplazamiento
        paddingHorizontal: 15,
    },
});