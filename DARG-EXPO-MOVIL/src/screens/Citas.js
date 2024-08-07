import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Animated, Easing, Alert } from 'react-native';
import Text from '../components/utilidades/Text'; // Importación del componente de texto personalizado
import ButtonPastilla from '../components/citas/ButtonPastilla'; // Importación del componente de botón personalizado
import CardCita from '../components/citas/CardCita'; // Importación del componente de tarjeta de cita personalizado
import Input from '../components/inputs/AllBorder';
import { useFocusEffect } from '@react-navigation/native';
import fetchData from '../utils/FetchData';

export default function AppCitas({ navigation }) {
    //TODO Aqui empiezan las funciones y variables que tienen que ver con la dinamica visual de la pantalla
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
    const [opacity, setOpacity] = useState(0);

    // Función para manejar el toggle del menú de filtros
    const toggleFilters = () => {
        const toValue = showFilters ? 0 : 120; // Altura del menú de filtros cuando está visible
        setOpacity(showFilters ? 0 : 1);
        setShowFilters(!showFilters);

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
            const responseCitas = await fetchData('citas.php', 'readAllEspecific')
            if (responseCitas.status) {
                setCitas(responseCitas.dataset);
                console.log(responseCitas.dataset)
            } else {
                setCitas([]);
                //Alert.alert('Error', `${responseCitas.error}`);
            }
        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
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
                                placeholder='27/06/24'
                                width={90}
                                textAlign='center'
                                padding={0}
                                fontSize={12}
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
                        <Text texto='Sin citas para mostrar' fontSize={22}
                            paddingHorizontal={10} font='PoppinsMedium' textAlign='center'
                        />
                    ) : citas.length === 1 ? (
                        <CardCita
                            accionCard={verDetalles}
                            cita={citas[0]}
                            citaData={{
                                fotoCarro: citas[0].imagen_automovil,
                                fecha_cita: citas[0].fecha_cita,
                                anio_cita: citas[0].anio_cita,
                                hora_cita: citas[0].hora_cita,
                                marca_automovil: citas[0].marca_automovil,
                                placa_automovil: citas[0].placa_automovil,
                                movilizacion_vehiculo: citas[0].movilizacion_vehiculo
                            }}
                            onLongPress={() => deleteCita(citas[0].id_cita)} // Pasa una función anónima
                        />
                    ) : (
                        citas.map(cita => (
                            <CardCita
                                key={cita.id_cita}
                                accionCard={verDetalles}
                                citaData={{
                                    fotoCarro: cita.imagen_automovil,
                                    fecha_cita: cita.fecha_cita,
                                    anio_cita: cita.anio_cita,
                                    hora_cita: cita.hora_cita,
                                    marca_automovil: cita.marca_automovil,
                                    placa_automovil: cita.placa_automovil,
                                    movilizacion_vehiculo: cita.movilizacion_vehiculo
                                }}
                                onLongPress={() => deleteCita(cita.id_cita)}
                            />
                        ))
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
        backgroundColor: '#E5383B', // Fondo rojo
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
        justifyContent: 'space-between', // Espacio uniformemente distribuido entre elementos
        top: 0, // Desde la parte superior
        zIndex: 1, // Orden en la pila
        borderRadius: 15,
        paddingHorizontal: 5,
    },
    contenedorFecha: {
        width: '100%',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
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
    }
});