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
  const [fecha, setFecha] = useState(''); // Estado para la fecha del carro
  const [placa, setPlaca] = useState(''); // Estado para la placa del carro
  const [imagen, setImagen] = useState(null); // Estado para la imagen del carro
  const [tipoAutomovil, setTiposAutomovil] = useState(''); // Estado para el tipo de automóvil

  const API = 'automoviles.php'; // URL del servidor

  const fetchTiposAutomovil = async () => {
    try {
      const responseTiposAutomoviles = await fetchData('automoviles.php', 'readTipos');
            if (responseTiposAutomoviles.status) {
              setPickerValuesTipos(responseTiposAutomoviles.dataset.map(item => ({
                    id: item.id_tipo_automovil, // Asegúrate de que el campo id sea correcto
                    nombre: item.nombre_automovil // Asegúrate de que el campo nombre sea correcto
                })));
                //console.log(responseAutomoviles.dataset);
            } else {
                Alert.alert('Error', `${responseTiposAutomoviles.error}` + '. Es necesario registrar un automóvil antes de agendar una cita.');
            }
        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
  };

  useEffect(() => {
    fetchTiposAutomovil();
  }, []);

  const [pickerValuesTipos, setPickerValuesTipos] = useState([]);

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
      setImagen(result.uri); // Actualiza el estado con la imagen seleccionada
    }
  };

  // Función para manejar la acción de guardar el carro
  const handleGuardarCarro = async () => {
    if (!modelo || !color || !tipoAutomovil || !fecha || !placa) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    }

    const formData = new FormData();
    formData.append('modelo_automovil', modelo); // Cambia 'modelo' a 'modelo_automovil'
    formData.append('color', color);
    formData.append('id_tipo_automovil', tipoAutomovil); // Usa tipoAutomovil para el valor seleccionado
    formData.append('fecha_fabricacion', fecha); // Cambia 'fecha' a 'fecha_fabricacion'
    formData.append('placa', placa);

    if (imagen) {
      formData.append('imagen_automovil', {
        uri: imagen,
        type: 'image/jpeg', // Cambia según el tipo de la imagen
        name: imagen.split('/').pop(), // Nombre de la imagen
      });
    }

    try {
      const response = await fetchData(API, 'createRow', formData);
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Éxito', 'El vehículo ha sido agregado correctamente.');
        navigation.goBack(); // Navegar hacia atrás
      } else {
        Alert.alert('Error', result.message || 'Ocurrió un error al agregar el vehículo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error en la conexión.');
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
     <Input
                    placeholder='tipos Carros'
                    value={tipoAutomovil}
                    onChangeText={setTiposAutomovil} // Actualiza el estado
                    keyboardType='picker'
                    pickerValues={pickerValuesTipos}
                />
      <Input
        placeholder="Fecha fabricación"
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
