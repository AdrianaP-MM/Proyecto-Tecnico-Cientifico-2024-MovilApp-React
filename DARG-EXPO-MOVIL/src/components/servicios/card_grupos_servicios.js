import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
//Import de la navegacion para poder cambiar la pantalla
import { useNavigation } from '@react-navigation/native';
import Text from '../utilidades/text';
import Button from '../buttons/btnRojo';

//Constante de la card de grupos de servicios
const HorizontalCard = ({ title, imageUrl }) => {
  //Constante para la navegacion para cambiar de pantalla
  const navigation = useNavigation();

  return (
    //Contenedor general de la card
    <View style={styles.horizontalCard}>
      <Image source={{ uri: imageUrl }} style={styles.cardImage} /*Imagen para la card de grupo de servicios*/ />
      <View style={styles.cardContent} /*Contenedor para el contenido de la card*/>
        <View style={styles.grup}>
          <Text texto='Nombre del grupo: ' fontSize={15} />
          <Text texto={`${title}`} font='PoppinsMedium' fontSize={15} />
        </View>
        <View style={styles.row}>
          <Button textoBoton='Ver servicio' fontSize={16} width='55%' accionBoton={() => navigation.navigate('Servicios', { title })}
            marginTop={10} marginBottom={10} />
        </View>
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
