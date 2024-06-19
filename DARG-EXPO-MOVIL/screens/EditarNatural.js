import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Appbar, Avatar, Button, Text, TextInput, TouchableRipple } from "react-native-paper";

export default function EditarJuridico({ navigation }) {
  const [nombre, setNombre] = useState("");

  return (
    <View>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={75} icon="account" />
        <Text variant="headlineSmall" style={{fontWeight:'bold'}}>Emily Murillo</Text>
        <TouchableRipple
    onPress={() => console.log('Pressed')}
    rippleColor="rgba(0, 0, 0, .32)"
  >
  <Text variant="bodyLarge" style={styles.textoAvatar}>Cambiar foto de perfil</Text>
  </TouchableRipple>
      </View>

      <View style={styles.ContainerInputs}>
      {/* ++++++ Nombre++++++ */}
      <Text variant="bodyLarge" >Nombre</Text>
      <TextInput
       label="Nombre"
       mode="outlined"

       />
        {/* ++++++ Apellido++++++ */}

      <Text variant="bodyLarge">Apellido</Text>
      <TextInput
       label="Apellido"
        mode="outlined"
      />

        {/* ++++++ Departamento++++++ */}

        <Text variant="bodyLarge">Departamento</Text>
      <TextInput
       label="Departamento"
        mode="outlined"

      />
        {/* ++++++ Correo++++++ */}

        <Text variant="bodyLarge">Correo</Text>
      <TextInput
       label="Correo@ejemplo.com"
        mode="outlined"
      />
{/* ++++++ DUI++ NIT++++ */}
<View style={styles.dui_nit }>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>DUI</Text>
        <TextInput style={styles.input} placeholder="DUI"
         mode="outlined" keyboardType="numeric"/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label }>NIT</Text>
        <TextInput style={styles.input} placeholder="NIT"
         mode="outlined" keyboardType="numeric" 
        />
      </View>
    </View>
      <View>
        <Button mode="contained">Actualizar</Button>
      </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    padding: 50,

  },
  avatarContainer: {
    alignItems: "center", // Centra el avatar horizontalmente
    // Añade espacio entre el avatar y el título
    padding: 50,
  },
  textoAvatar:{
    color:"#BA181B"
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
  },
  ContainerInputs:{
    paddingHorizontal:20,
  },
  input: {
    marginBottom: 10,
  },
  dui_nit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 2,
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,  
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    borderRadius: 4,
    height: 40,
    flex: 1, // Esto permite que los inputs se expandan para llenar el espacio disponible
  },
  }
});
