import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Text from '../components/utilidades/text';
import Button from '../components/buttons/btnRojo';
import Input from '../components/inputs/allBorder';
import { StatusBar } from 'expo-status-bar';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    padding: 20,
  },
  containerTotal: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  avatarIcon: {
    marginBottom: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
