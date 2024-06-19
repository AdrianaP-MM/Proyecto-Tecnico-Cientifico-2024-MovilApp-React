import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import MyCarsScreen from './screens/MyCarsScreen';
import AddCarScreen from './screens/AddCarScreen';
import Login from './screens/Login';
import ButtonAction from './components/ButtonAction';
import EditarJuridico from './screens/EditarJuridico';
import EditarNatural from './screens/EditarNatural';
import Registrate from './screens/Registrate';
import Onboarding from './components/Onboarding';

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
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ title: '' }} />
        {/* <Stack.Screen name="Login" component={Login} options={{ title: 'Inicio de sesión' }} />
        <Stack.Screen name="Registrate" component={Registrate} options={{ title: 'Registrarse' }}/>
         <Stack.Screen name="MyCars" component={MyCarsScreen} options={{ title: 'Mis carros' }} />
          <Stack.Screen name="AddCar" component={AddCarScreen} options={{ title: 'Agregar vehiculo' }} /> 
          <Stack.Screen name="EditarJuridico" component={EditarJuridico} options={{ title: 'Editar persona juridica' }}/> 
          <Stack.Screen name="EditarNatural" component={EditarNatural} options={{ title: 'Editar persona natural' }}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
