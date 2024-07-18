import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, View, Animated, Text } from 'react-native';
import Slides from '../components/primerUso/Slides'; // Importa los datos de las diapositivas
import Paginator from '../components/primerUso/Paginator'; // Importa el paginador
import OnboardingItem from '../components/primerUso/OnBoardingItems'; // Importa el componente de cada elemento de onboarding


const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para el índice actual de la diapositiva
    const scrollX = useRef(new Animated.Value(0)).current; // Referencia animada para el desplazamiento en X
    const slidesRef = useRef(null); // Referencia para la lista de diapositivas

    // Función para manejar el cambio de elementos visibles
    const viewableItemsChange = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index); // Actualiza el índice actual
        }
    }).current;

    // Configuración de la visibilidad de los elementos
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={Slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChange}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={Slides} scrollX={scrollX} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa todo el espacio disponible
        backgroundColor: '#FFE0E1', // Color de fondo
        alignItems: 'center', // Alinea los elementos en el centro horizontalmente
        justifyContent: 'center', // Justifica los elementos en el centro verticalmente
    },
});


export default Onboarding;
