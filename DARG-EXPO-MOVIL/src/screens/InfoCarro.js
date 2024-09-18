import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomPicker from '../components/inputs/ComboBox'; // Importa el componente de selección personalizada
import Button from '../components/buttons/ButtonRojo'; // Importa el componente de botón personalizado
import fetchData from '../utils/FetchData';

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

const InformacionCarro = ({ route, navigation }) => {
  const { carro } = route.params; // Obtiene los parámetros de la ruta, específicamente el objeto 'carro'
  const [modelo, setModelo] = useState(carro.modelo);
  const [color, setColor] = useState(carro.color);
  const [fecha, setFecha] = useState(carro.fecha);
  const [placa, setPlaca] = useState(carro.placa);
  const [imagen, setImagen] = useState(carro.imagen);
  const [tipoAutomovil, setTipoAutomovil] = useState('');
  const [marcaAutomovil, setMarcaAutomovil] = useState('') // Estado para el tipo de automóvil
  const [pickerValuesMarca, setPickerValuesMarca] = useState([]);
  const [pickerValuesTipos, setPickerValuesTipos] = useState([]); // Estado para los valores del picker 

  const API = 'automoviles.php'; // URL del servidor

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

  // Función para manejar la acción de guardar el carro modificado
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
    formData.append('id_marca_automovil', marcaAutomovil);
    formData.append('fecha_fabricacion_automovil', fecha);
    formData.append('placa_automovil', placa);

    if (imagen) {
      formData.append('imagen_automovil', {
        uri: imagen,
        type: 'image/jpeg',
        name: imagen.split('/').pop(),
      });
    }

    try {
      const response = await fetchData(API, 'updateCar', formData);
      if (!response.error) {
        Alert.alert('Éxito', 'El vehículo ha sido actualizado correctamente.');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al actualizar el carro.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modelo</Text>
      <TextInput
        placeholder="Modelo automóvil"
        value={modelo}
        onChangeText={setModelo}
        style={styles.input}
      />
      
      <Text style={styles.label}>Color</Text>
      <CustomPicker
        selectedValue={color}
        onValueChange={(itemValue) => setColor(itemValue)}
        iconImage={require('../images/icons/iconDui.png')} // Cambia la ruta a la imagen de tu ícono
        items={colores}
      />
      
      <Text style={styles.label}>Tipo de Automóvil</Text>
      <CustomPicker
        selectedValue={tipoAutomovil}
        onValueChange={(itemValue) => setTipoAutomovil(itemValue)}
        iconImage={require('../images/icons/iconDui.png')} // Cambia la ruta a la imagen de tu ícono
        items={pickerValuesTipos}
      />

      <Text style={styles.label}>Marca del Automóvil</Text>
      <CustomPicker
        selectedValue={marcaAutomovil}
        onValueChange={(itemValue) => setMarcaAutomovil(itemValue)}
        iconImage={require('../images/icons/iconDui.png')} // Cambia la ruta a la imagen de tu ícono
        items={pickerValuesMarca}
      />

      <Text style={styles.label}>Fecha de Fabricación</Text>
      <TextInput
        placeholder="Fecha fabricación"
        value={fecha}
        onChangeText={setFecha}
        style={styles.input}
      />
      
      <Text style={styles.label}>Placa</Text>
      <TextInput
        placeholder="Placa automóvil"
        value={placa}
        onChangeText={setPlaca}
        style={styles.input}
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#666', // Color de texto gris
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});

export default InformacionCarro;
