// screens/MyCarsScreen.js
import React from 'react';
import { View, Button, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CarCard from '../components/CarCard';
import { Ionicons } from '@expo/vector-icons';

const cars = [
  { id: '1', model: 'Hyundai Elantra', plate: '999-999', image: 'https://example.com/car1.png'},
  { id: '2', model: 'Hyundai Elantra', plate: '999-999', image: 'https://example.com/car2.png' },
  { id: '3', model: 'Hyundai Elantra', plate: '999-999', image: 'https://example.com/car3.png' },
];

const MyCarsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCar')}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.addButtonText}>Agregar carros</Text>
      </TouchableOpacity>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarCard model={item.model} plate={item.plate} image={item.image} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default MyCarsScreen;
