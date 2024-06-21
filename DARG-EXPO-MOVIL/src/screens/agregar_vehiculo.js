// AgregarVehiculo.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Boton from '../components/Buttons/boton';
import Input from '../components/inputs/allBorder';

const defaultImageUrl = 'https://th.bing.com/th/id/OIP.xxMt6xG7kaLu7P6llDKWyAHaEK?w=318&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'; // URL de la imagen predeterminada

const AgregarVehiculo = ({ navigation, route }) => {
  const { agregarCarro } = route.params;
  const [modelo, setModelo] = useState('');
  const [color, setColor] = useState('');
  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState('');
  const [placa, setPlaca] = useState('');
  const [imagen, setImagen] = useState(defaultImageUrl); // Usa la imagen predeterminada

  const handleGuardarCarro = () => {
    const nuevoCarro = { modelo, color, tipo, fecha, placa, imagen };
    agregarCarro(nuevoCarro);
    navigation.goBack();
  };

  const handleAgregarImagen = () => {
    // Lógica para agregar imagen
  };

  return (
    <View style={styles.container}>

      <Input
        placeholder="Modelo automóvil"
        value={modelo}
        onChangeText={setModelo}
      />
      <Input
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <Input
        placeholder="Tipo automóvil"
        value={tipo}
        onChangeText={setTipo}
      />
      <Input
        placeholder="Fecha vehículo"
        value={fecha}
        onChangeText={setFecha}
      />
      <Input
        placeholder="Placa automóvil"
        value={placa}
        onChangeText={setPlaca}
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleAgregarImagen}>
        <Text style={styles.imageButtonText}>Agregar imagen</Text>
        <Text style={styles.imageButtonPlus}>+</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagen }} style={styles.image} />
        <Text>{imagen.split('/').pop()}</Text>
      </View>
      <Boton title="Guardar" onPress={handleGuardarCarro} />
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
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  imageButtonText: {
    flex: 1,
    fontSize: 16,
  },
  imageButtonPlus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default AgregarVehiculo;
