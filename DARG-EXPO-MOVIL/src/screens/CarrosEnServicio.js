import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CardDescripcion from '../components/servicios/CardDescripcionServicios';
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada';
import AutoEnProceso from '../components/servicios/CardAutoEnProceso';
import Text from '../components/utilidades/Text';
import fetchData from '../utils/FetchData';

export default function App() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [readCarrosenProceso, setreadOne] = useState([]);
    const [mostrarCarrosenProceso, setmostrarCarrosenProceso] = useState([]);

    const navigation = useNavigation();
    const route = useRoute();
    const { idServiciosDisponibles } = route.params;

    const handleGoBack = () => {
        navigation.goBack();
    };

    const selectCarrosEnServicio = async () => {
        const formData = new FormData();
        formData.append('id_servicio', idServiciosDisponibles);
        try {
            const DATA = await fetchData('servicios_en_proceso.php', 'readCarrosenProceso', formData);
            console.log('Datos obtenidos Carros En Servicio:', DATA); // Registra los datos obtenidos
            if (DATA.status) {
                const data = DATA.dataset.map(item => ({
                    nombre: item.nombre_servicio,
                    descripcion: item.descripcion_servicio,
                }));
                setreadOne(data);
            } else {
                console.log(DATA.error);
                setreadOne([]);
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            setreadOne([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const selectCarrosenProceso = async () => {
        const formData = new FormData();
        formData.append('id_servicio', idServiciosDisponibles);
        try {
            const DATA = await fetchData('carros_en_proceso.php', 'mostrarCarrosenProceso', formData);
            console.log('Datos obtenidos Carros En Proceso:', DATA); // Registra los datos obtenidos
            if (DATA.status) {
                const data = DATA.dataset.map(item => ({
                    modelo: item.modelo_automovil,
                    tipoVehiculo: item.nombre_tipo_automovil,
                    placa: item.placa_automovil,
                    fechaDeRegistro: item.fecha_registro,
                }));
                setmostrarCarrosenProceso(data);
            } else {
                console.log(DATA.error);
                setmostrarCarrosenProceso([]);
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            setmostrarCarrosenProceso([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        selectCarrosEnServicio();
        readElements();
    }, []);

    useEffect(() => {
        console.log('Data fetched:', readCarrosenProceso);
    }, [readCarrosenProceso]);

    const renderCarrosEnServicio = (servicios) => {
        if (!Array.isArray(servicios)) {
            console.error('Error: servicios no es un arreglo');
            return null;
        }
        console.log('Servicios:', servicios); // Verifica los datos aquí
        return servicios.map((item, index) => (
            <CardDescripcion
                key={index}
                title={item.nombre}
                descripcion={item.descripcion}
            />
        ));
    };

    // Función para leer datos de la API
    const readElements = async () => {
        try {
            console.log('asasasa', idServiciosDisponibles);
            const formData = new FormData();
            formData.append('id_servicio', idServiciosDisponibles);

            const responseCarros = await fetchData('carros_en_proceso.php', 'mostrarCarrosenProceso', formData);
            const responseServicio = await fetchData('servicios_en_proceso.php', 'readCarrosenProceso', formData);

            if (responseCarros.status) {
                setmostrarCarrosenProceso(responseCarros.dataset);
                console.log('Carros leyidos', responseCarros.dataset)
            } else {
                setmostrarCarrosenProceso([]);
                //Alert.alert('Error', ${responseCitas.error});
            }

            if (responseServicio.status) {
                setreadOne(responseServicio.dataset);
                console.log('Servicio leyido', responseServicio.dataset)
            } else {
                setmostrarCarrosenProceso([]);
                //Alert.alert('Error', ${responseCitas.error});
            }
        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titulo}>
                <Text texto='Autos en servicio "x"' font='PoppinsMedium' fontSize={25} />
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Image
                        source={require('../images/icons/btnBack.png')}
                        style={{ width: 35, height: 27 }}
                    />
                </TouchableOpacity>
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
        marginBottom: 20,
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
})