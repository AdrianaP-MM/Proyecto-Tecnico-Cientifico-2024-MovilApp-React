import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Image } from 'react-native'; // Importa componentes necesarios de React Native
import { useNavigation, useRoute } from '@react-navigation/native'; // Importa hooks de navegación
import HorizontalCard from '../components/servicios/CardGruposServicios'; // Importa componente para tarjetas horizontales
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada'; // Importa la barra de scroll personalizada
import Text from '../components/utilidades/Text'; // Importa el componente de texto personalizado
import fetchData from '../utils/FetchData'; // Importa la función para obtener datos de la API
import VerticalCard from '../components/servicios/CardServicios'; // Importa componente para tarjetas verticales

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current; // Ref para manejar el valor del scroll animado
  const [contentHeight, setContentHeight] = useState(0); // Estado para manejar la altura del contenido
  const [containerHeight, setContainerHeight] = useState(0); // Estado para manejar la altura del contenedor
  const [readOne, setreadOne] = useState([]); // Estado para almacenar los datos de los servicios disponibles
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga
  const [refreshing, setRefreshing] = useState(false); // Estado para manejar el estado de actualización

  const navigation = useNavigation(); // Hook para navegación
  const route = useRoute(); // Hook para obtener parámetros de la ruta
  const { title, idServiciosDisponibles } = route.params; // Extrae parámetros de la ruta

  // Función para navegar hacia atrás
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Función para obtener los servicios disponibles desde la API
  const selectServiciosDisponibles = async () => {
    const formData = new FormData();
    formData.append('id_tipo_servicio', idServiciosDisponibles); // Cambió title por idServiciosDisponibles

    try {
      const DATA = await fetchData('servicio.php', 'readOne', formData); // Llama a la función para obtener los datos
      console.log('RESPONSE:', DATA); // Imprime la respuesta para depuración
      if (DATA.status) {
        // Si la respuesta es exitosa, formatea los datos
        const data = DATA.dataset.map(item => ({
          nombre: item.nombre_servicio,
          descripcion: item.descripcion_servicio,
          id: item.id_servicio
        }));
        setreadOne(data); // Actualiza el estado con los datos obtenidos
      } else {
        console.log(DATA.error); // Muestra el error si ocurre un problema
        setreadOne([]); // Limpia el estado en caso de error
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Muestra error si ocurre un problema en la solicitud
      setreadOne([]); // Limpia el estado en caso de error
    } finally {
      setLoading(false); // Indica que la carga ha terminado
      setRefreshing(false); // Indica que la actualización ha terminado
    }
  };

  // useEffect para llamar a selectServiciosDisponibles al montar el componente
  useEffect(() => {
    selectServiciosDisponibles();
  }, []);

  // Función para renderizar las tarjetas verticales de servicios
  const renderServiciosDisponibles = (servicios) => {
    return servicios.map((item) => (
      <VerticalCard
        key={item.id} // Utiliza el id como clave para evitar advertencias de React
        title={item.nombre}
        tipo={item.descripcion}
        idServiciosDisponibles={item.id}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text texto={`Servicios: ${title}`} font='PoppinsMedium' fontSize={25} color='white' />
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Image
            source={require('../images/icons/btnBack.png')} // Imagen del botón de retroceso
            style={{ width: 35, height: 27, zIndex: 3}} // Estilo de la imagen
            tintColor='white'
          />
        </TouchableOpacity>
        <Image
          source={require('../images/panelPrincipal/backImage.png')}
          style={styles.headerImage} />
      </View>

      <View
        style={styles.scrollViewContainer}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.containerCards} // Estilo para el contenedor de tarjetas
          onContentSizeChange={(width, height) => setContentHeight(height)}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false, // No utiliza el controlador nativo para la animación
          })}
          showsVerticalScrollIndicator={false} // Oculta la barra de scroll vertical predeterminada
        >
          {renderServiciosDisponibles(readOne)}
        </ScrollView>

        <CustomScrollBar
          scrollY={scrollY} // Valor del scroll animado
          contentHeight={contentHeight} // Altura del contenido
          containerHeight={containerHeight} // Altura del contenedor
        />
      </View>
    </View>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1, /* Expande el contenedor para llenar todo el espacio disponible */
    backgroundColor: '#F9FAFB', /* Color de fondo del contenedor */
    alignItems: 'center', /* Alinea los elementos hijos al centro horizontalmente */
    justifyContent: 'center', /* Alinea los elementos hijos al centro verticalmente */
    marginBottom: 10, /* Espacio en la parte inferior del contenedor */
    position: 'relative',
  },
  titulo: {
    flexDirection: 'row', /* Alinea los elementos en una fila */
    alignItems: 'center', /* Alinea los elementos hijos al centro verticalmente */
    width: '100%', /* Ancho completo del contenedor del título */
    paddingHorizontal: 20, /* Espacio interior horizontal del contenedor del título */
    marginTop: -160,  /* Ajusta el margen superior del título */
    marginBottom: 20, /* Espacio en la parte inferior del título */
    position: 'relative',
    
  },
  backButton: {
    flexDirection: 'row', /* Alinea los elementos del botón en una fila */
    alignItems: 'center', /* Alinea el botón al centro verticalmente */
    marginLeft: 'auto', /* Empuja el botón hacia la derecha */
    marginBottom: 20, /* Espacio en la parte inferior del botón */
    marginTop: -55,  /* Ajusta el margen superior del botón */
    zIndex: 3,
  },
  backButtonText: {
    fontSize: 16, /* Tamaño de fuente del texto del botón */
    marginLeft: 5, /* Espacio a la izquierda del texto del botón */
  },
  scrollViewContainer: {
    width: '92%', /* Ancho del contenedor del scroll */
    maxHeight: '78%', /* Altura máxima del contenedor del scroll */
    position: 'relative', /* Posición relativa para la barra de scroll personalizada */
    marginBottom: 30, /* Espacio en la parte inferior del contenedor del scroll */
  },
  scrollView: {
    width: '100%', /* Ancho completo del scroll */
  },
  containerCards: {
    flexDirection: 'row', /* Alinea las tarjetas en una fila */
    flexWrap: 'wrap', /* Permite que las tarjetas se envuelvan a la siguiente línea */
    justifyContent: 'space-around', /* Espacia las tarjetas equitativamente */
  },
  infoContainer: {
    margin: 20, /* Espacio alrededor del contenedor de información */
    padding: 10, /* Espacio interior del contenedor de información */
    backgroundColor: '#FFF', /* Color de fondo del contenedor de información */
    borderRadius: 8, /* Bordes redondeados del contenedor de información */
    alignItems: 'center', /* Alinea los elementos hijos al centro horizontalmente */
  },
  headerImage: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
  },
});
