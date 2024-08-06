import * as React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Dialog, Portal, Provider, RadioButton, TouchableRipple } from 'react-native-paper';
import Text from '../components/utilidades/Text'; // Import the custom Text component
import Button from '../components/buttons/ButtonRojo'; // Import the custom button
import Input from '../components/inputs/AllBorder'; // Import the custom input
import CustomPicker from '../components/inputs/ComboBox'; // Import the custom input
import { StatusBar } from 'expo-status-bar'; // Import the status bar

export default function Registrate({ navigation }) {
    // Define states for form fields
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

    // Define los states para los dialogos
    const [visiblePersonaDialog, setVisiblePersonaDialog] = React.useState(true);
    const [visibleCamposDialog, setVisibleCamposDialog] = React.useState(false);
    const [checked, setChecked] = React.useState('');
    const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);

    const departamentos = [
        { label: 'Departamento', value: '' },
        { label: 'Ahuachapán', value: 'Ahuachapán' },
        { label: 'Cabañas', value: 'Cabañas' },
        { label: 'Chalatenango', value: 'Chalatenango' },
        { label: 'Cuscatlán', value: 'Cuscatlán' },
        { label: 'La Libertad', value: 'La Libertad' },
        { label: 'La Paz', value: 'La Paz' },
        { label: 'La Unión', value: 'La Unión' },
        { label: 'Morazán', value: 'Morazán' },
        { label: 'San Miguel', value: 'San Miguel' },
        { label: 'San Salvador', value: 'San Salvador' },
        { label: 'San Vicente', value: 'San Vicente' },
        { label: 'Santa Ana', value: 'Santa Ana' },
        { label: 'Sonsonate', value: 'Sonsonate' },
        { label: 'Usulután', value: 'Usulután' },
    ]

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
    };


    // Handle the next button of the first dialog
    const handleNext = () => {
        setVisiblePersonaDialog(false);
        if (checked === 'juridica') {
            setVisibleCamposDialog(true);
        }
    };

    // Navigate to the login screen
    const handleNavigate = () => {
        navigation.navigate('Login');
    };

    // Check if the email is valid
    const hasErrors = () => {
        return !correo.includes('@');
    };

    // Handle the next button of the second dialog
    const handleNextCampos = () => {
        setVisibleCamposDialog(false);
        setShowAdditionalFields(true);
    };

    // Format the phone number
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

    // Format the DUI
    const formatDui = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 8) {
            return numericValue;
        } else {
            return numericValue.slice(0, 8) + '-' + numericValue.slice(8, 9);
        }
    };

    // Format the NIT
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
                        <RadioButton.Group
                            onValueChange={value => {
                                setChecked(value); // Actualiza el estado
                                console.log('Opción seleccionada:', value); // Imprime en consola la opción seleccionada
                            }}
                            value={checked}
                        >
                            <View style={styles.radioContainer}>
                                <RadioButton value="Persona natural" color="#BA181B" />
                                <Text
                                    texto="Persona natural"
                                    font="PoppinsRegular"
                                    fontSize={15}
                                    textAlign="center"
                                    color="#3B3939"
                                />
                            </View>
                            <View style={styles.radioContainer}>
                                <RadioButton value="Persona juridica" color="#BA181B" />
                                <Text
                                    texto="Persona jurídica"
                                    font="PoppinsRegular"
                                    fontSize={15}
                                    textAlign="center"
                                    color="#3B3939"
                                />
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
                            value={nrc}
                            onChangeText={setNrc}
                            width='95%'
                            iconImage={require('../images/icons/iconNrf.png')}
                        />
                        <Input
                            placeholder='NRF'
                            value={nrf}
                            onChangeText={setNrf}
                            width='95%'
                            iconImage={require('../images/icons/iconNrf.png')}
                        />
                        <Input
                            placeholder='Rubro comercial'
                            value={rubro}
                            onChangeText={setRubro}
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

                <CustomPicker
                    selectedValue={departemento}
                    onValueChange={(itemValue) => setdepartemento(itemValue)}
                    iconImage={require('../images/icons/iconDui.png')} // Cambia la ruta a la imagen de tu ícono
                    items={departamentos}
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
        backgroundColor: '#F9FAFB',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 15,
    },
    avatarIcon: {
        marginBottom: 10,
        backgroundColor: '#BA181B',
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.2,
        borderRadius: 3,
        width: '95%',
        paddingHorizontal: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    dialog: {
        backgroundColor: 'white',
    },
    dialogTitle: {
        textAlign: 'center',
        marginBottom: 25,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    center: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
