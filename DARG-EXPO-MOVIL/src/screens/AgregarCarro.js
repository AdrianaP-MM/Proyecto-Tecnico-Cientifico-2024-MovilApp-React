import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/buttons/ButtonRojo'; // Importa el componente de botón personalizado
import Input from '../components/inputs/AllBorder'; // Importa el componente de entrada personalizado
import CustomPicker from '../components/inputs/ComboBox'; // Importa el componente de selección personalizada
import fetchData from '../utils/FetchData'; // Asegúrate de que esta función esté bien definida

const colores = [
  { label: 'Colores', value: '' },
  { label: 'Rojo', value: 'Rojo' },
  { label: 'Azul', value: 'Azul' },
  { label: 'Gris', value: 'Gris' },
  { label: 'Blanco', value: 'Blanco' },
  { label: 'Negro', value: 'Negro' },
  { label: 'Amarillo', value: 'Amarillo' },
  { label: 'Verde', value: 'Verde' },
  { label: 'Anaranjado', value: 'Anaranjado' },
  { label: 'Tornasol', value: 'Tornasol' },
  { label: 'Plata', value: 'Plata' },
];

const AgregarVehiculo = ({ navigation }) => {
  const [modelo, setModelo] = useState(''); // Estado para el modelo del carro
  const [color, setColor] = useState(''); // Estado para el color del carro
  const [fecha, setFechaFabricacion] = useState(''); // Estado para la fecha del carro
  const [placa, setPlaca] = useState(''); // Estado para la placa del carro
  const [imagen, setImagen] = useState(null); // Estado para la imagen del carro
  const [tipoAutomovil, setTipoAutomovil] = useState('');
  const [marcaAutomovil, setMarcaAutomovil] = useState('') // Estado para el tipo de automóvil
  const [pickerValuesMarca, setPickerValuesMarca] = useState([]);
  const [pickerValuesTipos, setPickerValuesTipos] = useState([]); // Estado para los valores del picker 

  const API = 'automoviles.php'; // URL del servidor

  const fetchTiposAutomovil = async () => {
    try {
      const responseTiposAutomoviles = await fetchData(API, 'readTipos');
      if (responseTiposAutomoviles.status) {
        setPickerValuesTipos(responseTiposAutomoviles.dataset.map(item => ({
          label: item.nombre_tipo_automovil, // Asegúrate de que el campo nombre sea correcto
          value: item.id_tipo_automovil, // Asegúrate de que el campo id sea correcto
        })));
      } else {
        Alert.alert('Error', `${responseTiposAutomoviles.error}` + '. Es necesario registrar un automóvil antes de agendar una cita.');
      }
    } catch (error) {
      console.error('Error en leer los elementos:', error);
      Alert.alert('Error', 'Hubo un error.');
    }
  };
 
  const fetchMarcasAutomovil = async () => {
    try {
      const responseMarcasAutomoviles = await fetchData(API, 'readMarcas');
      if (responseMarcasAutomoviles.status) {
        setPickerValuesMarca(responseMarcasAutomoviles.dataset.map(item => ({
          label: item.nombre_marca_automovil, // Asegúrate de que el campo nombre sea correcto
          value: item.id_marca_automovil, // Asegúrate de que el campo id sea correcto
        })));
      } else {
        Alert.alert('Error', `${responseMarcasAutomoviles.error}` + '. Es necesario registrar un automóvil antes de agendar una cita.');
      }
    } catch (error) {
      console.error('Error en leer los elementos:', error);
      Alert.alert('Error', 'Hubo un error.');
    }
  };
  


  useEffect(() => {
    fetchTiposAutomovil();
    fetchMarcasAutomovil();
  }, []);

  // Solicita permisos y abre la galería de imágenes
  const handleAgregarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso de cámara', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri); // Actualiza el estado con la imagen seleccionada
    }
  };

  // Función para manejar la acción de guardar el carro
  const handleGuardarCarro = async () => {
    if (!modelo || !color || !tipoAutomovil || !marcaAutomovil || !fecha || !placa || !imagen) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    }
  
    // Creamos un objeto FormData para enviar los datos al servidor
    const formData = new FormData();
    formData.append('modelo_automovil', modelo);
    formData.append('color_automovil', color);
    formData.append('id_tipo_automovil', tipoAutomovil);
    formData.append('fecha_fabricacion_automovil', fecha);
    formData.append('placa_automovil', placa);
    formData.append('id_marca_automovil', marcaAutomovil);
  
    if (imagen) {
      formData.append('imagen_automovil', {
        uri: imagen,
        type: 'image/jpeg',
        name: imagen.split('/').pop(),
      });
    }
  
    // Imprime los datos de FormData en consola
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  
    try {
      const response = await fetchData(API, 'createRow', formData);
      if (!response.error) {
        console.log(response);
        Alert.alert('Éxito', 'El vehículo ha sido agregado correctamente.');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.error);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al guardar el carro.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Input
        placeholder="Modelo automóvil"
        value={modelo}
        onChangeText={setModelo} // Actualiza el estado del modelo
      />
      <CustomPicker
        selectedValue={color}
        onValueChange={(itemValue) => setColor(itemValue)}
        iconImage={require('../images/icons/iconDui.png')} // Cambia la ruta a la imagen de tu ícono
        items={colores}
      />
      <CustomPicker
        selectedValue={tipoAutomovil}
        onValueChange={(itemValue) => setTipoAutomovil(itemValue)}
        iconImage={require('../images/icons/iconDui.png')} // Cambia la ruta a la imagen de tu ícono
        items={pickerValuesTipos}
      />
        <CustomPicker
        selectedValue={marcaAutomovil}
        onValueChange={(itemValue) => setMarcaAutomovil(itemValue)}
        iconImage={require('../images/icons/iconDui.png')} // Cambia la ruta a la imagen de tu ícono
        items={pickerValuesMarca}
      />
      <Input
        placeholder="Fecha fabricación"
        value={fecha}
        onChangeText={setFechaFabricacion} // Actualiza el estado de la fecha
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
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.image} />
        ) : (
          <Text>No se ha seleccionado imagen</Text>
        )}
      </View>
      <Button textoBoton='Guardar' accionBoton={handleGuardarCarro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 180,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  imageButtonText: {
    flex: 1,
    fontSize: 16,
  },
  imageButtonPlus: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default AgregarVehiculo;
