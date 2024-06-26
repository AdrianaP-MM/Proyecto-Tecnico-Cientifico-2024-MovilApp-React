// Importa las dependencias necesarias
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TarjetaCarro from '../components/carros/tarjeta_carro'; // Importa el componente TarjetaCarro
import Text from '../components/utilidades/text'; // Importa el componente Text

// Componente principal de la vista de carros
const CarrosVista = ({ navigation }) => {
  const [carros, setCarros] = useState([]); // Estado para almacenar la lista de carros

  // Función para agregar un nuevo carro a la lista
  const agregarCarro = (carro) => {
    setCarros([...carros, carro]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenedorTitulo}>
        <Text texto='Carros' font='PoppinsMedium' fontSize={25} /> // Título de la pantalla
        <TouchableOpacity onPress={() => navigation.navigate('AgregarVehiculo', { agregarCarro })}>
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
            onPress={() => navigation.navigate('InformacionCarro', { carro: item })} // Navega a la información del carro al presionar
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
