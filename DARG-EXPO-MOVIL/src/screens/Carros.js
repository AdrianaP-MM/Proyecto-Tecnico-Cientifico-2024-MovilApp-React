// Importa las dependencias necesarias
import React, { useState, useCallback, useEffect} from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TarjetaCarro from '../components/carros/CardCarro'; // Importa el componente TarjetaCarro
import Text from '../components/utilidades/Text'; // Importa el componente Text
import fetchData from '../utils/FetchData';
import * as contants from '../utils/Constantes';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect

// Componente principal de la vista de carros
const CarrosVista = ({ navigation }) => {
  const [carros, setCarros] = useState([]); // Estado para almacenar la lista de carros
  const API = 'automoviles.php';

  // Función para llenar los datos de los carros desde la base de datos
  const fillCardsCarsAll = async () => {
    try {
      const DATA = await fetchData(API, 'readAllMyCars');
      if (DATA.status) {
        const data = DATA.dataset.map(item => ({
          id_automovil: item.id_automovil,
          id_cliente: item.id_cliente,
          imagen: item.imagen_automovil,
          modelo: item.modelo_automovil,
          color: item.color_automovil,
          tipo: item.id_tipo_automovil,
          marca: item.id_marca_automovil,
          fecha: item.fecha_fabricacion_automovil,
          placa: item.placa_automovil
        }));
        setCarros(data);
      } else {
        console.log(DATA.error);
        setCarros([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setCarros([]);
    }
  };
  

  useFocusEffect(
    useCallback(() => {
      fillCardsCarsAll();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.contenedorTitulo}>
        <Text texto='Carros' font='PoppinsMedium' fontSize={25} />
        <TouchableOpacity onPress={() => navigation.navigate('AgregarVehiculo')}>
          <Image
            source={require('../images/icons/iconAdd.png')} // Ruta de la imagen del icono para agregar un carro
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={carros} // Datos para la lista
        renderItem={({ item }) => (
          <TarjetaCarro
            carro={item}
            cliente={item}
            onPress={() => navigation.navigate('InformacionCarro', { carro: item, cliente: item, })} // Navega a la información del carro al presionar
            
          />
        )}
        keyExtractor={(item) => item.placa} // Clave única para cada item basado en la placa del carro
        numColumns={2} // Número de columnas en la cuadrícula
        columnWrapperStyle={styles.row} // Estilo para las filas de la cuadrícula
      />
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe toda la pantalla
    padding: 10, // Añade espacio interno alrededor del contenido
    paddingHorizontal: 0, // Elimina el espacio horizontal interno
    marginTop: 20, // Añade un margen superior
    backgroundColor: '#F9FAFB', // Color de fondo
    paddingBottom: 80, // Padding adicional en la parte inferior
  },
  row: {
    justifyContent: 'space-between', // Distribuye los elementos uniformemente en la fila
    backgroundColor: 'white', // Color de fondo para las filas
  },
  contenedorTitulo: {
    width: '100%', // Ocupa todo el ancho disponible
    backgroundColor: '#F9FAFB', // Color de fondo
    flexDirection: 'row', // Disposición de los elementos en fila
    alignItems: 'center', // Alinea los elementos hijos verticalmente al centro
    justifyContent: 'flex-start', // Alinea los elementos al inicio
    marginVertical: 20, // Márgenes verticales
    paddingHorizontal: 15, // Espacio horizontal interno
  },
  image: {
    marginLeft: 10, // Margen a la izquierda de la imagen
    width: 40, // Ancho de la imagen
    height: 40, // Altura de la imagen
  },
});

export default CarrosVista; // Exporta el componente para su uso en otras partes de la aplicación
