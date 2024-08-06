import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';// 
import VerticalCard from '../components/servicios/CardServicios';
// Importa la scroll bar personalizada
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada';
import Text from '../components/utilidades/Text';
import { Config } from '../utils/Constantes'; //Importacion de la consntante IP
import fetchData from '../utils/FetchData';



export default function App() {
  // Constantes para ver las dimensiones para la barra de scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [readAll, setreadAll] = useState([]);

  //Constante de navegacion
  const navigation = useNavigation();

  // Función para manejar la acción de regresar
  const handleGoBack = () => {
    navigation.goBack(); // Navega a la pantalla anterior
  };

  const selectServiciosDisponibles = async () => {
    try {
      const DATA = await fetchData('servicio.php', 'readAll');
      if (DATA.status) {
        const data = DATA.dataset.map(item => ({
          nombre: item.nombre_tipo_servicio,
          descripcion: item.descripcion_servicio,
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
    selectServiciosDisponibles();
  }, []);

  const renderServicios = (servicios) => {
    return servicios.map((servicio, index) => (
      <VerticalCard
        key={index}
        titulo={servicio.nombre}
        tipo={servicio.descripcion}
        imageUrl={servicio.imageUrl} // Ajusta esto si tienes una URL de imagen en tus datos
      />
    ));
  };

  return (
    //Contenedor de la pantalla en general
    <View style={styles.container}>

      <View style={styles.titulo} /*Contenedor del titulo y del boton de regresar*/>
        <Text texto='Servicios' font='PoppinsMedium' fontSize={25} />

        <TouchableOpacity onPress={handleGoBack} style={styles.backButton} /*Boton de regresar*/>
          <Image
            source={require('../images/icons/btnBack.png')} // Ruta a tu imagen personalizada
            style={{ width: 35, height: 27 }} // Ajusta el tamaño según tus necesidades
          />
        </TouchableOpacity>

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

//Hoja de estilos la vista general de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1, /*Propiedad flex*/
    backgroundColor: '#F9FAFB', /*Fondo de color*/
    alignItems: 'center', /*Alinear verticalmente*/
    justifyContent: 'center', /*Alinear horizontalmente*/
    marginBottom: 10, /*Separacion inferior del contenedor*/
  },
  titulo: {
    flexDirection: 'row', /*Agrupar horizontalmente*/
    alignItems: 'center', /*Alinear verticalmente*/
    width: '100%', /*Ancho del titulo*/
    paddingHorizontal: 20, /*Separcion horzontal interior*/
    marginVertical: 20, /*Separacopm vertical del contenedor*/
  },
  backButton: {
    flexDirection: 'row', /*Ordenar horizontalmente*/
    alignItems: 'center', /*Alinear verticalmente*/
    marginLeft: 'auto', /*Separacion a la izquierda*/
    marginBottom: 20, /*Separacion inferior*/
  },
  backButtonText: {
    fontSize: 16, /*Tamaño de fuente*/
    marginLeft: 5, /*Separacion a la izquierda*/
  },
  scrollViewContainer: {
    width: '92%', /*Ancho del contenedor del scroll*/
    maxHeight: '78%', /*Altura maxima del contenedor*/
    position: 'relative', /*Posicion del contenedor*/
    marginBottom: 30, /*Separacion inferior*/
  },
  scrollView: {
    width: '100%', /*Ancho del contenedor scroll*/
  },
  containerCards: {
    flexDirection: 'row', /*Ordrnar horizontalmente*/
    flexWrap: 'wrap', /*Propiedad wrap*/
    justifyContent: 'space-around', /*Alinear a los extremos*/
  },
});
