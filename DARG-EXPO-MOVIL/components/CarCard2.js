import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CarCard2({ deleted, appointment }) {
  return (
    <View style={[styles.carCard, deleted && styles.deletedCard, appointment && styles.appointmentCard]}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.carImage} />
      <Text>Hyundai Bayon</Text>
      <Text>P222-222 - Color verde</Text>
      {deleted && <Text style={styles.deletedText}>ELIMINADO</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  carCard: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
  },
  appointmentCard: {
    width: '48%',
  },
  carImage: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  deletedText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
