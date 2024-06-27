import React from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TarjetaCarro from '../components/carros/tarjeta_carro';
import Text from '../components/utilidades/text';


// Componente principal del dashboard
export default function DashboardScreen({ navigation }) {

  // Objeto de ejemplo para un carro
  const carro =
  {
    imagen: 'https://th.bing.com/th/id/OIP.xxMt6xG7kaLu7P6llDKWyAHaEK?w=318&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    modelo: 'Toyota Corolla',
    placa: 'XYZ 123',
  }
  // Estilos para los componentes de la pantalla de inicio
  // Esto inclute el header, la barra de búsqueda, las tarjetas de autos y las citas
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
        <View style={styles.section}>
          <Text texto='Vista previa de tus autos' font='PoppinsSemiBold' fontSize={18} color='white' />
          <ScrollView horizontal>
            <TarjetaCarro carro={carro} />
            <TarjetaCarro carro={carro} />
            <TarjetaCarro carro={carro} />
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text texto='Autos eliminados' font='PoppinsSemiBold' fontSize={18} color='white' />
          <ScrollView horizontal>
            <TarjetaCarro carro={carro} />
            <TarjetaCarro carro={carro} />
            <TarjetaCarro carro={carro} />
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text texto='Citas próximas' font='PoppinsSemiBold' fontSize={18} color='white' />
          <View style={styles.appointments}>
            <TarjetaCarro carro={carro} />
            <TarjetaCarro carro={carro} />
          </View>
        </View>
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
