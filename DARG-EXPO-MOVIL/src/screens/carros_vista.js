import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TarjetaCarro from '../components/carros/tarjeta_carro';
import Boton from '../components/buttons/btnRojo';
import Text from '../components/utilidades/text';

const CarrosVista = ({ navigation }) => {
  const [carros, setCarros] = useState([]);

  const agregarCarro = (carro) => {
    setCarros([...carros, carro]);
  };

  return (
    <View style={styles.container}>
      <Text texto='' font='PoppinsMedium' fontSize={25} />
      <Text texto='Citas' font='PoppinsMedium' fontSize={25} />
      <Boton
        title="Agregar"
        onPress={() => navigation.navigate('AgregarVehiculo', { agregarCarro })}
      />
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
    backgroundColor: 'white',
  },
  row: {
    justifyContent: 'space-between', // Distribuye los elementos uniformemente
  },
});

export default CarrosVista;
