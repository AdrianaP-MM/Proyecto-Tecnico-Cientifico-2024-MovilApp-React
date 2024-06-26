import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Boton from '../components/buttons/btnRojo'; // Importa el componente de botón personalizado
import TextC from '../components/utilidades/text'; // Importa un componente de texto personalizado (aunque no se usa en este componente)

const InformacionCarro = ({ route }) => {
  const { carro } = route.params; // Obtiene los parámetros de la ruta, específicamente el objeto 'carro'

  return (
    <View style={styles.container}>
      {/* Etiqueta y valor del modelo del carro */}
      <Text style={styles.label}>Modelo</Text>
      <Text style={styles.text}>{carro.modelo}</Text>
      
      {/* Etiqueta y valor del color del carro */}
      <Text style={styles.label}>Color</Text>
      <Text style={styles.text}>{carro.color}</Text>
      
      {/* Etiqueta y valor del tipo de automóvil */}
      <Text style={styles.label}>Tipo automovil</Text>
      <Text style={styles.text}>{carro.tipo}</Text>
      
      {/* Etiqueta y valor del año del automóvil */}
      <Text style={styles.label}>Año automovil</Text>
      <Text style={styles.text}>{carro.fecha}</Text>
      
      {/* Etiqueta y valor de la placa del carro */}
      <Text style={styles.label}>placa</Text>
      <Text style={styles.text}>{carro.placa}</Text>
      
      {/* Imagen del carro */}
      <Image source={{ uri: carro.imagen }} style={styles.image} />
      
      {/* Botón para modificar la información del carro */}
      <Boton title="Modificar" onPress={() => { /* Lógica para editar */ }} />
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    paddingBottom: 80, // Espacio adicional en la parte inferior
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centra el texto del título
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#666', // Color de texto gris
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'lightgray', // Color del borde del texto
    borderWidth: 1,
    borderRadius: 8,
    padding: 10, // Espacio interno en el texto
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10, // Espacio superior para la imagen
  },
});

export default InformacionCarro; // Exporta el componente para su uso en otras partes de la aplicación
