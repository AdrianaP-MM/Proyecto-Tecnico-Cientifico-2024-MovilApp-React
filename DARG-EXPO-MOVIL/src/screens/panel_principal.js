import React from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TarjetaCarro from '../components/carros/tarjeta_carro';
import Text from '../components/utilidades/text';


export default function DashboardScreen({ navigation }) {
  const carro =
  {
    imagen: 'https://th.bing.com/th/id/OIP.xxMt6xG7kaLu7P6llDKWyAHaEK?w=318&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    modelo: 'Toyota Corolla',
    placa: 'XYZ 123',
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginBottom: 80,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    borderColor: 'red',
    borderWidth: 1,
    maxWidth: 200,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    height: 35,
  },
  addButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  upperSection: {
    backgroundColor: '#BA181B',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    marginTop: 10,
  },
  section: {
    marginVertical: 10,
  },
  appointments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appointmentstwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    elevation: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10.01,
    paddingLeft: 20,
    height: 95,
  },
});
