// primer_uso.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageCarousel from '../components/image_carousel';

const PrimerUso = () => {
  return (
    <View style={styles.container}>
      <ImageCarousel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrimerUso;
