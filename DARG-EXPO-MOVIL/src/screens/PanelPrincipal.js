import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TarjetaCarro from '../components/carros/CardCarro';
import Text from '../components/utilidades/Text';
import fetchData from '../utils/FetchData';
import { useFocusEffect } from '@react-navigation/native';
import * as contants from '../utils/Constantes';

// Componente principal del dashboard
export default function DashboardScreen({ navigation }) {
  const [allCars, setAllCars] = useState([]);
  const [deletedCars, setDeletedCars] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const API = 'automoviles.php';

  // Función que se encarga de llenar los autos disponibles
  const fillCardsCarsAll = async (searchValue = '') => {
    try {
      const formData = new FormData();
      formData.append('search_value', searchValue);
      const DATA = await fetchData(API, 'readAllMyCars', formData); // Llama a la API para obtener todos los autos
      if (DATA.status) {
         // Mapea los datos obtenidos para crear un array con los autos
        const data = DATA.dataset.map(item => ({
          id: item.id_automovil,
          imagen: `${contants.default.IMAGE_URL}automoviles/${item.imagen_automovil}`,
          modelo: item.modelo_automovil,
          placa: item.placa_automovil
        }));
        setAllCars(data);  // Actualiza el estado con los autos obtenidos
      } else {
        console.log(DATA.error);
        setAllCars([]); // Si hay error, limpia el estado de los autos
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAllCars([]); // Maneja errores en la llamada a la API
    } finally {
      setLoading(false); // Finaliza la carga
      setRefreshing(false); // Finaliza la actualización
    }
  };

  // Función que se encarga de llenar los autos eliminados
  const fillCardsCarsDelete = async () => {
    try {
      const DATA = await fetchData(API, 'readAllDelete'); // Llama a la API para obtener los autos eliminados
      if (DATA.status) {
        // Mapea los datos obtenidos para crear un array con los autos eliminados
        const data = DATA.dataset.map(item => ({
          id: item.id_automovil,
          imagen: `${contants.default.IMAGE_URL}automoviles/${item.imagen_automovil}`,
          modelo: item.modelo_automovil,
          placa: item.placa_automovil
        }));
        setDeletedCars(data); // Actualiza el estado con los autos eliminados
      } else {
        console.log(DATA.error);
        setDeletedCars([]); // Si hay error, limpia el estado de los autos eliminados
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDeletedCars([]); // Maneja errores en la llamada a la API
    } finally {
      setLoading(false); // Finaliza la carga
      setRefreshing(false); // Finaliza la actualización
    }
  };

  // Función que se encarga de llenar las citas de los autos
  const fillCardsCarAppointments = async () => {
    try {
      const DATA = await fetchData(API, 'readAllAppointments'); // Llama a la API para obtener las citas de los autos
      if (DATA.status) {
        // Mapea los datos obtenidos para crear un array con las citas de los autos
        const data = DATA.dataset.map(item => ({
          id: item.id_automovil,
          imagen: `${contants.default.IMAGE_URL}automoviles/${item.imagen_automovil}`,
          modelo: item.nombre_modelo,
          placa: item.placa_automovil
        }));
        setAppointments(data); // Actualiza el estado con las citas obtenidas
      } else { 
        console.log(DATA.error); 
        setAppointments([]); // Si hay error, limpia el estado de las citas
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAppointments([]); // Maneja errores en la llamada a la API
    } finally {
      setLoading(false); // Finaliza la carga
      setRefreshing(false); // Finaliza la actualización
    }
  };

// useEffect que ejecuta las funciones al montar el componente
useEffect(() => {
  fillCardsCarsAll(); // Llena todos los autos
  fillCardsCarsDelete(); // Llena los autos eliminados
  fillCardsCarAppointments(); // Llena las citas de los autos
}, []);

// useFocusEffect que actualiza las listas de autos al enfocar la pantalla
useFocusEffect(
  useCallback(() => {
    fillCardsCarsAll(search); // Llena todos los autos filtrados por búsqueda
    fillCardsCarsDelete(); // Llena los autos eliminados
    fillCardsCarAppointments(); // Llena las citas de los autos
  }, [search])
);

// Función para renderizar la lista de autos
  const renderCarros = (carros) => {
    return carros.map((carro, index) => (
      <TarjetaCarro key={index} carro={carro} />
    ));
  };

  // Función para manejar la acción al presionar un auto
  const handleCarPress = (carro) => {
    console.log('Id de carro',carro.id);
    try {
      // Mostrar un mensaje de confirmación antes de eliminar
      Alert.alert(
        'Confirmación',
        '¿Está seguro de eliminar el automóvil?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Aceptar',
            onPress: async () => {
              const formData = new FormData();
              formData.append('idAuto', carro.id);
              // Realización de la petición de finalizar pedido
              const data = await fetchData(API, 'deleteRow', formData);
              if (data.status) {
                Alert.alert("Exito", "Carrito eliminado correctamente")
                fillCardsCarsAll(search); // Actualiza la lista de autos disponibles
                fillCardsCarsDelete(); // Actualiza la lista de autos eliminados
                fillCardsCarAppointments(); // Actualiza la lista de citas
              } else {
                Alert.alert('Error', data.error);
              }
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("Error al eliminar el carrito")
    }

  };
  
  // Función para renderizar todos los autos disponibles con la opción de presionarlos
  const renderCarrosAll = (carros) => {
    return carros.map((carro, index) => (
      <TarjetaCarro key={index} carro={carro} onPress={() => handleCarPress(carro)}/>
    ));
  };

  // Render principal del componente DashboardScreen
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text texto='Bienvenido' font='PoppinsMedium' fontSize={25} />
        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
          <MaterialIcons name="notifications" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          value={search}
        />
      <View style={styles.appointmentstwo}>
        <Text texto='Agrega un auto nuevo' font='PoppinsRegular' fontSize={15} />
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CarrosVista')}>
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.upperSection}>
        {allCars.length > 0 && (
          <View style={styles.section}>
            <Text texto='Vista previa de tus autos' font='PoppinsSemiBold' fontSize={18} color='white' />
            <ScrollView horizontal>
              {renderCarrosAll(allCars)}
            </ScrollView>
          </View>
        )}
        {deletedCars.length > 0 && (
          <View style={styles.section}>
            <Text texto='Autos eliminados' font='PoppinsSemiBold' fontSize={18} color='white' />
            <ScrollView horizontal>
              {renderCarros(deletedCars)}
            </ScrollView>
          </View>
        )}
        {appointments.length > 0 && (
          <View style={styles.section}>
            <Text texto='Citas próximas' font='PoppinsSemiBold' fontSize={18} color='white' />
            <View style={styles.appointments}>
              <ScrollView horizontal>
                {renderCarros(appointments)}
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo el espacio disponible
    padding: 15, // Espaciado interior
    marginBottom: 80, // Margen inferior
    backgroundColor: '#fff', // Fondo blanco
  },
  header: {
    flexDirection: 'row', // Elementos en fila
    justifyContent: 'space-between', // Espaciado entre los elementos
    alignItems: 'center', // Alineación central vertical
    marginTop: 40, // Margen superior
  },
  searchContainer: {
    flexDirection: 'row', // Elementos en fila
    alignItems: 'center', // Alineación central vertical
    borderColor: '#ccc', // Color del borde
    borderWidth: 1, // Ancho del borde
    borderRadius: 8, // Bordes redondeados
    padding: 10, // Espaciado interior
    marginVertical: 10, // Margen vertical
    borderColor: 'red', // Color del borde (repetido, se puede eliminar uno)
    borderWidth: 1, // Ancho del borde (repetido, se puede eliminar uno)
    maxWidth: 200, // Ancho máximo
  },
  searchInput: {
    marginLeft: 10, // Margen izquierdo
    flex: 1, // Ocupa todo el espacio disponible
    height: 35, // Altura del campo de texto
  },
  addButton: {
    backgroundColor: 'red', // Color de fondo del botón
    borderRadius: 25, // Bordes redondeados
    alignItems: 'center', // Alineación central horizontal
    justifyContent: 'center', // Alineación central vertical
    width: 50, // Ancho del botón
    height: 50, // Altura del botón
    alignSelf: 'flex-end', // Alineación al final del contenedor
  },
  upperSection: {
    backgroundColor: '#BA181B', // Color de fondo
    borderTopLeftRadius: 25, // Bordes superiores redondeados
    borderTopRightRadius: 25, // Bordes superiores redondeados
    padding: 20, // Espaciado interior
    marginTop: 10, // Margen superior
  },
  section: {
    marginVertical: 10, // Margen vertical
  },
  appointments: {
    flexDirection: 'row', // Elementos en fila
    justifyContent: 'space-between', // Espaciado entre los elementos
  },
  appointmentstwo: {
    flexDirection: 'row', // Elementos en fila
    justifyContent: 'space-between', // Espaciado entre los elementos
    alignItems: 'center', // Alineación central vertical
    padding: 10, // Espaciado interior
    elevation: 1, // Elevación (sombra)
    borderTopLeftRadius: 10, // Bordes superiores redondeados
    borderTopRightRadius: 10, // Bordes superiores redondeados
    borderBottomEndRadius: 10, // Borde inferior derecho redondeado
    borderBottomStartRadius: 10.01, // Borde inferior izquierdo redondeado (el valor decimal no tiene efecto visible)
    paddingLeft: 20, // Espaciado interior izquierdo
    height: 95, // Altura del contenedor
  },
});
