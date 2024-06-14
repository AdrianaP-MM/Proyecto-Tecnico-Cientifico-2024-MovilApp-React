// screens/AddCarScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CarForm from '../components/CarForm';

const AddCarScreen = ({ navigation }) => {
  const handleAddCar = (carData) => {
    // Lógica para agregar el carro
    console.log(carData);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CarForm onSubmit={handleAddCar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default AddCarScreen;
