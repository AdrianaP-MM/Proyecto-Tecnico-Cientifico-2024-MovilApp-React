import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TarjetaCarro = ({ carro, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: carro.imagen }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.modelText}>{carro.modelo}</Text>
        <Text style={styles.plateText}>{carro.placa}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
    flex: 1,
    maxWidth: '45%',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f44c4c', // Bordes más llamativos en rojo
  },
  image: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    backgroundColor: '#f44c4c', // Rojo vibrante
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  modelText: {
    fontWeight: 'bold',
    color: 'white', // Texto en blanco para contraste
    fontSize: 20,
    marginBottom: 5,
  },
  plateText: {
    color: 'white', // Texto en blanco para contraste
    fontSize: 16,
  },
});

export default TarjetaCarro;
