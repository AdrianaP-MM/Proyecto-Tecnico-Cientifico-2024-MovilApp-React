import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CarCard2 from '../components/carros/carCard2';

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="black" />
        <TextInput style={styles.searchInput} placeholder="Buscar..." />
      </View>
      <View style={styles.appointmentstwo}>
        <Text style={styles.subtitle}>Agrega un auto nuevo</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCar')}>
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.upperSection}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vista previa de tus autos</Text>
          <ScrollView horizontal>
            <CarCard2 />
            <CarCard2 />
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autos eliminados</Text>
          <ScrollView horizontal>
            <CarCard2 deleted />
            <CarCard2 deleted />
          </ScrollView>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Citas próximas</Text>
          <View style={styles.appointments}>
            <CarCard2 appointment />
            <CarCard2 appointment />
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10, // Adding space between the title and the notification icon
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Adjusted for better visibility on the red background
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
    height: 95,
  },
});
