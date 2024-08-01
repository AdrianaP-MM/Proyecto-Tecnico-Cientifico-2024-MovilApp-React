import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Dialog, Portal, Provider, RadioButton, TouchableRipple } from 'react-native-paper';
import Text from '../components/utilidades/Text'; // Importa el componente de texto personalizado
import Button from '../components/buttons/ButtonRojo'; // Importa el botón personalizado
import Input from '../components/inputs/AllBorder'; // Importa el componente de entrada personalizado
import { StatusBar } from 'expo-status-bar'; // Importa la barra de estado

export default function Registrate({ navigation }) {
    // Define los estados para los campos del formulario
    const [nombres, setNombres] = React.useState('');
    const [apellidos, setApellidos] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [telefono, setTelefono] = React.useState('');
    const [contraseña, setContraseña] = React.useState('');
    const [confirmarContraseña, setconfirmarContraseña] = React.useState('');
    const [departemento, setdepartemento] = React.useState('');
    const [tipoUsuario, setTipoUsuario] = React.useState('');
    const [dui, setDui] = React.useState('');
    const [nit, setNit] = React.useState('');
    const [nrc, setNrc] = React.useState('');
    const [nrf, setNrf] = React.useState('');
    const [rubro, setRubro] = React.useState('');

    /*// Función para manejar la entrada el registro al sistema
    const handleRegistroNatural = async () => {
        // Creamos un objeto FormData para enviar los datos al servidor
        const formData = new FormData();
        formData.append('user_dui', dui);
        formData.append('user_telefono', telefono);
        formData.append('user_correo', correo);
        formData.append('user_clave', contraseña);
        formData.append('confirmarClave', confirmarContraseña);
        formData.append('user_nombres', nombres);
        formData.append('user_apellidos', apellidos);
        formData.append('user_tipo', tipoUsuario);
        formData.append('user_departamento', departemento);
        formData.append('user_nit', nit);
        

        try {
            const response = await fillData({
                php: 'usuarios_clientes',
                accion: 'signUpPersonaNatural',
                method: 'POST',
                formData: formData
            });
            if (!response.error) {
                Alert.alert('Éxito', 'Registro como persona natural exitoso.');
                navigation.navigate('login'); // Navegamos a la pantalla 'Panel Principal'
            } else {
                Alert.alert('Error', response.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema registrarse.');
        }
    };

    // Función para manejar la entrada el registro al sistema
    const handleRegistroJuridico = async () => {
        // Creamos un objeto FormData para enviar los datos al servidor
        const formData = new FormData();
        formData.append('user_dui', dui);
        formData.append('user_telefono', telefono);
        formData.append('user_correo', correo);
        formData.append('user_clave', contraseña);
        formData.append('confirmarClave', confirmarContraseña);
        formData.append('user_nombres', nombres);
        formData.append('user_apellidos', apellidos);
        formData.append('user_tipo', tipoUsuario);
        formData.append('user_departamento', departemento);
        formData.append('user_nit', nit);
        formData.append('user_nrc', nrc);
        formData.append('user_nrf', nrf);
        formData.append('user_rubro', rubro);

        try {
            const response = await fillData({
                php: 'usuarios_clientes',
                accion: 'signUpPersonaJuridica',
                method: 'POST',
                formData: formData
            });
            if (!response.error) {
                Alert.alert('Éxito', 'Registro como persona juridica exitoso.');
                navigation.navigate('login'); // Navegamos a la pantalla 'Panel Principal'
            } else {
                Alert.alert('Error', response.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema registrarse.');
        }
    };*/


    // Define los estados para los diálogos
    const [visiblePersonaDialog, setVisiblePersonaDialog] = React.useState(true);
    const [visibleCamposDialog, setVisibleCamposDialog] = React.useState(false);
    const [checked, setChecked] = React.useState('natural');
    const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);

    // Maneja el botón siguiente del primer diálogo
    const handleNext = () => {
        setVisiblePersonaDialog(false);
        if (checked === 'juridica') {
            setVisibleCamposDialog(true);
        }
    };

    // Navega a la pantalla de inicio de sesión
    const handleNavigate = () => {
        navigation.navigate('Login');
    };

    // Verifica si el correo es válido
    const hasErrors = () => {
        return !email.includes('@');
    };

    // Maneja el botón siguiente del segundo diálogo
    const handleNextCampos = () => {
        setVisibleCamposDialog(false);
        setShowAdditionalFields(true);
    };

    // Formatea el número de teléfono
    const formatTel = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 4) {
            return numericValue;
        } else if (numericValue.length <= 8) {
            return numericValue.slice(0, 4) + '-' + numericValue.slice(4);
        } else {
            return numericValue.slice(0, 4) + '-' + numericValue.slice(4, 8);
        }
    };

    // Formatea el DUI
    const formatDui = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 8) {
            return numericValue;
        } else {
            return numericValue.slice(0, 8) + '-' + numericValue.slice(8, 9);
        }
    };

    // Formatea el NIT
    const formatNit = (value) => {
        return value.replace(/\D/g, '').slice(0, 14);
    };

    return (
        <Provider>
            <Portal>
                <Dialog
                    visible={visiblePersonaDialog}
                    onDismiss={() => setVisiblePersonaDialog(false)}
                    style={styles.dialog}
                >
                    <Dialog.Title style={styles.dialogTitle}>
                        <Text texto='Elige tu persona' font='PoppinsSemiBold' fontSize={20} textAlign='center' color='#3B3939' />
                    </Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                            <View style={styles.radioContainer}>
                                <RadioButton value="natural" color="#BA181B" />
                                <Text texto='Persona natural' font='PoppinsRegular' fontSize={15} textAlign='center' color='#3B3939' />
                            </View>
                            <View style={styles.radioContainer}>
                                <RadioButton value="juridica" color="#BA181B" />
                                <Text texto='Persona jurídica' font='PoppinsRegular' fontSize={15} textAlign='center' color='#3B3939' />
                            </View>
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions style={styles.center}>
                        <Button textoBoton='Siguiente' accionBoton={handleNext} fontSize={15} width='55%' />
                    </Dialog.Actions>
                </Dialog>

                <Dialog
                    visible={visibleCamposDialog}
                    onDismiss={() => setVisibleCamposDialog(false)}
                    style={styles.dialog}
                >
                    <Dialog.Title style={styles.dialogTitle}>
                        <Text texto='Completa los siguientes campos' font='PoppinsSemiBold' fontSize={20} textAlign='center' color='#3B3939' />
                    </Dialog.Title>
                    <Dialog.Content>
                        <Input
                            placeholder='NRC'
                            width='95%'
                            iconImage={require('../images/icons/iconNrf.png')}
                        />
                        <Input
                            placeholder='NRF'
                            width='95%'
                            iconImage={require('../images/icons/iconNrf.png')}
                        />
                        <Input
                            placeholder='Rubro comercial'
                            width='95%'
                            iconImage={require('../images/icons/iconRubro.png')}
                        />
                    </Dialog.Content>
                    <Dialog.Actions style={styles.center}>
                        <Button textoBoton='Siguiente' accionBoton={handleNextCampos} fontSize={15} width='55%' />
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar.Icon size={75} icon="alpha-d" style={styles.avatarIcon} />
                    <Text texto='Registrate' font='PoppinsBold' fontSize={20} textAlign='center' />
                    <Text texto='¡Arregla tu carro con nosotros!' font='PoppinsRegular' fontSize={14} textAlign='center' />
                </View>
                <Input
                    placeholder='Nombres'
                    value={nombres}
                    onChangeText={setNombres}
                    width='95%'
                    iconImage={require('../images/icons/iconUser.png')}
                    style={styles.input}
                />
                <Input
                    placeholder='Apellidos'
                    value={apellidos}
                    onChangeText={setApellidos}
                    width='95%'
                    iconImage={require('../images/icons/iconUser.png')}
                    style={styles.input}
                />
                <Input
                    placeholder='Correo'
                    value={correo}
                    onChangeText={setCorreo}
                    width='95%'
                    iconImage={require('../images/icons/iconCorreo.png')}
                    style={styles.input}
                />
                <Input
                    placeholder='Contraseña'
                    value={contraseña}
                    onChangeText={setContraseña}
                    width='95%'
                    iconImage={require('../images/icons/iconContra.png')}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Input
                    placeholder='Confirmar contraseña'
                    value={confirmarContraseña}
                    onChangeText={setconfirmarContraseña}
                    width='95%'
                    iconImage={require('../images/icons/iconContra.png')}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Input
                    placeholder='Teléfono'
                    value={telefono}
                    onChangeText={(text) => setTelefono(formatTel(text))}
                    width='95%'
                    iconImage={require('../images/icons/iconTel.png')}
                    keyboardType='numeric'
                    maxLength={9}
                    style={styles.input}
                />
                <Input
                    placeholder='DUI'
                    value={dui}
                    onChangeText={(text) => setDui(formatDui(text))}
                    width='95%'
                    iconImage={require('../images/icons/iconDui.png')}
                    keyboardType='numeric'
                    maxLength={10}
                    style={styles.input}
                />
                <Input
                    placeholder='NIT'
                    value={nit}
                    onChangeText={(text) => setNit(formatNit(text))}
                    width='95%'
                    iconImage={require('../images/icons/iconNit.png')}
                    keyboardType='numeric'
                    maxLength={14}
                    style={styles.input}
                />
                /*Agregar un combobox para que el cliente elija el departamento*/
                <Button textoBoton='Registrate' accionBoton={() => navigation.navigate('TabNavigator')} fontSize={17} width='55%' />
                <View style={styles.loginContainer}>
                    <Text texto='¿Ya tienes cuenta? ' font='PoppinsRegular' fontSize={14} textAlign='center' />
                    <TouchableRipple
                        onPress={() => navigation.navigate('Login')}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <Text texto='Iniciar Sesión' font='PoppinsSemiBold' fontSize={15} textAlign='center' color='red' />
                    </TouchableRipple>
                </View>
            </ScrollView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9FAFB', // Color de fondo
        flexGrow: 1, // Permite el crecimiento del contenedor para llenar la pantalla
        justifyContent: 'center', // Centra el contenido verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
        padding: 20, // Espacio alrededor del contenedor
    },
    avatarContainer: {
        alignItems: 'center', // Centra el avatar horizontalmente
        marginVertical: 15, // Espacio vertical alrededor del avatar
    },
    avatarIcon: {
        marginBottom: 10, // Espacio debajo del icono del avatar
        backgroundColor: '#BA181B', // Color de fondo del avatar
    },
    input: {
        marginBottom: 20, // Espacio debajo de cada campo de entrada
        backgroundColor: 'white', // Color de fondo del campo de entrada
        borderColor: 'black', // Color del borde del campo de entrada
        borderWidth: 0.2, // Grosor del borde del campo de entrada
        borderRadius: 3, // Radio de borde del campo de entrada
        width: '95%', // Ancho del campo de entrada
        paddingHorizontal: 10, // Espacio horizontal dentro del campo de entrada
    },
    radioContainer: {
        flexDirection: 'row', // Organiza los elementos en fila
        alignItems: 'center', // Centra los elementos verticalmente
        marginVertical: 5, // Espacio vertical alrededor del contenedor de radio
    },
    dialog: {
        backgroundColor: 'white', // Color de fondo del diálogo
    },
    dialogTitle: {
        textAlign: 'center', // Centra el título del diálogo
        marginBottom: 25, // Espacio debajo del título del diálogo
    },
    loginContainer: {
        flexDirection: 'row', // Organiza los elementos en fila
        justifyContent: 'center', // Centra los elementos horizontalmente
        alignItems: 'center', // Centra los elementos verticalmente
        marginTop: 20, // Espacio encima del contenedor de inicio de sesión
    },
    center: {
        width: '100%', // Ancho completo del contenedor
        justifyContent: 'center', // Centra los elementos horizontalmente
        alignItems: 'center', // Centra los elementos verticalmente
    },
});
