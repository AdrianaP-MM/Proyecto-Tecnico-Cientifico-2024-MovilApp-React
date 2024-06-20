import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Avatar, Button, Text, TextInput, TouchableRipple } from "react-native-paper";
import ButtonAction from '../components/buttonAction';

export default function EditarJuridico({ navigation }) {
  const [nombre, setNombre] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={75} icon="account" />
        <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Empresa</Text>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Text variant="bodyLarge" style={styles.textoAvatar}>Cambiar foto de perfil</Text>
        </TouchableRipple>
      </View>

      <View style={styles.ContainerInputs}>

        {/* Nombre */}
        <Text variant="bodyLarge">Nombre</Text>
        <TextInput
          label="Nombre"
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          theme={{ colors: { background: 'white' } }}
        />

        {/* Apellido */}
        <Text variant="bodyLarge">Apellido</Text>
        <TextInput
          label="Apellido"
          style={styles.input}
          theme={{ colors: { background: 'white' } }}
        />

        {/* Departamento */}
        <Text variant="bodyLarge">Departamento</Text>
        <TextInput
          label="Departamento"
          style={styles.input}
          theme={{ colors: { background: 'white' } }}
        />

        {/* Correo */}
        <Text variant="bodyLarge">Correo</Text>
        <TextInput
          label="Correo@ejemplo.com"
          style={styles.input}
          theme={{ colors: { background: 'white' } }}
        />

        {/* DUI y NIT */}
        <View style={styles.dui_nit}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>DUI</Text>
            <TextInput
              style={styles.input}
              placeholder="DUI"
              keyboardType="numeric"
              theme={{ colors: { background: 'white' } }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>NIT</Text>
            <TextInput
              style={styles.input}
              placeholder="NIT"
              keyboardType="numeric"
              theme={{ colors: { background: 'white' } }}
            />
          </View>
        </View>

        {/* NRC y NRF */}
        <View style={styles.dui_nit}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>NRC</Text>
            <TextInput
              style={styles.input}
              placeholder="NRC"
              keyboardType="numeric"
              theme={{ colors: { background: 'white' } }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>NRF</Text>
            <TextInput
              style={styles.input}
              placeholder="NRF"
              keyboardType="numeric"
              theme={{ colors: { background: 'white' } }}
            />
          </View>
        </View>
        
        <View>
          <Button
            mode="contained"
            onPress={handleNavigate}
            style={styles.button}
            theme={{ colors: { primary: '#BA181B' } }}
          >
            Actualizar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "start",
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center", // Centra el avatar horizontalmente
    padding: 50, // Añade espacio entre el avatar y el título
  },
  textoAvatar: {
    color: "#BA181B",
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  ContainerInputs: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white', // Fondo blanco
    borderColor: 'black', // Color del borde
    borderWidth: 0.2, // Ancho del borde
    borderRadius: 3, // Borde redondeado
    shadowColor: "#000", // Color de la sombra
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Opacidad de la sombra
    shadowRadius: 3.84, // Radio de la sombra
    elevation: 2, // Altura de la sombra 
  },
  dui_nit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
