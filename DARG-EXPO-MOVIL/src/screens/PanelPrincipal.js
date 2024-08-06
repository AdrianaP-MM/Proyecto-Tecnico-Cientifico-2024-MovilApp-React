import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
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
  const API = 'automoviles.php';

  const fillCardsCarsAll = async () => {
    try {
      const DATA = await fetchData(API, 'readAllMyCars');
      if (DATA.status) {
        const data = DATA.dataset.map(item => ({
          imagen: `${contants.IMAGE_URL}automoviles/${item.imagen_automovil}`,
          modelo: item.nombre_modelo,
          placa: item.placa_automovil
        }));
        setAllCars(data);
      } else {
        console.log(DATA.error);
        setAllCars([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAllCars([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fillCardsCarsDelete = async () => {
    try {
      const DATA = await fetchData(API, 'readAllDelete');
      if (DATA.status) {
        const data = DATA.dataset.map(item => ({
          imagen: `${contants.IMAGE_URL}automoviles/${item.imagen_automovil}`,
          modelo: item.nombre_modelo,
          placa: item.placa_automovil
        }));
        setDeletedCars(data);
      } else {
        console.log(DATA.error);
        setDeletedCars([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDeletedCars([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fillCardsCarAppointments = async () => {
    try {
      const DATA = await fetchData(API, 'readAll');
      if (DATA.status) {
        const data = DATA.dataset.map(item => ({
          imagen: `${contants.IMAGE_URL}automoviles/${item.imagen_automovil}`,
          modelo: item.nombre_modelo,
          placa: item.placa_automovil
        }));
        setAppointments(data);
      } else {
        console.log(DATA.error);
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fillCardsCarsAll();
    fillCardsCarsDelete();
    fillCardsCarAppointments();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fillCardsCarsAll();
      fillCardsCarsDelete();
      fillCardsCarAppointments();
    }, [])
  );

  const renderCarros = (carros) => {
    return carros.map((carro, index) => (
      <TarjetaCarro key={index} carro={carro} />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text texto='Bienvenido' font='PoppinsMedium' fontSize={25} />
        <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')}>
          <MaterialIcons name="notifications" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="black" />
        <TextInput style={styles.searchInput} placeholder="Buscar..." />
      </View>
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
              {renderCarros(allCars)}
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
