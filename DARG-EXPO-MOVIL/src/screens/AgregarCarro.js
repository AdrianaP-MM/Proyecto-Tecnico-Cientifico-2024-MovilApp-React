import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
  const [marcaAutomovil, setMarcaAutomovil] = useState(''); // Estado para el tipo de automóvil
  const [pickerValuesMarca, setPickerValuesMarca] = useState([]);
  const [pickerValuesTipos, setPickerValuesTipos] = useState([]); // Estado para los valores del picker 

  const API = 'automoviles.php'; // URL del servidor

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
    // Validar la placa antes de proceder
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

    // Validar que todos los campos requeridos estén llenos
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
      console.log('va con imagen');
    }

    try {
      const response = await fetchData(API, 'createRow', formData);
      if (response.status) {
        console.log(response);
        Alert.alert('Éxito', 'El vehículo ha sido agregado correctamente.');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.error);
        console.log(response);
        console.log(formData);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al guardar el carro.');
    }
  };

  // Función para limitar la longitud de la fecha a 4 dígitos
  const handleChangeFecha = (text) => {
    if (text.length <= 4) {
      setFechaFabricacion(text);
    }
  };

  const handleChangePlaca = (text) => {
    // Limpiar el valor de cualquier carácter que no sea letras, números o guiones
    let cleanText = text.replace(/[^A-Z0-9-]/g, '').toUpperCase();

    // Actualizar el estado de la placa
    setPlaca(cleanText);
  };

  const showPlacaInfo = () => {
    Alert.alert('Información de Placa', 'Prefijos disponibles para placas salvadoreñas: A,AB,C,CC,CD,D,E,F,M,MB,MI,N,O,P,PR,PNC,RE,T,V.');
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.placaContainer}>
        <TouchableOpacity onPress={showPlacaInfo} style={styles.infoIcon}>
          <Text style={styles.imageButtonText}>Informacion de placa</Text>
          <Image
            source={require('../images/icons/iconInterrogacion.png')} // Asegúrate de que esta ruta sea correcta
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

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
        onChangeText={handleChangeFecha} // Actualiza el estado de la fecha con validación
      />

      <Input
        placeholder="Placa automóvil"
        value={placa}
        onChangeText={handleChangePlaca}
        maxLength={11}
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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 180,
  },
  placaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  infoIcon: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
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
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default AgregarVehiculo;

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
