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
    width: '100%', /*Ancho de la card*/
    borderRadius: 10, /*Borde redondeado de la card*/
    marginBottom: 16, /*Separacion inferior entre cards*/
    backgroundColor: '#fff', /*Fondo de color de la card*/
    shadowColor: '#000', /*Color de la sombra*/
    shadowOffset: { width: 0, height: 2 }, /*Orientacion de la sombra*/
    shadowOpacity: 0.8, /*Opacidad de la sombra*/
    shadowRadius: 4, /*Borde redondeado de la sombra*/
    elevation: 5, /*Dispersion de la sombra*/
  },
  cardImage: {
    width: '100%', /*Ancho de la imagen de la card*/
    height: 200, /*Alto de la imagen de la card*/
    borderTopLeftRadius: 10, /*Borde superior izquierdo redondeado*/
    borderTopRightRadius: 10, /*Borde superior derecho redondeado*/
    resizeMode: 'cover', /*Forma de contener la imagen*/
  }, 
  cardContent: {
    padding: 16, /*Separacion interior del contenido*/
    flex: 1, /*Propiedad flex*/
    justifyContent: 'space-between', /*Contenido alienado a los extremos*/
  },
  row: {
    width: '100%', /*Ancho del contenedor del boton*/
    alignItems: 'center', /*Alinear el contenido verticalmente*/
  },
  grup: {
    flexDirection: 'row', /*Contenido alineado horizontalmente*/
    flexWrap: 'wrap', /*Propiedad wrap*/
    width: '100%', /*Ancho del contenedor del nombre del grupo*/
  },
});

export default HorizontalCard;
