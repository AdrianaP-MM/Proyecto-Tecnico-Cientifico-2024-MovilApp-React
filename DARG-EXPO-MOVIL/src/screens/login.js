import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, TextInput, Text, TouchableRipple, Button } from 'react-native-paper';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={75} icon="alpha-d" style={styles.avatarIcon} />
        <Text variant="headlineSmall" style={styles.headerText}>Inicio de sesión</Text>
        <Text style={styles.subHeaderText}>Bienvenido a DARG</Text>
      </View>
      
      <TextInput
        label="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        left={<TextInput.Icon icon="account-circle" />}
      />
      <TextInput
        label="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
      />
      <View>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Text variant="bodyLarge" style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableRipple>
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('TabNavigator')}
        style={styles.button}
        theme={{ colors: { primary: '#BA181B' } }}
      >
        Iniciar sesión
      </Button>

      <View style={styles.registerContainer}>
        <Text style={styles.noAccountText}>¿No tienes cuenta? </Text>
        <TouchableRipple
          onPress={() => navigation.navigate('Registrate')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Text variant="bodyLarge" style={styles.registerText}>Registrate</Text>
        </TouchableRipple>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 90,
  },
  headerText: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  subHeaderText: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16, // Tamaño del texto más grande
  },
  avatarIcon: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#000',
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    textAlign: 'center', // Centrado horizontal
    fontSize: 15, // Tamaño del texto más grande
    marginTop: 20, // Espacio superior
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 5, // Hacer el botón más cuadrado
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noAccountText: {
    fontSize: 15,
  },
  registerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
  },
});
