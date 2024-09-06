import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Text from '../components/utilidades/Text';
import { StatusBar } from 'expo-status-bar';
import fetchData from '../utils/FetchData';
import { useFocusEffect } from '@react-navigation/native';
import * as contants from '../utils/Constantes';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../components/inputs/AllBorder';

// Componente principal del dashboard
export default function DashboardScreen({ navigation }) {
  const nombre = 'Jackeline';
  const apellido = 'Melanie'
  // Render principal del componente DashboardScreen
  return (
    <View style={styles.contenedorTotal}>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={styles.header}>
        <View style={styles.whtRectangle1}></View>
        <View style={styles.whtRectangle2}></View>
        <Image
          source={require('../images/panelPrincipal/panelImg.png')} /// Ruta de la imagen de botón de agregar
          style={styles.headerImage} />
        <View style={styles.headerTextContainer}>
          <Text texto='¡Bienvenido' font='PoppinsMedium' fontSize={24} color='white' />
          <Text texto={`${apellido}`} font='PoppinsMedium' fontSize={24} color='white' />
          <Text texto={`${nombre}!`} font='PoppinsMedium' fontSize={24} color='white' />
        </View>
        <View style={styles.headerTitleContainer}>
          <Text texto='Revolution Garage' font='PoppinsRegular' fontSize={14} color='white' />
          <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('Notificaciones')}>
            <MaterialIcons name="notifications" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodySearchContainer}>
          <Input
            placeholder='Buscar..'
            textAlign='left'
            padding={5}
            fontSize={12}
            iconImage={(require('../images/icons/iconLupa.png'))}
            backgroundColor='#BA181B'
            textColor='white'
            tintColor='white'
          />
          <Text texto='Por aqui podras buscar tus automóviles, citas y servicios que te interesen ' fontSize={12}
            paddingHorizontal={10} font='PoppinsLight' color='white' />
        </View>
        <View style={styles.bodyMenuContainer}>

        </View>
        <View style={styles.bodyCarouselContainer}>

        </View>
      </View>
      <View style={styles.footer}>

      </View>
    </View>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  contenedorTotal: {
    flex: 1,
    backgroundColor: '#BA181B',
    marginTop: 42,
    paddingBottom: 40,
    flexDirection: 'column'
  },
  header: {
    height: '29%',
    backgroundColor: '#000000',
    width: '100%',
    justifyContent: 'center',
    position: 'relative'
  },
  headerTextContainer: {
    paddingLeft: 40,
    position: 'absolute'
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
  },
  whtRectangle1: {
    width: 110,
    height: 110,
    borderColor: 'white',
    borderWidth: 0.5,
    position: 'absolute',
    zIndex: 3,
    top: 20,
    left: '6%'
  },
  whtRectangle2: {
    width: 110,
    height: 110,
    borderColor: 'white',
    borderWidth: 0.5,
    position: 'absolute',
    zIndex: 3,
    top: '40%',
    left: '20%'
  },
  headerTitleContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingRight: 15,
  },
  notificationIcon: {
    zIndex: 4,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 5,
    paddingRight: 40,
  },
  body: {
    width: '100%'
  },
  bodySearchContainer: {
    paddingHorizontal: 20,
  },
});
