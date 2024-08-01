import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Text from '../components/utilidades/Text'; // Importa el componente de texto personalizado
import Button from '../components/buttons/ButtonRojo'; // Importa el botón personalizado
import Input from '../components/inputs/AllBorder'; // Importa el componente de entrada personalizado
import { StatusBar } from 'expo-status-bar'; // Importa la barra de estado
import { fillData } from '../utils/FillData';

export default function Login({ navigation }) {
  // Define los estados para el correo electrónico y la contraseña
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  /* // Función para manejar la entrada al sistema
  const handleLogin = async () => {
    // Creamos un objeto FormData para enviar los datos al servidor
    const formData = new FormData();
    formData.append('user_correo', email);
    formData.append('user_clave', password);

    try {
      const response = await fillData({
        php: 'usuarios_clientes',
        accion: 'logIn',
        method: 'POST',
        formData: formData
      });
      if (!response.error) {
        Alert.alert('Éxito', 'Auntenticacion completada.');
        navigation.navigate('PanelPrincipal'); // Navegamos a la pantalla 'Panel Principal'
      } else {
        Alert.alert('Error', response.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al auntenticarse.');
    }
  };*/

 

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <View style={styles.containerTotal}>
        <View style={styles.avatarContainer}>
          <Avatar.Icon size={75} icon="alpha-d" style={styles.avatarIcon} />
          <Text texto='Inicio de sesión' font='PoppinsBold' fontSize={20} />
          <Text texto='Bienvenido a DARG' font='PoppinsMedium' fontSize={14} />
        </View>
        <Input
          placeholder='Correo'
          value={email}
          onChangeText={setEmail}
          width='95%'
          iconImage={(require('../images/icons/iconUser.png'))}
        />
        <Input
          placeholder='Contraseña'
          value={password}
          onChangeText={setPassword}
          width='95%'
          iconImage={(require('../images/icons/iconLock.png'))}
          secureTextEntry={true}
        />
        <View>
          <TouchableRipple
            onPress={() => navigation.navigate('RestablecerContra')}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Text texto='¿Olvidaste tu contraseña?' font='PoppinsMedium' fontSize={14} textAlign='center' />
          </TouchableRipple>
        </View>
        <Button textoBoton='Iniciar sesión' accionBoton={() => navigation.navigate('TabNavigator')} fontSize={17} width='90%' marginTop={50} />
        <View style={styles.registerContainer}>
          <Text texto='¿No tienes cuenta? ' font='PoppinsRegular' fontSize={14} textAlign='center' />
          <TouchableRipple
            onPress={() => navigation.navigate('Registrate')}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <Text texto='Registrate' font='PoppinsSemiBold' fontSize={15} textAlign='center' color='red' />
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Hace que el contenedor ocupe todo el espacio disponible
    backgroundColor: '#F9FAFB', // Color de fondo
    justifyContent: 'center', // Centra el contenido verticalmente
    padding: 20, // Padding alrededor del contenedor
  },
  containerTotal: {
    width: '100%', // Ancho completo del contenedor
    backgroundColor: '#F9FAFB', // Color de fondo
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  avatarContainer: {
    alignItems: 'center', // Centra el avatar horizontalmente
    justifyContent: 'center', // Centra el avatar verticalmente
    marginBottom: 50, // Espacio debajo del avatar
  },
  avatarIcon: {
    marginBottom: 10, // Espacio debajo del icono del avatar
  },
  registerContainer: {
    flexDirection: 'row', // Organiza los elementos en fila
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center', // Centra el contenido verticalmente
    marginTop: 20, // Espacio encima del contenedor de registro
  },
});
