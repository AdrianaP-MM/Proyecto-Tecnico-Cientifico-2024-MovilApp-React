import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
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
            // Datos locales para pruebas
            const localData = [
                { modelo_automovil: "Toyota Corolla", nombre_tipo_automovil: "Sedán", placa_automovil: "ABC123", fecha_registro: "2024-08-07" }
            ];
            setmostrarCarrosenProceso(localData.map(item => ({
                modelo: item.modelo_automovil,
                tipoVehiculo: item.nombre_tipo_automovil,
                placa: item.placa_automovil,
                fechaDeRegistro: item.fecha_registro,
            })));
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
        selectCarrosenProceso();
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

    const rendermostrarCarrosenProceso = (servicios) => {
        if (!Array.isArray(servicios)) {
            console.error('Error: servicios no es un arreglo');
            return null;
        }
        console.log('Servicios:', servicios); // Verifica los datos aquí
        return servicios.map((item, index) => (
            <CardDescripcion
                key={index}
                modelo={item.modelo}
                tipoVehiculo={item.tipoVehiculo}
                placa={item.placa}
                fechaDeRegistro={item.fechaDeRegistro}
            />
        ));
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
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView>
                    {renderCarrosEnServicio(readCarrosenProceso)}
                </ScrollView>
            )}
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

                    <ScrollView>
                        {rendermostrarCarrosenProceso(mostrarCarrosenProceso)}
                    </ScrollView>


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
    },
    titulo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 20,
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
        width: '92%',
        marginTop: 20,
        marginBottom: 16,
    },
});
