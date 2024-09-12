import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Text from '../components/utilidades/Text';
import { StatusBar } from 'expo-status-bar';
import fetchData from '../utils/FetchData';
import { useFocusEffect } from '@react-navigation/native';
import * as contants from '../utils/Constantes';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../components/inputs/AllBorder';
import TarjetaCarro from '../components/carros/CardCarro';
import ButtonPastilla from '../components/citas/ButtonPastilla'; // Importación del componente de botón personalizado


// Componente principal del dashboard
export default function DashboardScreen({ navigation }) {
  const [selectedButton, setSelectedButton] = useState('Mis autos'); // Estado para el botón seleccionado
  // Función para cambiar el estado del botón seleccionado
  const changeEstado = (button) => {
    setSelectedButton(button);
  };
  const nombre = 'Jackeline';
  const apellido = 'Melanie'
  // Render principal del componente DashboardScreen
  return (
    <View style={styles.contenedorTotal}>
      <StatusBar style="light" backgroundColor="#010101" />
      <View style={styles.header}>
        <Image
          source={require('../images/panelPrincipal/backImage.png')}
          style={styles.headerImage} />
        <View style={styles.titleContainer}>
          <Text texto='REVOLUTION GARAGE' font='PoppinsBold' fontSize={13} color='white' textAlign='center' />
        </View>
        <View style={styles.campanitaContainer}>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('Notificaciones')}>
            <MaterialIcons name="notifications" size={35} color="#E5383B" />
          </TouchableOpacity>
        </View>
        <View style={styles.saludoContainer}>
          <View style={styles.textContainer}>
            <Text texto={`¡Bienvenido`} font='PoppinsSemiBold' fontSize={25} color='white' textAlign='right' />
            <Text texto={`${apellido} ${nombre}!`} font='PoppinsSemiBold' fontSize={25} color='white' textAlign='right' />
          </View>
          <View style={styles.searchContainer}>
            <Input
              placeholder='Buscar..'
              textAlign='left'
              padding={5}
              fontSize={12}
              iconImage={(require('../images/icons/iconLupa.png'))}
              backgroundColor='#000000'
              textColor='white'
              tintColor='#E5383B'
              width='95%'
            />
            <Text texto='Por aqui podras buscar tus automóviles, citas y servicios que te interesen ' fontSize={10}
              paddingHorizontal={10} font='PoppinsLight' color='white' />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.contenedorMenu}>
          <ButtonPastilla
            textoBoton='Mis autos'
            accionBoton={() => changeEstado('Mis autos')}
            selected={selectedButton === 'Mis autos'}
            width='22%'
          />
          <ButtonPastilla
            textoBoton='Autos eliminados'
            accionBoton={() => changeEstado('Autos eliminados')}
            selected={selectedButton === 'Autos eliminados'}
            width='35%'
          />
          <ButtonPastilla
            textoBoton='Citas próximas'
            accionBoton={() => changeEstado('Citas próximas')}
            selected={selectedButton === 'Citas próximas'}
            width='30%'
          />
        </View>
        <View style={styles.contenedorResult}>
        </View>
      </View>
    </View>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  contenedorTotal: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  header: {
    position: 'relative',
    flexDirection: 'column',
    height: 310,
    width: '100%',
    alignItems: 'center',
  },
  headerImage: {
    position: 'absolute'
  },
  titleContainer: {
    paddingTop: 25,
  },
  campanitaContainer: {
    alignSelf: 'flex-end',
  },
  saludoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingVertical: 20,
  },
  contenedorMenu: {
    width: '100%', // Ancho completo
    height: 'auto', // Altura automática basada en su contenido
    flexDirection: 'row', // Disposición en fila para los elementos hijos
    alignItems: 'center', // Alinea elementos al centro verticalmente
    justifyContent: 'center', // Espacio uniformemente distribuido entre elementos
    zIndex: 1, // Orden en la pila
  },
  body: {
    flex: 1,
    width: '100%',
  },
  contenedorResult: {
    flex: 1,
    marginTop: 30,
  },
});
