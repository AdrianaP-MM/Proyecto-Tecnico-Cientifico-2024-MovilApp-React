// components/CarForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CarForm = ({ onSubmit }) => {
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [plate, setPlate] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = () => {
    const carData = { model, color, type, date, plate, image };
    onSubmit(carData);
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
      <View style={styles.imageInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="URL de la imagen"
          value={image}
          onChangeText={setImage}
        />
        <TouchableOpacity style={styles.imageButton} onPress={() => {}}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: image }} style={styles.previewImage} />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Guardar Carro</Text>
      </TouchableOpacity>
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
    borderRadius: 5,
  },
  imageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageButton: {
    marginLeft: 10,
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 5,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CarForm;
