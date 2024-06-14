import React from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet } from 'react-native';

const cars = [
  { id: '1', model: 'Hyundai Elantra', plate: '999-999', image: 'https://example.com/car1.png' },
  { id: '2', model: 'Hyundai Elantra', plate: '999-999', image: 'https://example.com/car2.png' },
  { id: '3', model: 'Hyundai Elantra', plate: '999-999', image: 'https://example.com/car3.png' },
];

const MyCarsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Agregar carros" onPress={() => navigation.navigate('AddCar')} />
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.carCard}>
            <Image source={{ uri: item.image }} style={styles.carImage} />
            <Text>{item.model}</Text>
            <Text>{item.plate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  carCard: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  carImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default MyCarsScreen;
