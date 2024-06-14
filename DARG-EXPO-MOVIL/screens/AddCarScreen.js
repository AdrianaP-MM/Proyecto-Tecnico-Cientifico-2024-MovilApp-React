import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddCarScreen = ({ navigation }) => {
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [plate, setPlate] = useState('');
  const [image, setImage] = useState('');

  const handleAddCar = () => {
    // Lógica para agregar el carro
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Modelo automovil"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo automovil"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha vehiculo"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Placa automovil"
        value={plate}
        onChangeText={setPlate}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Guardar Carro" onPress={handleAddCar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default AddCarScreen;
