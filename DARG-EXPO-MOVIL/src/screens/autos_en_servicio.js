import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Animated, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importa la card de descripcion del servicio
import CardDescripcion from '../components/servicios/card_descripcion_servicio';
// Importa la scrollbar perzonalizada
import CustomScrollBar from '../components/servicios/scroll_bar_personalizada';
// Importa la card de auto en proceso
import AutoEnProceso from '../components/servicios/card_auto_en_proceso';

export default function App() {
    // Constantes para ver las dimensiones para la barra de scroll
    const scrollY = useRef(new Animated.Value(0)).current;
    const [contentHeight, setContentHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    //Constante de navegacion
    const navigation = useNavigation();

    // Función para manejar la acción de regresar
    const handleGoBack = () => {
        navigation.goBack(); // Navega a la pantalla anterior
    };

    return (
        //Contenedor de la pantalla en general
        <View style={styles.container}>

            <View style={styles.titulo} /*Contenedor del titulo y del boton de regresar*/>
                <Text style={styles.title}>Autos En "Servicio x" </Text>

                <TouchableOpacity onPress={handleGoBack} style={styles.backButton} /*Boton de regresar*/>
                    <Image
                        source={require('../images/icons/btnBack.png')} // Ruta a tu imagen personalizada
                        style={{ width: 35, height: 27 }} // Ajusta el tamaño según tus necesidades
                    />
                </TouchableOpacity>
            </View>

            <CardDescripcion //Card de descripcion del servicio
                titulo="Cambio de aceite"
                descripcion="El cambio de aceite es para pues cambiarselo ya esta viejo xd despues termina como gelatina el aceite del carter."
            />

            <View style={styles.line} /*Linea para dividir la descripcion de las cards*/ />

            <Text style={styles.title}>Autos en proceso</Text>

            <View /*Contenedor que guarda el scroll de las cards de servicios*/
                style={styles.scrollViewContainer}
                onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
            >
                <ScrollView /*Scroll view donde se encuentran las cards*/
                    style={styles.scrollView}
                    contentContainerStyle={styles.containerCards}
                    /*De aqui se saca el alto del content y se use el parametro para el scroll personalizado*/
                    onContentSizeChange={(height) => setContentHeight(height)}
                    /*Se agrega el event al contenedor Animated*/
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                        useNativeDriver: false,
                    })}
                    /*Se oculta la scroll bar predeterminada*/
                    showsVerticalScrollIndicator={false}
                >

                    <AutoEnProceso //Card de ejemplo de auto en proceso
                        marca="Mazda"
                        modelo="RX8"
                        tipoVehiculo="Deportivo Coupe"
                        placa="P246-456"
                        fechaDeRegistro="17/06/2024"
                    />

                    <AutoEnProceso //Card de ejemplo de auto en proceso
                        marca="Mazda"
                        modelo="RX8"
                        tipoVehiculo="Deportivo Coupe"
                        placa="P246-456"
                        fechaDeRegistro="17/06/2024"
                    />

                </ScrollView>

                <CustomScrollBar /*Se agregan los parametros que espera recibir la custom bar*/
                    scrollY={scrollY}
                    contentHeight={contentHeight}
                    containerHeight={containerHeight}
                />

            </View>
        </View>
    );
}

//Hoja de estilos la vista general de la pantalla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    titulo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
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
        maxHeight: '40%',
        minHeight: '40%',
        position: 'relative',
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
