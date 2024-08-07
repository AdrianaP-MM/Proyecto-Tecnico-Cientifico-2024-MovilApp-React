import * as React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Avatar, Provider, TouchableRipple, Dialog, Portal } from 'react-native-paper';
import Text from '../components/utilidades/Text'; // Importa el componente de texto personalizado
import Button from '../components/buttons/ButtonRojo'; // Importa el botón personalizado
import Input from '../components/inputs/AllBorder'; // Importa el componente de entrada personalizado
import { StatusBar } from 'expo-status-bar'; // Importa la barra de estado
import fetchData from '../utils/FetchData';

export default function Login({ navigation }) {
  // Define los estados para el correo electrónico y la contraseña
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [codigo, setCodigo] = React.useState('');
  const [passwordReset, setpasswordReset] = React.useState('');
  const API = 'usuarios_clientes.php';


  const [visiblePersonaDialog, setVisiblePersonaDialog] = React.useState(true);
  const [visibleCamposDialog, setVisibleCamposDialog] = React.useState(false);
  const [visibleCamposCodigo, setvisibleCamposCodigo] = React.useState(false);
  const [visibleCamposContraseña, setvisibleCamposContraseña] = React.useState(false);

  const handleLogin = async () => {

    // Validar que los campos no estén vacíos
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return; // Salir de la función si alguno de los campos está vacío
    }

    // Creamos un objeto FormData para enviar los datos al servidor
    const formData = new FormData();
    formData.append('user_correo', email);
    formData.append('user_clave', password);

    try {
      const DATA = await fetchData(API, 'logIn', formData);

      if (!DATA.error) {
        Alert.alert('Éxito', 'Auntenticacion completada.');
        navigation.navigate('TabNavigator'); // Navegamos a la pantalla 'Panel Principal'
        setEmail('');
        setPassword('');
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al auntenticarse.');
    }
  };

  const handleCerrarSesion = async () => {
    try {
      const DATA = await fetchData(API, 'logOut');
      if (!DATA.error) {
        Alert.alert('Éxito', 'Sesesion cerrada.');
      } else {
        Alert.alert('Error', DATA.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al cerrar sesion.');
    }
  };

  // Handle the next button of the first dialog
  const handleNext = () => {
    setVisiblePersonaDialog(false);
    if (checked === 'Persona juridica') {
      setVisibleCamposDialog(true);
    }
  };


  const handleAbrirDialogo = () => {
    // Si todos los campos están llenos, cerrar el diálogo y proceder
    setVisibleCamposDialog(true);
  };

  const handleAbrirCodigo = () => {
    // Si todos los campos están llenos, cerrar el diálogo y proceder
    setVisibleCamposDialog(false);
    setvisibleCamposCodigo(true);
  };

  const handleAbrirCambiarContraseña = () => {
    // Si todos los campos están llenos, cerrar el diálogo y proceder
    setvisibleCamposCodigo(false);
    setvisibleCamposContraseña(true);
  };

  const handlePasswordRessetExitoso = () => {
    // Si todos los campos están llenos, cerrar el diálogo y proceder
    setvisibleCamposContraseña(false);
    Alert.alert('Exito', 'Ahora puede iniciar sesion');
  };

  return (

    <Provider>

      <Portal>
        <Dialog //Dialogo para pedir el correo del cliente y asi enviar el codigo y luego cambiar la contraseña
          visible={visibleCamposDialog}
          onDismiss={() => setVisibleCamposDialog(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <Text texto='Contraseña no segura, ayudanos a cambiarla' font='PoppinsSemiBold' fontSize={20} textAlign='center' color='#3B3939' />
          </Dialog.Title>
          <Dialog.Content>
            <Input
              placeholder='Correo'
              value={email}
              onChangeText={setEmail}
              width='95%'
              iconImage={(require('../images/icons/iconUser.png'))}
            />
          </Dialog.Content>
          <Dialog.Actions style={styles.center}>
            <Button textoBoton='Siguiente' accionBoton={handleAbrirCodigo} fontSize={15} width='55%' />
          </Dialog.Actions>
        </Dialog>

        <Dialog //Dialogo para ingresar el codigo proporcionado al correo
          visible={visibleCamposCodigo}
          onDismiss={() => setvisibleCamposCodigo(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <Text texto='Ingresa el codigo que te enviamos al correo' font='PoppinsSemiBold' fontSize={20} textAlign='center' color='#3B3939' />
          </Dialog.Title>
          <Dialog.Content>
            <Input
              placeholder='Codigo'
              value={codigo}
              onChangeText={setCodigo}
              width='95%'
              iconImage={(require('../images/icons/iconContra.png'))}
            />
          </Dialog.Content>
          <Dialog.Actions style={styles.center}>
            <Button textoBoton='Siguiente' accionBoton={handleAbrirCambiarContraseña} fontSize={15} width='55%' />
          </Dialog.Actions>
        </Dialog>

        <Dialog //Dialogo para cambiar contraseña
          visible={visibleCamposContraseña}
          onDismiss={() => setvisibleCamposContraseña(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <Text texto='Ingresa una nueva contraseña' font='PoppinsSemiBold' fontSize={20} textAlign='center' color='#3B3939' />
          </Dialog.Title>
          <Dialog.Content>
            <Input
              placeholder='Nueva contraseña'
              value={passwordReset}
              onChangeText={setpasswordReset}
              width='95%'
              iconImage={(require('../images/icons/iconContra.png'))}
            />
          </Dialog.Content>
          <Dialog.Actions style={styles.center}>
            <Button textoBoton='Siguiente' accionBoton={handlePasswordRessetExitoso} fontSize={15} width='55%' />
          </Dialog.Actions>
        </Dialog>

      </Portal>

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
          <Button textoBoton='Iniciar sesión' accionBoton={handleLogin} fontSize={17} width='90%' marginTop={50} />
          <Button textoBoton='cerrar wea' accionBoton={handleCerrarSesion} fontSize={17} width='90%' marginTop={50} />
          <Button textoBoton='Abrir dialogo' accionBoton={handleAbrirDialogo} fontSize={17} width='90%' marginTop={50} />
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
    </Provider>
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
    backgroundColor: '#BA181B',
  },
  registerContainer: {
    flexDirection: 'row', // Organiza los elementos en fila
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center', // Centra el contenido verticalmente
    marginTop: 20, // Espacio encima del contenedor de registro
  },
  dialog: {
    borderRadius: 10,
    backgroundColor: 'white'
  },
});
