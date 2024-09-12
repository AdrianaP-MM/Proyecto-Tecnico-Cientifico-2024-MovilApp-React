import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'; // Importa los componentes necesarios de React Native
import { useNavigation, useRoute } from '@react-navigation/native'; // Importa hooks para la navegación
import CardDescripcion from '../components/servicios/CardDescripcionServicios'; // Importa el componente para mostrar la descripción del servicio
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada'; // Importa el componente personalizado de la barra de desplazamiento
import AutoEnProceso from '../components/servicios/CardAutoEnProceso'; // Importa el componente para mostrar los autos en proceso
import Text from '../components/utilidades/Text'; // Importa el componente de texto personalizado
import fetchData from '../utils/FetchData'; // Importa la función para obtener datos

// Componente principal de la pantalla
export default function App() {
    const scrollY = useRef(new Animated.Value(0)).current; // Ref para la animación del scroll
    const [contentHeight, setContentHeight] = useState(0); // Altura del contenido para la barra de desplazamiento
    const [containerHeight, setContainerHeight] = useState(0); // Altura del contenedor para la barra de desplazamiento
    const [loading, setLoading] = useState(true); // Estado para cargar datos
    const [refreshing, setRefreshing] = useState(false); // Estado para refrescar los datos
    const [readCarrosenProceso, setreadOne] = useState([]); // Estado para almacenar los datos de los carros en proceso
    const [mostrarCarrosenProceso, setmostrarCarrosenProceso] = useState([]); // Estado para almacenar los datos de los carros a mostrar

    const navigation = useNavigation(); // Hook para la navegación
    const route = useRoute(); // Hook para obtener los parámetros de la ruta
    const { idServiciosDisponibles, title } = route.params; // Parámetro de la ruta

    // Función para volver a la pantalla anterior
    const handleGoBack = () => {
        navigation.goBack();
    };

    // Función para obtener los datos de los carros en servicio
    const selectCarrosEnServicio = async () => {
        const formData = new FormData();
        formData.append('id_servicio', idServiciosDisponibles); // Añade el id del servicio a los datos del formulario
        try {
            const DATA = await fetchData('servicios_en_proceso.php', 'readCarrosenProceso', formData); // Obtiene los datos del servicio
            console.log('Datos obtenidos Carros En Servicio:', DATA); // Registra los datos obtenidos
            if (DATA.status) {
                const data = DATA.dataset.map(item => ({
                    nombre: item.nombre_servicio,
                    descripcion: item.descripcion_servicio,
                }));
                setreadOne(data); // Actualiza el estado con los datos obtenidos
            } else {
                console.log(DATA.error); // Registra el error si no se obtiene la información
                setreadOne([]);
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error); // Registra el error en caso de excepción
            setreadOne([]);
        } finally {
            setLoading(false); // Finaliza el estado de carga
            setRefreshing(false); // Finaliza el estado de refresco
        }
    };

    // Llama a las funciones para obtener los datos al montar el componente
    useEffect(() => {
        selectCarrosEnServicio();
        readElements();
    }, []);

    // Registra los datos obtenidos cada vez que cambian
    useEffect(() => {
        console.log('Data fetched:', readCarrosenProceso);
    }, [readCarrosenProceso]);

    // Función para leer los elementos de la API
    const readElements = async () => {
        try {
            //console.log('asasasa', idServiciosDisponibles);
            const formData = new FormData();
            formData.append('id_servicio', idServiciosDisponibles);

            // Obtiene datos de carros y servicios en proceso
            const responseCarros = await fetchData('carros_en_proceso.php', 'mostrarCarrosenProceso', formData);
            const responseServicio = await fetchData('servicios_en_proceso.php', 'readCarrosenProceso', formData);

            if (responseCarros.status) {
                setmostrarCarrosenProceso(responseCarros.dataset);
                //console.log('Carros leyidos', responseCarros.dataset);
            } else {
                setmostrarCarrosenProceso([]);
                //Alert.alert('Error', ${responseCitas.error});
            }

            if (responseServicio.status) {
                setreadOne(responseServicio.dataset);
                //console.log('Servicio leyido', responseServicio.dataset);
            } else {
                setmostrarCarrosenProceso([]);
                //Alert.alert('Error', ${responseCitas.error});
            }
        } catch (error) {
            //console.error('Error en leer los elementos:', error); // Registra el error en caso de excepción
            Alert.alert('Error', 'Hubo un error.'); // Muestra una alerta en caso de error
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text texto={`Autos en ${title}`} font='PoppinsMedium' fontSize={25} color='white' />
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Image
                        source={require('../images/icons/btnBack.png')}
                        style={{ width: 35, height: 27, zIndex: 3 }} // Estilo de la imagen
                        tintColor='white'
                    />
                </TouchableOpacity>
                <Image
                    source={require('../images/panelPrincipal/backImage.png')}
                    style={styles.headerImage} />
            </View>

            <ScrollView style={styles.scrollView}>
                {readCarrosenProceso.length === 0 ? (
                    <Text
                        texto='No hay servicios para mostrar'
                        fontSize={12}
                        paddingHorizontal={10}
                        font='PoppinsMedium'
                        textAlign='center'
                    />
                ) : readCarrosenProceso.length === 1 ? (
                    <CardDescripcion
                        key={0} // Para un solo elemento, el índice puede ser 0
                        servicioData={{
                            nombre_servicio: readCarrosenProceso[0].nombre_servicio,
                            descripcion_servicio: readCarrosenProceso[0].descripcion_servicio,
                        }}
                    />
                ) : (
                    readCarrosenProceso.map((servicio, index) => (
                        <CardDescripcion
                            key={index} // Usa el índice aquí para asegurar que cada elemento tenga una clave única
                            servicioData={{
                                nombre_servicio: servicio.nombre_servicio,
                                descripcion_servicio: servicio.descripcion_servicio,
                            }}
                        />
                    ))
                )
                }
            </ScrollView>
            <View style={styles.line} />
            <Text texto='Autos en proceso' font='PoppinsMedium' fontSize={17} />
            <View
                style={styles.scrollViewContainer}
                onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.containerCards}
                    onContentSizeChange={(height) => setContentHeight(height)}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                        useNativeDriver: false,
                    })}
                    showsVerticalScrollIndicator={false}
                >
                    {mostrarCarrosenProceso.length === 0 ? (
                        <Text
                            texto='Sin autos en servicios para mostrar'
                            fontSize={12}
                            paddingHorizontal={10}
                            font='PoppinsMedium'
                            textAlign='center'
                        />
                    ) : mostrarCarrosenProceso.length === 1 ? (
                        <AutoEnProceso
                            key={0} // Puedes usar un índice fijo aquí porque solo hay un elemento
                            autoProcesoData={{
                                modelo_automovil: mostrarCarrosenProceso[0].modelo_automovil,
                                nombre_tipo_automovil: mostrarCarrosenProceso[0].nombre_tipo_automovil,
                                placa_automovil: mostrarCarrosenProceso[0].placa_automovil,
                                fecha_registro: mostrarCarrosenProceso[0].fecha_registro
                            }}
                        />
                    ) : (
                        mostrarCarrosenProceso.map((carroProceso, index) => (
                            <AutoEnProceso
                                key={index}
                                autoProcesoData={{
                                    modelo_automovil: carroProceso.modelo_automovil,
                                    nombre_tipo_automovil: carroProceso.nombre_tipo_automovil,
                                    placa_automovil: carroProceso.placa_automovil,
                                    fecha_registro: carroProceso.fecha_registro
                                }}
                            />
                        ))
                    )}
                </ScrollView>
                <CustomScrollBar
                    scrollY={scrollY}
                    contentHeight={contentHeight}
                    containerHeight={containerHeight}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    titulo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 40,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        marginBottom: 0,
        marginTop: -100,
        zIndex: 3,
    },
    backButtonText: {
        fontSize: 16,
        marginLeft: 5,
    },
    scrollViewContainer: {
        width: '94%',
        maxHeight: '37%',
        minHeight: '37%',
        position: 'relative',
        marginBottom: 35,
    },
    scrollView: {
        width: '100%',
    },
    containerCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 20,
        width: '100%',
    },
    headerImage: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0
      },
})