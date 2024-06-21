import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button as PaperButton, Text, TouchableRipple } from "react-native-paper";
import Input from '../components/inputs/allBorder'; // Importa el componente Input personalizado
import Button from '../components/buttons/btnRojo'; // Renombra la importación de tu componente personalizado

export default function EditarNatural({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [correo, setCorreo] = useState("");
  const [dui, setDui] = useState("");
  const [nit, setNit] = useState("");

  const handleNavigate = () => {
    // Your navigation logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={75} icon="account" />
        <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>Emily Murillo</Text>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Text variant="bodyLarge" style={styles.textoAvatar}>Cambiar foto de perfil</Text>
        </TouchableRipple>
      </View>

      <View style={styles.ContainerInputs}>
        <Input
          placeholder='Nombre'
          value={nombre}
          onChangeText={setNombre}
          width='95%'
          style={styles.input}
        />

        <Input
          placeholder='Apellido'
          value={apellido}
          onChangeText={setApellido}
          width='95%'
          style={styles.input}
        />

        <Input
          placeholder='Departamento'
          value={departamento}
          onChangeText={setDepartamento}
          width='95%'
          style={styles.input}
        />

        <Input
          placeholder='Correo'
          value={correo}
          onChangeText={setCorreo}
          width='95%'
          style={styles.input}
        />

        <View style={styles.dui_nit}>
          <View style={styles.inputContainer}>
            <Input
              placeholder='DUI'
              value={dui}
              onChangeText={setDui}
              width='95%'
              keyboardType='numeric'
              maxLength={10} 
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder='NIT'
              value={nit}
              onChangeText={setNit}
              width='95%'
              keyboardType='numeric'
              maxLength={14}
              style={styles.input}
            />
          </View>
        </View>
        <View>
        <Button textoBoton='Actualizar' fontSize={17} width='90%' marginTop={50} />
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
    alignItems: 'center',
    paddingBottom: 100, // Add padding to ensure the button is visible
  },
  avatarContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },
  textoAvatar: {
    color: "#BA181B",
  },
  ContainerInputs: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.2,
    borderRadius: 3,
    width: '95%',
    paddingHorizontal: 10, 
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
  button: {
    marginTop: 20,
  },
});
