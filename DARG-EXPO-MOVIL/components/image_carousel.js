// image_carousel.js
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const ImageCarousel = () => {   
  const entries = [
    {
      title: 'Primera Imagen',
      text: 'Texto de la primera imagen',
    },
    {
      title: 'Segunda Imagen',
      text: 'Texto de la segunda imagen',
    },
    {
      title: 'Tercera Imagen',
      text: 'Texto de la tercera imagen',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.illustration} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <Carousel
      data={entries}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth * 0.75}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 250,
    padding: 10,
    marginLeft: 25,
    marginRight: 25,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ImageCarousel;
