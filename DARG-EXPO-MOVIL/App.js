import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import PanelPrincipal from './src/screens/panel_principal.js';
import Login from './src/screens/login.js';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import EditarJuridico from './src/screens/editar_juridico.js';
import EditarNatural from './src/screens/editar_natural.js';
import Registrate from './src/screens/registro.js';
import RestablecerContra from './src/screens/restablecer_contra.js';
import Onboarding from './src/screens/primer_uso.js';
import { View } from 'react-native';
import TabNavigator from './src/tabNavigator/TabNavigator.js';

const Stack = createStackNavigator();

// Se le ha colocado como color por defecto el rojo 
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#E00D11',
    accent: '#03dac4',
  },

};

export default function App() {
  const [fontsLoaded] = useFonts({
    'PoppinsBold': require('../DARG-EXPO-MOVIL/assets/fuentes/Poppins-Bold.ttf'),
    'PoppinsSemiBold': require('../DARG-EXPO-MOVIL/assets/fuentes/Poppins-SemiBold.ttf'),
    'PoppinsRegular': require('../DARG-EXPO-MOVIL/assets/fuentes/Poppins-Regular.ttf'),
    'PoppinsMedium': require('../DARG-EXPO-MOVIL/assets/fuentes/Poppins-Medium.ttf'),
    'PoppinsLight': require('../DARG-EXPO-MOVIL/assets/fuentes/Poppins-Light.ttf'),
    'PoppinsLightItalic': require('../DARG-EXPO-MOVIL/assets/fuentes/Poppins-LightItalic.ttf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Evita que el SplashScreen se oculte automáticamente
        await SplashScreen.preventAutoHideAsync();

        // Hace una pausa de 3 segundos (esto es opcional, solo como ejemplo)
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Cuando las fuentes estén cargadas, oculta el SplashScreen
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepareApp();
  }, [fontsLoaded]);

  // Muestra un indicador de carga mientras se prepara la aplicación
  if (!appIsReady) {
    return null; // o muestra un componente de carga
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ title: 'Primer uso' }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Registrate" component={Registrate} options={{ title: 'Registrarse' }} />
          <Stack.Screen name="RestablecerContra" component={RestablecerContra} options={{ headerShown: false }}/>
          <Stack.Screen name="EditarJuridico" component={EditarJuridico} options={{ title: 'Editar persona juridica' }} />
          <Stack.Screen name="EditarNatural" component={EditarNatural} options={{ title: 'Editar persona natural' }} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
