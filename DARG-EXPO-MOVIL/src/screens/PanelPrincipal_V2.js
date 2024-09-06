import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Text from '../components/utilidades/Text';
import fetchData from '../utils/FetchData';
import { useFocusEffect } from '@react-navigation/native';
import * as contants from '../utils/Constantes';

// Componente principal del dashboard
export default function DashboardScreen({ navigation }) {
  // Render principal del componente DashboardScreen
  return (
    <ScrollView contentContainerStyle={styles.contenedorTotal}>
      
    </ScrollView>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1, // Ocupa todo el espacio disponible
        backgroundColor: '#E5383B', // Fondo gris claro
        alignItems: 'center', // Alinea elementos al inicio horizontalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio verticalmente
        marginTop: 20, // Margen superior de 20 unidades
        paddingTop: 30, // Relleno superior de 20 unidades
        paddingBottom: 40,
        padding: 0, // Sin relleno horizontal adicional
    },
});
