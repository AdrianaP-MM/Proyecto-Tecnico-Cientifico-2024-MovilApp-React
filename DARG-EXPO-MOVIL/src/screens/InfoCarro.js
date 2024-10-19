import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomPicker from '../components/inputs/ComboBox'; // Importa el componente de selección personalizada
import Button from '../components/buttons/ButtonRojo'; // Importa el componente de botón personalizado
import Input from '../components/inputs/AllBorder';
import fetchData from '../utils/FetchData';
import Config from '../utils/Constantes';

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
  const { carro } = route.params;
  const { cliente } = route.params; // Obtiene los parámetros de la ruta, específicamente el objeto 'carro'
  const [modelo, setModelo] = useState(carro.modelo);
  const [color, setColor] = useState(carro.color);
  const [fecha, setFecha] = useState(carro.fecha);
  const [placa, setPlaca] = useState(carro.placa);
  const [imagen, setImagen] = useState(carro.imagen);
  const [tipoAutomovil, setTipoAutomovil] = useState(carro.tipo);
  const [marcaAutomovil, setMarcaAutomovil] = useState(carro.marca);
  const [pickerValuesMarca, setPickerValuesMarca] = useState([]);
  const [pickerValuesTipos, setPickerValuesTipos] = useState([]);

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
        // Agregar un elemento predeterminado
        const tiposConDefault = [{
          label: 'Selecciona un tipo', // Label predeterminado
          value: null, // Valor que no se utilizará
        }, ...responseTiposAutomoviles.dataset.map(item => ({
          label: item.nombre_tipo_automovil,
          value: item.id_tipo_automovil,
        }))];

        setPickerValuesTipos(tiposConDefault);
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
        // Agregar un elemento predeterminado
        const marcasConDefault = [{
          label: 'Selecciona una marca', // Label predeterminado
          value: null, // Valor que no se utilizará
        }, ...responseMarcasAutomoviles.dataset.map(item => ({
          label: item.nombre_marca_automovil,
          value: item.id_marca_automovil,
        }))];

        setPickerValuesMarca(marcasConDefault);
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
    console.log('Carro recibido:', carro);
  }, [carro]);

  const handleChangeFecha = (text) => {
    // Limita la longitud del campo de fecha a 4 dígitos
    if (text.length <= 4) {
      setFecha(text);
    }
  };

  const handleChangePlaca = (text) => {
    // Limpiar el valor de cualquier carácter que no sea letras, números o guiones
    let cleanText = text.replace(/[^A-Z0-9-]/g, '').toUpperCase();

    // Actualizar el estado de la placa
    setPlaca(cleanText);
  };

  function validateSalvadoranPlate(plate) {
    // Expresión regular para validar el formato de la placa salvadoreña
    const plateRegex = /^(A|AB|C|CC|CD|D|E|F|M|MB|MI|N|O|P|PR|PNC|RE|T|V)-?[A-Za-z0-9]{3}-[A-Za-z0-9]{3}$/;

    // Validar formato
    if (!plateRegex.test(plate)) {
      return { valid: false, message: 'Formatos de placa salvadoreños: Un subfijo: P-###-###, dos subfijos: AB-###-###, tres subfijos PNC-###-###. Verfica tambien la informacion de placa.' };
    }

    return { valid: true, message: 'Placa válida.' };
  }

  const handleGuardarCarro = async () => {
    if (!modelo || !color || !tipoAutomovil || !marcaAutomovil || !fecha || !placa) {
      Alert.alert('Error', 'Todos los campos son requeridos.');
      return;
    }

    const validationResult = validateSalvadoranPlate(placa);
    if (!validationResult.valid) {
      Alert.alert('Error', validationResult.message);
      return; // Detener la ejecución si la placa no es válida
    }

    // Validar que la fecha no sea mayor que la fecha actual
    const fechaActual = new Date();
    const fechaFabricacion = new Date(fecha); // Asegúrate de que `fecha` tenga un formato válido
    if (fechaFabricacion > fechaActual) {
      Alert.alert('Error', 'La fecha de fabricación no puede ser mayor a la fecha actual.');
      return;
    }

    const formData = new FormData();
    formData.append('modelo_automovil', modelo);
    formData.append('color_automovil', color);
    formData.append('id_tipo_automovil', tipoAutomovil);
    formData.append('id_marca_automovil', marcaAutomovil);
    formData.append('fecha_fabricacion_automovil', fecha);
    formData.append('placa_automovil', placa);
    formData.append('id_cliente', cliente.id_cliente);
    formData.append('id_automovil', carro.id_automovil); // Se envía el ID del automóvil para la actualización

    if (imagen) {
      formData.append('imagen_automovil', {
        uri: imagen,
        type: 'image/jpeg',
        name: imagen.split('/').pop(),
      });
    }
    console.log('ID del automóvil:', carro.id_automovil);
    console.log('FormData:', formData); // Log para verificar los datos enviados

    try {
      const response = await fetchData(API, 'updateRow', formData);
      console.log('Server Response:', response); // Log para verificar la respuesta del servidor

      if (response.status) {
        Alert.alert('Éxito', 'El vehículo ha sido actualizado correctamente.');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.error || 'Error desconocido.');
      }
    } catch (error) {
      console.error('Error al guardar el carro:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar el carro.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        placeholder="Modelo automóvil"
        value={modelo}
        onChangeText={setModelo}
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
        placeholder="Fecha fabricación (yyyy)"
        value={fecha}
        onChangeText={handleChangeFecha}
        keyboardType="numeric" // Solo permite ingresar números
      />

      <Input
        placeholder="Placa automóvil"
        value={placa}
        onChangeText={handleChangePlaca}
      />

      <TouchableOpacity style={styles.imageButton} onPress={handleAgregarImagen}>
        <Text style={styles.imageButtonText}>Cambiar imagen</Text>
        <Text style={styles.imageButtonPlus}>+</Text>
      </TouchableOpacity>

      <View style={styles.cambioImagen}>

        <Image
          source={carro.imagen
            ? { uri: `${Config.IMAGE_URL}/automoviles/${carro.imagen}` }
            : require('../images/carros/carExample2.jpg')}
          style={styles.image}
        />

        <Image
          source={require('../images/icons/btnBack.png')} // Ruta de tu imagen intermedia
          style={styles.imageIntermedia}
          resizeMode="contain"
        />

        <View style={styles.imageContainer}>
          {imagen ? (
            <Image source={{ uri: imagen }} style={styles.image} />
          ) : (
            <Text>No se ha seleccionado imagen</Text>
          )}
        </View>

      </View>

      <Button textoBoton='Guardar' accionBoton={handleGuardarCarro} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 300,
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
    marginTop: 10,
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
    width: 100, // Ancho de la imagen, ajusta según tus necesidades
    height: 100, // Alto de la imagen, ajusta según tus necesidades
    marginHorizontal: 10, // Espacio horizontal entre imágenes
    borderRadius: 10,
  },
  imageIntermedia: {
    width: 50, // Ancho de la imagen, ajusta según tus necesidades
    height: 50, // Alto de la imagen, ajusta según tus necesidades
    transform: [{ rotate: '180deg' }],
  },
  cambioImagen: {
    flexDirection: 'row',
    alignItems: 'center', // Alinea verticalmente los elementos
    justifyContent: 'space-between', // Espacio entre los elementos
    padding: 10, // Agrega un poco de espacio interno
  },
  cambioImagenText: {
    // Estilos para el texto
    marginRight: 10, // Espacio entre el texto y la imagen
  },
  imageContainer: {
    // Estilos para el contenedor de la imagen
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InformacionCarro;
