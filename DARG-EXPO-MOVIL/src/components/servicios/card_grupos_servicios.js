import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
//Import de la navegacion para poder cambiar la pantalla
import { useNavigation } from '@react-navigation/native';

//Constante de la card de grupos de servicios
const HorizontalCard = ({ title, imageUrl }) => {
  //Constante para la navegacion para cambiar de pantalla
  const navigation = useNavigation();

  return (
    //Contenedor general de la card
    <View style={styles.horizontalCard}>
      
      <Image source={{ uri: imageUrl }} style={styles.cardImage} /*Imagen para la card de grupo de servicios*/ />

      <View style={styles.cardContent} /*Contenedor para el contenido de la card*/>
        <Text style={styles.cardTitle}>Nombre del grupo: {title}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Servicios', { title })}
        >
          <Text style={styles.buttonText}>Ver servicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Hoja de estilos especificos para la card
const styles = StyleSheet.create({
  horizontalCard: {
    width: '100%', 
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 200, 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '100%', 
    borderRadius: 5,
    backgroundColor: '#BA181B',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HorizontalCard;
