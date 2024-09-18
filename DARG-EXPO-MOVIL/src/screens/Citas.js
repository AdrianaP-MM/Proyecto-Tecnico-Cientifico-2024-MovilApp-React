import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Animated, Easing, Alert } from 'react-native';
import Text from '../components/utilidades/Text'; // Importación del componente de texto personalizado
import ButtonPastilla from '../components/citas/ButtonPastilla'; // Importación del componente de botón personalizado
import CardCita from '../components/citas/CardCita'; // Importación del componente de tarjeta de cita personalizado
import Input from '../components/inputs/AllBorder';
import { useFocusEffect } from '@react-navigation/native';
import fetchData from '../utils/FetchData';
import Button from '../components/buttons/ButtonRojo'; // Importa el componente Button desde su ruta

import { verDetalles } from '../utils/CitasFunctions'

export default function AppCitas({ navigation }) {
    //TODO Aqui empiezan las funciones y variables que tienen que ver con la dinamica visual de la pantalla
    const [selectedButton, setSelectedButton] = useState('En espera'); // Estado para el botón seleccionado

    // Función para cambiar el estado del botón seleccionado
    const changeEstado = async (button) => {
        // Mapeo de estados a valores de la base de datos
        const estadoMap = {
            'En espera': 'En espera',
            'Aceptadas': 'Aceptado',
            'Finalizadas': 'Finalizada' // Cambié 'Finalizada' a 'Finalizada' para consistencia
        };

        // Determinar el estado de cita a consultar
        const estadoCita = estadoMap[button] || '';

        // Solo realizar la solicitud si el estado es válido
        if (estadoCita) {
            const formData = new FormData();
            formData.append('estado_cita', estadoCita);
            try {
                const responseCitas = await fetchData('citas.php', 'readAllEspecific', formData);
                // Actualizar el estado de citas basado en la respuesta
                if (responseCitas.status) {
                    setCitas(responseCitas.dataset);
                } else {
                    setCitas([]);
                }
            } catch (error) {
                // Manejo de errores de la solicitud
                console.error('Error fetching citas:', error);
                setCitas([]);
            }
        } else {
            // En caso de un estado de botón inválido, limpiar citas
            setCitas([]);
        }

        // Actualizar el botón seleccionado
        setSelectedButton(button);
    };


    const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar el menú de filtros
    const animation = useRef(new Animated.Value(0)).current; // Valor de animación
    const [opacity, setOpacity] = useState(0);
    const [anchoDatePicker, setAnchoDatePicker] = useState(0);
    const [altoDatePicker, setAltoDatePicker] = useState(0);

    // Función para manejar el toggle del menú de filtros
    const toggleFilters = () => {
        const toValue = showFilters ? 0 : 150; // Altura del menú de filtros cuando está visible
        setOpacity(showFilters ? 0 : 1);
        setShowFilters(!showFilters);
        if (!showFilters) {
            setAltoDatePicker(40);
            setAnchoDatePicker(105);
        } else {
            setAltoDatePicker(0);
            setAnchoDatePicker(0);
        }

        Animated.timing(animation, {
            toValue,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
        }).start();
    };

    // TODO Aqui empiezan las funciones y variables que tienen que ver con base de datos

    // Efecto para cargar los datos
    useFocusEffect(
        React.useCallback(() => {
            readElements(); // Leer elementos de la API
        }, [])
    );

    const [citas, setCitas] = useState([]);

    // Función para leer datos de la API
    const readElements = async () => {
        try {
            changeEstado('En espera');
        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };


    const deleteCita = (idCita) => {
        Alert.alert(
            'Eliminar cita',
            `¿Seguro que deseas eliminar la cita con ID: ${idCita}?`,
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Eliminación cancelada'), // Acción en caso de cancelar
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        // Acción en caso de confirmar la eliminación
                        console.log(`Cita con ID ${idCita} será eliminada`);
                        await deleteRow(idCita); // Llamada a la función para eliminar la cita
                    },
                },
            ],
            { cancelable: false } // No permite cancelar el alert tocando fuera de él
        );
    };

    const deleteRow = async (id_cita) => {
        try {
            const formData = new FormData();
            formData.append('id_cita', id_cita);
            const responseCitas = await fetchData('citas.php', 'deleteRow', formData);
            if (responseCitas.status) {
                Alert.alert('Éxito', `${responseCitas.message}`);
                readElements(); // Re-cargar los elementos después de la eliminación
            } else {
                Alert.alert('Error', `${responseCitas.error}`);
            }
        } catch (error) {
            console.error('Error en eliminar la cita:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    const [fechaLlegada, setFechaLlegada] = useState('');

    const searchByFechaLLegada = async (fecha_llegada) => {
        try {
            const formData = new FormData();
            formData.append('fecha_llegada', fecha_llegada);
            formData.append('estado_cita', selectedButton)

            console.log(formData);

            // const responseSearch = await fetchData('citas.php', 'searchByFechaLLegada', formData);
            // if (responseCitas.status) {
            //     Alert.responseSearch('Éxito', `${responseSearch.message}`);
            //     readElements(); // Re-cargar los elementos después de la eliminación
            // } else {
            //     Alert.alert('Error', `${responseSearch.error}`);
            // }
        } catch (error) {
            console.error('Error en buscar la cita solicitada:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    return (
        <SafeAreaView style={styles.contenedorTotal}>
            <StatusBar style="light" backgroundColor="#010101" />
            <Image
                source={require('../images/panelPrincipal/backImage.png')}
                style={styles.headerImage} />
            <Text texto='REVOLUTION GARAGE' font='PoppinsBold' fontSize={13} color='white' textAlign='center' />
            <View style={styles.contenedorTitulo}>
                <Text texto='Citas' font='PoppinsSemiBold' fontSize={25} color='white' />
                <TouchableOpacity onPress={() => navigation.navigate('AgregarCita')}>
                    <Image
                        source={require('../images/icons/iconAddRed.png')} /// Ruta de la imagen de botón de agregar
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
                    <Animated.View style={[styles.contenedorFiltros, { height: animation, opacity: opacity }]}>
                        <View style={styles.contenedorFecha}>
                            <Image
                                source={require('../images/icons/iconCalendar.png')}
                                style={styles.iconCalendar}
                            /// Ruta de la imagen de botón de agregar
                            />
                            <Text texto='Buscar por fecha de llegada' fontSize={12}
                                paddingHorizontal={10} font='PoppinsMedium' />
                            <Input
                                placeholder='12/09/24'
                                keyboardType='fecha'
                                width={anchoDatePicker}
                                height={altoDatePicker}
                                padding={8}
                                value={fechaLlegada}
                                onChangeText={setFechaLlegada}
                            />
                        </View>
                        <View style={styles.contenedorNumero}>
                            <Input
                                placeholder='Buscar por número de cita'
                                width='100%'
                                iconImage={(require('../images/icons/iconLupa.png'))}
                                padding={5}
                                tintColor='#000000'
                                fontSize={12}
                            />
                        </View>
                        <View style={styles.contenedorBoton}>
                            <Button textoBoton='Buscar' fontSize={13} height={30} width={90} marginBottom={20} marginTop={20} />
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
                    {citas.length === 0 ? (
                        <Text texto='Sin citas para mostrar' fontSize={20}
                            paddingHorizontal={10} font='PoppinsMedium' textAlign='center'
                        />
                    ) : (
                        <ScrollView>
                            {citas.map(cita => (
                                <CardCita
                                    key={cita.id_cita}
                                    accionCard={() => verDetalles(navigation, cita)}
                                    citaData={{
                                        id_cita:cita.id_cita,
                                        fotoCarro: cita.imagen_automovil,
                                        fecha_cita: cita.fecha_cita,
                                        anio_cita: cita.anio_cita,
                                        hora_cita: cita.hora_cita,
                                        modelo_automovil: cita.modelo_automovil,
                                        placa_automovil: cita.placa_automovil,
                                        movilizacion_vehiculo: cita.movilizacion_vehiculo
                                    }}
                                />
                            ))}
                        </ScrollView>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}

// Estilos para los componentes de la pantalla de citas
const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1, // Ocupa todo el espacio disponible
        backgroundColor: '#010101', // Fondo gris claro
        alignItems: 'center', // Alinea elementos al inicio horizontalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio verticalmente
        marginTop: 24, // Margen superior de 20 unidades
        paddingTop: 30, // Relleno superior de 20 unidades
        paddingBottom: 40,
        padding: 0, // Sin relleno horizontal adicional
    },
    contenedorTitulo: {
        width: '100%', // Ancho completo
        flexDirection: 'row', // Disposición en fila para los elementos hijos
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio horizontalmente
        marginBottom: 10, // Margen vertical de 20 unidades
        marginTop: 15,
        paddingHorizontal: 25,
    },
    image: {
        marginLeft: 10, // Margen izquierdo de 10 unidades para la imagen
        width: 40, // Ancho fijo de 40 unidades
        height: 40, // Altura fija de 40 unidades
    },
    iconImageContainer: {
        width: 40, // Ancho fijo de 40 unidades
        height: 40, // Altura fija de 40 unidades
        marginHorizontal: 15,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconImage: {
        width: 20, // Ancho fijo de 40 unidades
        height: 20, // Altura fija de 40 unidades
        zIndex: 6,
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
        paddingHorizontal: 25,
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
        backgroundColor: 'white', // Fondo gris claro
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'space-evenly', // Espacio uniformemente distribuido entre elementos
        top: 0, // Desde la parte superior
        zIndex: 3, // Orden en la pila
        borderRadius: 15,
        paddingHorizontal: 5,
        marginTop: -15
    },
    contenedorFecha: {
        width: '100%',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
    },
    contenedorNumero: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    scrollCitas: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: 'white',
    },
    iconCalendar: {
        width: 28,
        height: 30,
    },
    headerImage: {
        position: 'absolute'
    },
    contenedorBoton: {
        width: '100%',
        alignItems: 'center'
    }
});