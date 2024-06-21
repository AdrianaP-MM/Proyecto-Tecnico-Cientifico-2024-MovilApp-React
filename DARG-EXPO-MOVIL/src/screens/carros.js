import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TarjetaCarro from '../components/carros/tarjeta_carro';
import Text from '../components/utilidades/text';

const CarrosVista = ({ navigation }) => {
  const [carros, setCarros] = useState([]);

  const agregarCarro = (carro) => {
    setCarros([...carros, carro]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenedorTitulo}>
        <Text texto='Carros' font='PoppinsMedium' fontSize={25} />
        <TouchableOpacity onPress={() => navigation.navigate('AgregarVehiculo', { agregarCarro })}>
          <Image
            source={require('../images/icons/iconAdd.png')} // Ruta de tu imagen
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={carros}
        renderItem={({ item }) => (
          <TarjetaCarro
            carro={item}
            onPress={() => navigation.navigate('InformacionCarro', { carro: item })}
          />
        )}
        keyExtractor={(item) => item.placa}
        numColumns={2}
        columnWrapperStyle={styles.row} // Ajusta los elementos en una fila
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 0,
    marginTop: 20,
    backgroundColor: '#F9FAFB',
  },
  row: {
    justifyContent: 'space-between', // Distribuye los elementos uniformemente
    backgroundColor: 'white',
  },
  contenedorTitulo: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  image: {
    marginLeft: 10,
    width: 40,
    height: 40,
  },
});

export default CarrosVista;
