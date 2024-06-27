import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importa la card de descripcion del servicio
import CardDescripcion from '../components/servicios/cardDescripcionServicios';
// Importa la scrollbar perzonalizada
import CustomScrollBar from '../components/servicios/scrollBarPerzonalizada';
// Importa la card de auto en proceso
import AutoEnProceso from '../components/servicios/cardAutoEnProceso';
import Text from '../components/utilidades/text';

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
                <Text texto='Autos en servicio "x"' font='PoppinsMedium' fontSize={25} />

                <TouchableOpacity onPress={handleGoBack} style={styles.backButton} /*Boton de regresar*/>
                    <Image
                        source={require('../images/icons/btnBack.png')} // Ruta a tu imagen personalizada
                        style={{ width: 35, height: 27 }} // Ajusta el tamaño según tus necesidades
                    />
                </TouchableOpacity>
            </View>

            <CardDescripcion //Card de descripcion del servicio
                titulo="Cambio de aceite"
                descripcion="El cambio de aceite es para pues cambiarselo ya esta viejo después termina como gelatina el aceite del carter."
            />

            <View style={styles.line} /*Linea para dividir la descripcion de las cards*/ />

            <Text texto='Autos en proceso' font='PoppinsMedium' fontSize={17} />

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
        flex: 1, /*Propiedad flex*/
        backgroundColor: '#F9FAFB', /*Fondo de color*/
        alignItems: 'center', /*Alinear verticalmente*/
        justifyContent: 'center', /*Alinear al centro*/
    },
    titulo: {
        flexDirection: 'row', /*Ordenar horizontalmente*/
        alignItems: 'center', /*Alinear verticalmente*/
        width: '100%', /*Ancho del titulo*/
        paddingHorizontal: 20, /*Separacion interna a los lados verticamente*/
        marginVertical: 20, /*Separacion vertical del titulo*/
    },
    backButton: {
        flexDirection: 'row', /*Ordenar horizontalmente*/
        alignItems: 'center', /*Alinear verticalmente*/
        marginLeft: 'auto', /*Ancho del titulo*/
        marginBottom: 20, /*Separacion inferior*/
    },
    backButtonText: {
        fontSize: 16, /*Tamaño de fuente*/
        marginLeft: 5, /*Separacion a la izquierada*/
    },
    scrollViewContainer: {
        width: '94%', /*Ancho del contenedor scroll*/
        maxHeight: '37%', /*Altura maxima*/
        minHeight: '37%', /*Altura minima*/
        position: 'relative', /*Posicion del contenedor*/
        marginBottom: 35, /*Separacion inferior*/
    },
    scrollView: {
        width: '100%', /*Ancho del scroll view*/
    },
    containerCards: {
        flexDirection: 'row', /*Ordenar horizontalmente*/
        flexWrap: 'wrap', /*Propiedad wrap*/
        justifyContent: 'space-around', /*Alinear a los extremos*/
    },
    line: {
        borderBottomColor: 'black', /*Color de la linea*/
        borderBottomWidth: 1, /*Ancho inferior del borde*/
        width: '92%', /*Ancho de la linea*/
        marginTop: 20, /*Separacion superior de la linea*/
        marginBottom: 16, /*Separacion inferior*/
    },
});
