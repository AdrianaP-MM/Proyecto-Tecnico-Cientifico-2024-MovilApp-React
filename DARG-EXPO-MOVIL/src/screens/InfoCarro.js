import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Boton from '../components/buttons/ButtonRojo'; // Importa el componente de botón personalizado
import TextC from '../components/utilidades/Text'; // Importa un componente de texto personalizado (aunque no se usa en este componente)

const InformacionCarro = ({ route }) => {
  const { carro } = route.params; // Obtiene los parámetros de la ruta, específicamente el objeto 'carro'

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Modelo</Text>
      <Text style={styles.text}>{carro.modelo}</Text>

      <Text style={styles.label}>Color</Text>
      <Text style={styles.text}>{carro.color}</Text>

      <Text style={styles.label}>Tipo automóvil</Text>
      <Text style={styles.text}>{carro.tipo}</Text>

      <Text style={styles.label}>Año automóvil</Text>
      <Text style={styles.text}>{carro.fecha}</Text>

      <Text style={styles.label}>Placa</Text>
      <Text style={styles.text}>{carro.placa}</Text>

      <Image source={{ uri: carro.imagen }} style={styles.image} />

      <Boton textoBoton="Modificar" accionBoton={() => { /* Lógica para editar */ }} />
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    paddingBottom: 100, // Espacio adicional en la parte inferior
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
    height: 150,
    borderRadius: 10,
    marginTop: 10, // Espacio superior para la imagen
  },
});

export default InformacionCarro; // Exporta el componente para su uso en otras partes de la aplicación
