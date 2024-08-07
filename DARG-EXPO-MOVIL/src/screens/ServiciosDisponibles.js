import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import HorizontalCard from '../components/servicios/CardGruposServicios';
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada';
import Text from '../components/utilidades/Text';
import fetchData from '../utils/FetchData';
import VerticalCard from '../components/servicios/CardServicios';

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [readOne, setreadOne] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { title, idServiciosDisponibles } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const selectServiciosDisponibles = async () => {
    const formData = new FormData();
    formData.append('id_tipo_servicio', idServiciosDisponibles); // Cambié title por idServiciosDisponibles

    try {
      const DATA = await fetchData('servicio.php', 'readOne', formData);
      console.log('RESPONSE:', DATA); // Imprime la respuesta para ver más detalles
      if (DATA.status) {
        const data = DATA.dataset.map(item => ({
          nombre: item.nombre_servicio,
          descripcion: item.descripcion_servicio,
          id: item.id_servicio
        }));
        setreadOne(data);
      } else {
        console.log(DATA.error);
        setreadOne([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setreadOne([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    selectServiciosDisponibles();
  }, []);

  const renderServiciosDisponibles = (servicios) => {
    return servicios.map((item) => (
      <VerticalCard 
        title={item.nombre} 
        tipo={item.descripcion}
        idServiciosDisponibles={item.id}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text texto={`Servicios: ${title}`} font='PoppinsMedium' fontSize={25} />
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Image
            source={require('../images/icons/btnBack.png')}
            style={{ width: 35, height: 27 }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={styles.scrollViewContainer}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.containerCards}
          onContentSizeChange={(width, height) => setContentHeight(height)}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          showsVerticalScrollIndicator={false}
        >
          {renderServiciosDisponibles(readOne)}
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
    marginBottom: 10,
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
    width: '92%',
    maxHeight: '78%',
    position: 'relative',
    marginBottom: 30,
  },
  scrollView: {
    width: '100%',
  },
  containerCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  infoContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    alignItems: 'center',
  },
});
