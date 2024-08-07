import React, { useRef, useState, useEffect } from 'react'; // Asegúrate de incluir useEffect aquí
import { StyleSheet, View, ScrollView, Animated, Button, TextInput } from 'react-native';
// Importa la card que se utiliza para mostrar el contenido
import HorizontalCard from '../components/servicios/CardGruposServicios';
// Importa la barra de scroll personalizada
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada';
import Text from '../components/utilidades/Text';
import fetchData from '../utils/FetchData';

export default function App() {
  // Constantes para ver las dimensiones para la barra de scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [readAll, setreadAll] = useState([]);

  const selectGrupoServicios = async () => {
    try {
      const DATA = await fetchData('grupo_servicio.php', 'readAll');
      if (DATA.status) {
        const data = DATA.dataset.map(item => ({
          nombre: item.nombre_tipo_servicio,
          id: item.id_tipo_servicio,
        }));
        setreadAll(data);
      } else {
        console.log(DATA.error);
        setreadAll([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setreadAll([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    selectGrupoServicios();
  }, []);

  const renderServicios = (servicios) => {
    return servicios.map((servicio, index) => (
      <HorizontalCard
        key={index}
        title={servicio.nombre}
        idServiciosDisponibles={servicio.id}
      />
    ));
  };

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
          /*De aqui se saca el alto del content y se usa el parametro para el scroll personalizado*/
          onContentSizeChange={(width, height) => setContentHeight(height)}
          /*Se agrega el event al contenedor Animated*/
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          /*Se oculta la scroll bar predeterminada*/
          showsVerticalScrollIndicator={false}
        />

        <ScrollView>
          {renderServicios(readAll)}
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
    justifyContent: 'center', /*Alinear al centro horizontalmente*/
  },
  scrollView: {
    width: '97%', /*Ancho del contenedor scroll*/
  },
  containerCards: {
    paddingBottom: 20, /*Separación inferior del contenedor de las cards*/
  },
  titulo: {
    alignItems: 'flex-start', /*Alinear al inicio*/
    width: '100%', /*Ancho del título*/
    paddingHorizontal: 20, /*Separación interior del título*/
    marginVertical: 20, /*Separación vertical del título*/
  },
  scrollViewContainer: {
    width: '92%', /*Ancho del contenedor scroll*/
    maxHeight: '78%', /*Alto máximo del contenedor scroll*/
    position: 'relative', /*Posición del contenedor scroll*/
  },
  inputContainer: {
    width: '100%', /*Ancho del contenedor del input*/
    paddingHorizontal: 20, /*Separación horizontal del contenedor del input*/
    marginVertical: 20, /*Separación vertical del contenedor del input*/
    alignItems: 'center', /*Alinear al centro*/
  },
  input: {
    width: '100%', /*Ancho del input*/
    padding: 10, /*Padding del input*/
    borderWidth: 1, /*Ancho del borde del input*/
    borderColor: '#ccc', /*Color del borde del input*/
    borderRadius: 5, /*Radio del borde del input*/
    marginBottom: 10, /*Margen inferior del input*/
  },
});
