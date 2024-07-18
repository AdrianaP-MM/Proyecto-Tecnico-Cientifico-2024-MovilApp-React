// AgregarVehiculo.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../components/buttons/ButtonRojo'; // Importa el componente de botón personalizado
import Input from '../components/inputs/AllBorder'; // Importa el componente de entrada personalizado

// URL de la imagen predeterminada
const defaultImageUrl = 'https://th.bing.com/th/id/OIP.xxMt6xG7kaLu7P6llDKWyAHaEK?w=318&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7';

const AgregarVehiculo = ({ navigation, route }) => {
  const { agregarCarro } = route.params; // Obtiene la función agregarCarro desde los parámetros de la ruta
  const [modelo, setModelo] = useState(''); // Estado para el modelo del carro
  const [color, setColor] = useState(''); // Estado para el color del carro
  const [tipo, setTipo] = useState(''); // Estado para el tipo del carro
  const [fecha, setFecha] = useState(''); // Estado para la fecha del carro
  const [placa, setPlaca] = useState(''); // Estado para la placa del carro
  const [imagen, setImagen] = useState(defaultImageUrl); // Estado para la imagen del carro, con una imagen predeterminada

  // Función para manejar la acción de guardar el carro
  const handleGuardarCarro = () => {
    const nuevoCarro = { modelo, color, tipo, fecha, placa, imagen }; // Crea un nuevo objeto carro con los estados actuales
    agregarCarro(nuevoCarro); // Llama a la función para agregar el carro
    navigation.goBack(); // Navega hacia atrás
  };

  // Función para manejar la acción de agregar una imagen (lógica no implementada)
  const handleAgregarImagen = () => {
    // Lógica para agregar imagen
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Modelo automóvil"
        value={modelo}
        onChangeText={setModelo} // Actualiza el estado del modelo
      />
      <Input
        placeholder="Color"
        value={color}
        onChangeText={setColor} // Actualiza el estado del color
      />
      <Input
        placeholder="Tipo automóvil"
        value={tipo}
        onChangeText={setTipo} // Actualiza el estado del tipo
      />
      <Input
        placeholder="Fecha vehículo"
        value={fecha}
        onChangeText={setFecha} // Actualiza el estado de la fecha
      />
      <Input
        placeholder="Placa automóvil"
        value={placa}
        onChangeText={setPlaca} // Actualiza el estado de la placa
      />
      <TouchableOpacity style={styles.imageButton} onPress={handleAgregarImagen}>
        <Text style={styles.imageButtonText}>Agregar imagen</Text>
        <Text style={styles.imageButtonPlus}>+</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imagen }} style={styles.image} /> 
        <Text>{imagen.split('/').pop()}</Text> 
      </View>
      <Button textoBoton='Guardar' accionBoton={handleGuardarCarro}/> 
    </View>
  );
};

// Estilos para el componente
const styles = StyleSheet.create({
  container: { // Estilo para el contenedor principal
    flex: 1, // Hace que el contenedor ocupe toda la pantalla
    padding: 20, // Añade espacio interno alrededor del contenido
    backgroundColor: 'white', // Color de fondo blanco
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  title: { // Estilos para el título (no utilizado en el código actual)
    fontSize: 24, // Tamaño de la fuente del título
    fontWeight: 'bold', // Hace que el texto sea negrita
    marginBottom: 20, // Espacio debajo del título
    textAlign: 'center', // Centra el texto horizontalmente
  },
  imageButton: { // Estilos para el botón de agregar imagen
    flexDirection: 'row', // Dispone los hijos en una fila
    alignItems: 'center', // Alinea los elementos hijos verticalmente al centro
    borderColor: 'lightgray', // Color del borde del botón
    borderWidth: 1, // Ancho del borde del botón
    borderRadius: 8, // Bordes redondeados
    padding: 10, // Espacio interno del botón
    marginBottom: 12, // Espacio debajo del botón
    backgroundColor: 'white', // Color de fondo blanco
  },
  imageButtonText: { // Estilos para el texto del botón de agregar imagen
    flex: 1, // Hace que el texto ocupe todo el espacio disponible
    fontSize: 16, // Tamaño de la fuente del texto
  },
  imageButtonPlus: { // Estilos para el símbolo más del botón de agregar imagen
    fontSize: 24, // Tamaño de la fuente del símbolo más
    fontWeight: 'bold', // Hace que el símbolo más sea negrita
    color: 'gray', // Color del símbolo más
  },
  imageContainer: { // Estilos para el contenedor de la imagen
    flexDirection: 'row', // Dispone los hijos en una fila
    alignItems: 'center', // Alinea los elementos hijos verticalmente al centro
    marginBottom: 12, // Espacio debajo del contenedor de la imagen
  },
  image: { // Estilos para la imagen
    width: 60, // Ancho de la imagen
    height: 60, // Altura de la imagen
    borderRadius: 8, // Bordes redondeados
    marginRight: 10, // Espacio a la derecha de la imagen
  },
});

export default AgregarVehiculo; // Exporta el componente para su uso en otras partes de la aplicación
