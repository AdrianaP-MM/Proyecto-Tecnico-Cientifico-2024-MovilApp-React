// components/CarCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CarCard = ({ model, plate, image }) => {
  return (
    <View style={styles.carCard}>
      <Image source={{ uri: image }} style={styles.carImage} />
      <Text style={styles.carModel}>{model}</Text>
      <Text style={styles.carPlate}>{plate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  carCard: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffe6e6',  // Color de fondo
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  carModel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  carPlate: {
    color: '#555',
  },
});
export default CarCard;
