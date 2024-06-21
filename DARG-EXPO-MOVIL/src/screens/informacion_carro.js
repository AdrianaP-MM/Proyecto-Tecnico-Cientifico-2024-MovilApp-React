import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Boton from '../components/buttons/btnRojo';
import TextC from '../components/utilidades/text';

const InformacionCarro = ({ route }) => {
  const { carro } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>hiundai elantra</Text>
      <Text style={styles.text}>{carro.modelo}</Text>
      <Text style={styles.label}>Rojo</Text>
      <Text style={styles.text}>{carro.color}</Text>
      <Text style={styles.label}>Tipo automovil</Text>
      <Text style={styles.text}>{carro.tipo}</Text>
      <Text style={styles.label}>2008</Text>
      <Text style={styles.text}>{carro.fecha}</Text>
      <Text style={styles.label}>999-999</Text>
      <Text style={styles.text}>{carro.placa}</Text>
      <Image source={{ uri: carro.imagen }} style={styles.image} />
      <Boton title="Modificar" onPress={() => { /* Lógica para editar */ }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#666',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default InformacionCarro;
