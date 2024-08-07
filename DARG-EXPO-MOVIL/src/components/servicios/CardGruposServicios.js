import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../utilidades/Text';
import Button from '../buttons/ButtonRojo';

const HorizontalCard = ({ title, imageUrl, idServiciosDisponibles }) => {
  const navigation = useNavigation();
  
 // Imprime el idServiciosDisponibles en la consola
 console.log('ID Servicios Disponibles:', idServiciosDisponibles);

  return (
    <View style={styles.horizontalCard}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.grup}>
          <Text texto='Nombre del grupo: ' fontSize={15} />
          <Text texto={`${title}`} font='PoppinsMedium' fontSize={15} />
        </View>
        <View style={styles.row}>
          <Button
            textoBoton='Ver servicio'
            fontSize={16}
            width='55%'
            accionBoton={() => navigation.navigate('Servicios', { title, idServiciosDisponibles })}
            marginTop={10}
            marginBottom={10}
          />
        </View>
      </View>
    </View>
  );
};

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
  row: {
    width: '100%',
    alignItems: 'center',
  },
  grup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});

export default HorizontalCard;
