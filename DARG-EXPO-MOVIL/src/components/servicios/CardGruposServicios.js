import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'; // Importa componentes necesarios de React Native
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación
import Text from '../utilidades/Text'; // Importa el componente de texto personalizado
import Button from '../buttons/ButtonRojo'; // Importa el componente de botón personalizado

// Componente funcional HorizontalCard
const HorizontalCard = ({ title, imageUrl, idServiciosDisponibles }) => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  // Imprime el idServiciosDisponibles en la consola para depuración
  //console.log('ID Servicios Disponibles:', idServiciosDisponibles);

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

// Estilos para la tarjeta horizontal
const styles = StyleSheet.create({
  horizontalCard: {
    width: '100%', /* Ancho completo de la tarjeta */
    borderRadius: 10, /* Bordes redondeados de la tarjeta */
    marginBottom: 16, /* Espacio inferior entre tarjetas */
    backgroundColor: '#fff', /* Color de fondo de la tarjeta */
    shadowColor: '#000', /* Color de la sombra de la tarjeta */
    shadowOffset: { width: 0, height: 2 }, /* Desplazamiento de la sombra */
    shadowOpacity: 0.8, /* Opacidad de la sombra */
    shadowRadius: 4, /* Radio de la sombra */
    elevation: 5, /* Elevación para sombra en Android */
  },
  cardImage: {
    width: '100%', /* Ancho completo de la imagen */
    height: 200, /* Altura fija de la imagen */
    borderTopLeftRadius: 10, /* Bordes redondeados superior izquierdo de la imagen */
    borderTopRightRadius: 10, /* Bordes redondeados superior derecho de la imagen */
    resizeMode: 'cover', /* Modo de redimensionamiento de la imagen */
  },
  cardContent: {
    padding: 16, /* Espacio interior del contenido de la tarjeta */
    flex: 1, /* Expande el contenido para llenar el espacio disponible */
    justifyContent: 'space-between', /* Espacia el contenido dentro del contenedor */
  },
  row: {
    width: '100%', /* Ancho completo del contenedor del botón */
    alignItems: 'center', /* Alinea el contenido al centro horizontalmente */
  },
  grup: {
    flexDirection: 'row', /* Alinea los elementos del grupo en una fila */
    flexWrap: 'wrap', /* Permite que los elementos se envuelvan a la siguiente línea si es necesario */
    width: '100%', /* Ancho completo del contenedor del grupo */
  },
});

export default HorizontalCard; // Exporta el componente para que pueda ser utilizado en otros archivos
