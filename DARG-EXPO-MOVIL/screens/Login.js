import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, TextInput, Title } from 'react-native-paper';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={75       } icon="account" />
      </View>
      <Title style={styles.title}>Inicio de Sesión</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => navigation.navigate('MyCars')}>
        Iniciar Sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center', // Centra el avatar horizontalmente
     // Añade espacio entre el avatar y el título
    padding:100
},
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
});
