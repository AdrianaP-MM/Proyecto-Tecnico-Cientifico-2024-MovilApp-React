// components/Carousel.js
import * as React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const { width } = Dimensions.get('window');

const data = [
  { title: 'Slide 1', description: 'Description for slide 1', color: '#f54242' },
  { title: 'Slide 2', description: 'Description for slide 2', color: '#f5a442' },
  { title: 'Slide 3', description: 'Description for slide 3', color: '#f5d142' },
];

export default function Carousel() {
  return (
    <FlatList
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Card style={[styles.card, { backgroundColor: item.color }]}>
          <Card.Content>
            <Title>{item.title}</Title>
            <Paragraph>{item.description}</Paragraph>
          </Card.Content>
        </Card>
      )}
      keyExtractor={(item) => item.title}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40, // Ajusta el ancho para que quepa en la pantalla con un margen
    margin: 20,
    borderRadius: 10,
  },
});
