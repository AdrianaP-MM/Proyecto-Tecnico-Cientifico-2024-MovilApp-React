import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import MyCarsScreen from './screens/MyCarsScreen';
import AddCarScreen from './screens/AddCarScreen';
import Login from './screens/login';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
/* import * as SplashScreen from 'expo-splash-screen'; */
import EditarJuridico from './screens/editar_juridico';
import EditarNatural from './screens/editar_natural';
import Registrate from './screens/Registrate';
import Onboarding from './screens/primer_uso';
import { View } from 'react-native';

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

function App() {
  const [fontsLoaded] = useFonts({
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

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ title: 'Primer uso' }} />
          <Stack.Screen name="Login" component={Login} options={{ title: 'Inicio de sesión' }} />
          <Stack.Screen name="Registrate" component={Registrate} options={{ title: 'Registrarse' }} />
          <Stack.Screen name="MyCarsScreen" component={MyCarsScreen} options={{ title: 'Mis carros' }} />
          <Stack.Screen name="AddCar" component={AddCarScreen} options={{ title: 'Agregar vehiculo' }} />
          <Stack.Screen name="EditarJuridico" component={EditarJuridico} options={{ title: 'Editar persona juridica' }} />
          <Stack.Screen name="EditarNatural" component={EditarNatural} options={{ title: 'Editar persona natural' }} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
