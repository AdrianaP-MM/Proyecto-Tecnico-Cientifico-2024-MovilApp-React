import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Animated } from 'react-native';
// Importa la card que se utiliza para mostrar el contenido
import HorizontalCard from '../src/card_grupos_servicios';
// Importa la barra de scroll personalizada
import CustomScrollBar from '../src/scroll_bar_personalizada';

export default function App() {
  // Constantes para ver las dimensiones para la barra de scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  return (
    // Container principal de pantalla
    <View style={styles.container}>
      <View style={styles.titulo} /*Contenedor del titulo de la pantalla*/>
        <Text style={styles.title}>Grupos de servicio</Text>
      </View>

      <View /*Contenedor que guarda el scroll de las cards de servicios*/
        style={styles.scrollViewContainer}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        <ScrollView /*Scroll view donde se encuentran las cards*/
          style={styles.scrollView}
          contentContainerStyle={styles.containerCards}
          /*De aqui se saca el alto del content y se use el parametro para el scroll personalizado*/
          onContentSizeChange={(width,height) => setContentHeight(height)}
          /*Se agrega el event al contenedor Animated*/
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          /*Se oculta la scroll bar predeterminada*/
          showsVerticalScrollIndicator={false}
        >

          <HorizontalCard
            title="Electronica basica"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Iluminacion y señalizacion"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Sensores y sistemas de control"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Revision de direccion"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
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

// Hoja de estilos para el contenedor
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    width: '97%',
  },
  containerCards: {
    paddingBottom: 20,
  },
  titulo: {
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    width: '92%',
    maxHeight: '78%',
    position: 'relative',
  },
});
