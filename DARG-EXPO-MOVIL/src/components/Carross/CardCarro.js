import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const TarjetaCarro = ({ carro, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: carro.imagen }} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.modelContainer}>
          <Text style={styles.modelText}>{carro.modelo}</Text>
        </View>
        <View style={styles.plateContainer}>
          <Text style={styles.plateText}>{carro.placa}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10, // Ajuste de borde redondeado
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
    borderWidth: 0, // Eliminado el borde rojo
    minWidth: 180,
  },
  image: {
    width: '100%',
    height: 120, // Ajuste de altura de la imagen
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 0, // Eliminada la línea superior
  },
  modelContainer: {
    backgroundColor: '#f4c4c4', // Color de fondo ajustado
    width: '100%',
    paddingVertical: 5, // Ajuste del relleno
    alignItems: 'center',
  },
  plateContainer: {
    backgroundColor: '#ffebeb', // Color de fondo ajustado para la parte inferior
    width: '100%',
    paddingVertical: 5, // Ajuste del relleno
    alignItems: 'center',
  },
  modelText: {
    fontWeight: 'bold',
    color: '#333', // Color de texto ajustado
    fontSize: 16, // Ajuste del tamaño de fuente
  },
  plateText: {
    color: '#333', // Color de texto ajustado
    fontSize: 14, // Ajuste del tamaño de fuente
  },
});

export default TarjetaCarro;
