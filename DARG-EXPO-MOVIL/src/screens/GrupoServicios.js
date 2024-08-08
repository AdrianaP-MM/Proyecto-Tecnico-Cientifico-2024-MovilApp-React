import React, { useRef, useState, useEffect } from 'react'; // Importa hooks necesarios de React
import { StyleSheet, View, ScrollView, Animated, Button, TextInput } from 'react-native'; // Importa componentes de React Native
// Importa la card que se utiliza para mostrar el contenido
import HorizontalCard from '../components/servicios/CardGruposServicios';
// Importa la barra de scroll personalizada
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada';
import Text from '../components/utilidades/Text';
import fetchData from '../utils/FetchData';

export default function App() {
  // Refs para manejar el scroll y su valor animado
  const scrollY = useRef(new Animated.Value(0)).current;
  // Estados para manejar las dimensiones del contenido y del contenedor
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  // Estado para almacenar los datos obtenidos de la API
  const [readAll, setreadAll] = useState([]);

  // Función asíncrona para obtener datos de la API
  const selectGrupoServicios = async () => {
    try {
      const DATA = await fetchData('grupo_servicio.php', 'readAll'); // Llama a la función para obtener los datos
      if (DATA.status) {
        // Si la respuesta es exitosa, formatea los datos
        const data = DATA.dataset.map(item => ({
          nombre: item.nombre_tipo_servicio,
          id: item.id_tipo_servicio,
        }));
        setreadAll(data); // Actualiza el estado con los datos obtenidos
      } else {
        console.log(DATA.error); // Muestra el error en caso de fallo
        setreadAll([]); // Limpia el estado en caso de error
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Muestra error si ocurre algún problema en la solicitud
      setreadAll([]); // Limpia el estado en caso de error
    } finally {
      // Establece el estado de loading y refreshing como false (no están definidos en el código actual)
      setLoading(false);
      setRefreshing(false);
    }
  };

  // useEffect para llamar a la función selectGrupoServicios al montar el componente
  useEffect(() => {
    selectGrupoServicios();
  }, []);

  // Función para renderizar las tarjetas de servicios
  const renderServicios = (servicios) => {
    return servicios.map((servicio, index) => (
      <HorizontalCard
        key={index} // Utiliza index como clave (puede ser mejor usar un identificador único si está disponible)
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
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)} // Captura la altura del contenedor
      >
        <ScrollView /*Scroll view donde se encuentran las cards*/
          style={styles.scrollView}
          contentContainerStyle={styles.containerCards}
          /* Obtiene las dimensiones del contenido y ajusta el estado contentHeight */
          onContentSizeChange={(width, height) => setContentHeight(height)}
          /* Añade un listener para el scroll y actualiza el valor de scrollY */
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          /* Oculta la barra de scroll vertical predeterminada */
          showsVerticalScrollIndicator={false}
        >
          {renderServicios(readAll)} 
        </ScrollView>

        <CustomScrollBar /* Se agregan los parámetros que espera recibir la custom bar */
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
    flex: 1, /* Propiedad flex para hacer que el contenedor ocupe todo el espacio disponible */
    backgroundColor: '#F9FAFB', /* Color de fondo del contenedor */
    alignItems: 'center', /* Alinea los elementos hijos al centro horizontalmente */
    justifyContent: 'center', /* Alinea los elementos hijos al centro verticalmente */
  },
  scrollView: {
    width: '97%', /* Ancho del contenedor del scroll */
  },
  containerCards: {
    paddingBottom: 20, /* Espacio en la parte inferior del contenedor de las tarjetas */
  },
  titulo: {
    alignItems: 'flex-start', /* Alinea el título al inicio del contenedor */
    width: '100%', /* Ancho del contenedor del título */
    paddingHorizontal: 20, /* Espacio interior horizontal del contenedor del título */
    marginVertical: 20, /* Espacio vertical alrededor del contenedor del título */
  },
  scrollViewContainer: {
    width: '92%', /* Ancho del contenedor del scroll */
    maxHeight: '78%', /* Altura máxima del contenedor del scroll */
    position: 'relative', /* Posición relativa del contenedor del scroll */
  },
  inputContainer: {
    width: '100%', /* Ancho del contenedor del input */
    paddingHorizontal: 20, /* Espacio interior horizontal del contenedor del input */
    marginVertical: 20, /* Espacio vertical alrededor del contenedor del input */
    alignItems: 'center', /* Alinea los elementos hijos al centro horizontalmente */
  },
  input: {
    width: '100%', /* Ancho del input */
    padding: 10, /* Padding interno del input */
    borderWidth: 1, /* Ancho del borde del input */
    borderColor: '#ccc', /* Color del borde del input */
    borderRadius: 5, /* Radio del borde del input */
    marginBottom: 10, /* Margen inferior del input */
  },
});
