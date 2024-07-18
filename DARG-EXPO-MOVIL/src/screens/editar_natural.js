import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button as PaperButton, Text, TouchableRipple } from "react-native-paper";
import Input from '../components/inputs/AllBorder'; // Importa el componente Input personalizado
import Button from '../components/buttons/ButtonRojo'; // Renombra la importación de tu componente personalizado

export default function EditarNatural({ navigation }) {
  const [nombre, setNombre] = useState(""); // Estado para almacenar el nombre
  const [apellido, setApellido] = useState(""); // Estado para almacenar el apellido
  const [departamento, setDepartamento] = useState(""); // Estado para almacenar el departamento
  const [correo, setCorreo] = useState(""); // Estado para almacenar el correo
  const [dui, setDui] = useState(""); // Estado para almacenar el DUI
  const [nit, setNit] = useState(""); // Estado para almacenar el NIT

  const handleNavigate = () => {

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

// Estilos definidos con StyleSheet
const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Permite que el contenedor crezca para ocupar el espacio disponible
    justifyContent: "start", // Alinea el contenido al inicio verticalmente
    padding: 20, // Padding alrededor del contenedor
    alignItems: 'center', // Centra el contenido horizontalmente
    paddingBottom: 100, // Padding adicional en la parte inferior para asegurar que el botón sea visible
  },
  avatarContainer: {
    alignItems: "center", // Centra el contenido horizontalmente
    paddingVertical: 50, // Padding vertical alrededor del avatar
  },
  textoAvatar: {
    color: "#BA181B", // Color del texto del botón para cambiar la foto de perfil
  },
  ContainerInputs: {
    paddingHorizontal: 20, // Padding horizontal alrededor del contenedor de inputs
  },
  input: {
    marginBottom: 20, // Espacio debajo de cada input
    backgroundColor: 'white', // Color de fondo blanco para el input
    borderColor: 'black', // Color del borde del input
    borderWidth: 0.2, // Grosor del borde del input
    borderRadius: 3, // Radio del borde del input
    width: '95%', // Ancho del input ajustado al 95%
    paddingHorizontal: 10, // Padding horizontal dentro del input
  },
  dui_nit: {
    flexDirection: 'row', // Organiza los elementos en una fila
    justifyContent: 'space-between', // Espacio entre los elementos
    alignItems: 'center', // Alinea los elementos en el centro verticalmente
  },
  inputContainer: {
    flex: 1, // Permite que el contenedor se expanda
    marginHorizontal: 2, // Espacio horizontal entre los contenedores
  },
  button: {
    marginTop: 20, // Espacio superior antes del botón
  },
});