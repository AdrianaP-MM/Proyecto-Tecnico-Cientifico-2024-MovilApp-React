import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
// Importa la card que se utiliza para mostrar el contenido
import HorizontalCard from '../components/servicios/CardGruposServicios';
// Importa la barra de scroll personalizada
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada';
import Text from '../components/utilidades/Text';

export default function App() {
  // Constantes para ver las dimensiones para la barra de scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  return (
    // Container principal de pantalla
    <View style={styles.container}>
      <View style={styles.titulo} /*Contenedor del titulo de la pantalla*/>
        <Text texto='Grupos de servicio' font='PoppinsMedium' fontSize={25} />
      </View>

      <View /*Contenedor que guarda el scroll de las cards de servicios*/
        style={styles.scrollViewContainer}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        <ScrollView /*Scroll view donde se encuentran las cards*/
          style={styles.scrollView}
          contentContainerStyle={styles.containerCards}
          /*De aqui se saca el alto del content y se use el parametro para el scroll personalizado*/
          onContentSizeChange={(width, height) => setContentHeight(height)}
          /*Se agrega el event al contenedor Animated*/
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          /*Se oculta la scroll bar predeterminada*/
          showsVerticalScrollIndicator={false}
        >

          <HorizontalCard
            title="Electrónica básica"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Iluminación y señalización"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Sensores y sistemas de control"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Revisión de dirección"
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
    flex: 1, /*Propiedad flex*/
    backgroundColor: '#F9FAFB', /*Fondo del contenedor*/
    alignItems: 'center', /*Alinear al centro verticalmente*/
    justifyContent: 'center', /*Alinear al centro horizontamente*/
  },
  scrollView: {
    width: '97%', /*Ancho del contenedor scroll*/
  },
  containerCards: {
    paddingBottom: 20, /*Separacion inferior del contendor de las cards*/
  },
  titulo: {
    alignItems: 'flex-start', /*Alinear a inicio*/
    width: '100%', /*Ancho del titulo*/
    paddingHorizontal: 20, /*Separacion interior del titulo*/
    marginVertical: 20, /*Separacion vertical del titulo*/
  },
  scrollViewContainer: {
    width: '92%', /*Ancho del contenedor scroll*/
    maxHeight: '78%', /*Alto Maximo del contenedor scroll*/
    position: 'relative', /*Posicion del contenedor scroll*/
  },
});
