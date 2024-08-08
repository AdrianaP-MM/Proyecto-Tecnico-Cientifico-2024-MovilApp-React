import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native'; // Importa componentes necesarios de react-native
import { Avatar, TouchableRipple } from 'react-native-paper'; // Importa componentes necesarios de react-native-paper
import Text from '../components/utilidades/Text'; // Importa el componente de texto personalizado
import Button from '../components/buttons/ButtonRojo'; // Importa el botón personalizado
import Input from '../components/inputs/AllBorder'; // Importa el componente de entrada personalizado
import fetchData from '../utils/FetchData';
import * as ImagePicker from 'expo-image-picker';

// Componente principal que exporta la pantalla de edición jurídica
export default function EditarPerfil({ navigation }) {
    // Declaración de estados para cada campo de entrada
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [dui, setDui] = useState('');
    const [nit, setNit] = useState('');
    const [nrc, setNrc] = useState('');
    const [nrf, setNrf] = useState('');
    const [pickerValuesDepa, setPickerValuesDepa] = useState([]);
    const [pickerValuesRubro, setPickerValuesRubro] = useState([]);
    const [rubroSeleccionado, setRubroSeleccionado] = useState('');
    const [depaSeleccionado, setDepaSeleccionado] = useState('');

    const API = 'usuarios_clientes.php';
    const [see, setSee] = useState('0%');
    const [seeH, setSeeH] = useState('0%');
    const [opacity, setOpacity] = useState(0);

    const readElements = async () => {
        try {
            setPickerValuesDepa([
                { id: 'Ahuachapán', nombre: 'Ahuachapán' },
                { id: 'Cabañas', nombre: 'Cabañas' },
                { id: 'Chalatenango', nombre: 'Chalatenango' },
                { id: 'Cuscatlán', nombre: 'Cuscatlán' },
                { id: 'La Libertad', nombre: 'La Libertad' },
                { id: 'La Paz', nombre: 'La Paz' },
                { id: 'La Unión', nombre: 'La Unión' },
                { id: 'Morazán', nombre: 'Morazán' },
                { id: 'San Miguel', nombre: 'San Miguel' },
                { id: 'San Salvador', nombre: 'San Salvador' },
                { id: 'San Vicente', nombre: 'San Vicente' },
                { id: 'Santa Ana', nombre: 'Santa Ana' },
                { id: 'Sonsonate', nombre: 'Sonsonate' },
                { id: 'Usulután', nombre: 'Usulután' },
            ]);
            setPickerValuesRubro([
                { id: 'Ahuachapán', nombre: 'Ahuachapán' },
                { id: 'Cabañas', nombre: 'Cabañas' },
                { id: 'Chalatenango', nombre: 'Chalatenango' },
                { id: 'Cuscatlán', nombre: 'Cuscatlán' },
                { id: 'La Libertad', nombre: 'La Libertad' },
                { id: 'La Paz', nombre: 'La Paz' },
                { id: 'La Unión', nombre: 'La Unión' },
                { id: 'Morazán', nombre: 'Morazán' },
                { id: 'San Miguel', nombre: 'San Miguel' },
                { id: 'San Salvador', nombre: 'San Salvador' },
                { id: 'San Vicente', nombre: 'San Vicente' },
                { id: 'Santa Ana', nombre: 'Santa Ana' },
                { id: 'Sonsonate', nombre: 'Sonsonate' },
                { id: 'Usulután', nombre: 'Usulután' },
            ]);

            const readUser = await fetchData(API, 'readProfile');
            if (readUser.status) {
                const ROW = readUser.dataset;
                setNombre(ROW.nombres_cliente);
                setApellido(ROW.apellidos_cliente);
                setTelefono(ROW.telefono_cliente);
                setDepaSeleccionado(ROW.departamento_cliente);
                setCorreo(ROW.correo_cliente);
                setRubroSeleccionado(ROW.rubro_comercial);
                setDui(ROW.dui_cliente);
                setNit(ROW.NIT_cliente);
                setNrc(ROW.NRC_cliente);
                setNrf(ROW.NRF_cliente);

                if (ROW.tipo_cliente == 'Persona juridica') {
                    setOpacity(1); setSee('100%'); setSeeH('auto');
                    console.log(ROW.tipo_cliente);
                }
            }
        } catch (error) {
            console.log('ERROR');
        }
    }

    useEffect(() => {
        readElements();
    }, []);

    const handleCerrarSesion = async () => {
        try {
            const DATA = await fetchData(API, 'logOut');
            if (!DATA.error) {
                Alert.alert('Éxito', 'Sesesion cerrada.');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', DATA.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al cerrar sesion.');
        }
    };

    // Función para formatear el número de teléfono
    const formatTel = (value) => {
        const numericValue = value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
        if (numericValue.length <= 4) {
            return numericValue;
        } else if (numericValue.length <= 8) {
            return numericValue.slice(0, 4) + '-' + numericValue.slice(4);
        } else {
            return numericValue.slice(0, 4) + '-' + numericValue.slice(4, 8);
        }
    };

    // Función para formatear el DUI
    const formatDui = (value) => {
        const numericValue = value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
        if (numericValue.length <= 8) {
            return numericValue;
        } else {
            return numericValue.slice(0, 8) + '-' + numericValue.slice(8, 9);
        }
    };

    // Función para formatear el NIT
    const formatNit = (value) => {
        return value.replace(/\D/g, '').slice(0, 14); // Elimina caracteres no numéricos y limita a 14 dígitos
    };

    const validateFields = () => {
        if (!fechaLlegada || !horaLlegada || !autoSeleccionado || !movilizacionSeleccionada || !zonaHabilitada || !direccionIda || !direccionRegreso
            || autoSeleccionado == 0 || movilizacionSeleccionada == 0 || zonaHabilitada == 0) {
            Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
            return false;
        }
        return true;
    };

    // Función para navegar a otra pantalla
    const editProfile = async () => {
        const formData = new FormData();
        try {
            formData.append('user_dui', dui);
            formData.append('user_telefono', telefono);
            formData.append('user_correo', correo);
            formData.append('user_nombres', nombre);
            formData.append('user_apellidos', apellido);
            formData.append('user_departamento', depaSeleccionado);
            formData.append('user_nit', nit);
            if (opacity == 1) {
                formData.append('user_rubro', rubroSeleccionado);
                formData.append('user_nrc', nrc);
                formData.append('user_nrf', nrf);
            }
            const responseProfile = await fetchData(API, 'editProfile', formData);
            if (responseProfile.status) {
                Alert.alert('Éxito', `${responseProfile.message}`);
                readElements();
            } else {
                Alert.alert('Error', `${responseProfile.error}`);
            }
        } catch (error) {
            console.error('Error en actualizar el perfil:', error);
            Alert.alert('Error', 'Hubo un error.');
            console.log(formData)
        }
    };

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // Pide permiso para acceder a la galería
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Error', 'Lo siento, necesitamos permisos para acceder a tu galería.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const changeImage = async () => {
        pickImage();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#F9FAFB' }} // Contenedor principal que ajusta el comportamiento del teclado
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta el comportamiento del teclado dependiendo de la plataforma
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Ajuste vertical del teclado para iOS y otras plataformas
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar.Icon size={75} icon="alpha-c" style={styles.avatarIcon} />
                    <Text texto='Cuenta' font='PoppinsBold' fontSize={20} textAlign='center' />
                    <TouchableRipple
                        onPress={changeImage} // Acción al presionar el botón
                        rippleColor="rgba(0, 0, 0, .32)" // Color del efecto ripple
                        style={styles.changePhotoButton} // Estilos del botón
                    >
                        <Text texto='Cambiar foto de perfil' font='PoppinsRegular' fontSize={14} textAlign='center' color='#BA181B' />
                    </TouchableRipple>
                    <Button textoBoton='Cerrar sesion' accionBoton={handleCerrarSesion} fontSize={15} width={130} />
                </View>

                <View style={styles.ContainerInputs}>
                    <Input
                        placeholder='Nombres'
                        value={nombre}
                        onChangeText={setNombre}
                        width='100%'
                        iconImage={require('../images/icons/iconUser.png')}
                        maxLength={50}
                        style={styles.input}
                    />
                    <Input
                        placeholder='Apellidos'
                        value={apellido}
                        onChangeText={setApellido}
                        width='100%'
                        iconImage={require('../images/icons/iconUser.png')}
                        maxLength={50}
                        style={styles.input}
                    />
                    <Input
                        placeholder='Teléfono'
                        value={telefono}
                        onChangeText={(text) => setTelefono(formatTel(text))}
                        width='100%'
                        iconImage={require('../images/icons/iconTel.png')}
                        keyboardType='numeric'
                        maxLength={9}
                        style={styles.input}
                    />
                    <Input
                        placeholder='Departamento'
                        value={depaSeleccionado}
                        onChangeText={setDepaSeleccionado} // Actualiza el estado
                        keyboardType='picker'
                        pickerValues={pickerValuesDepa}
                    />
                    <Input
                        placeholder='Correo'
                        value={correo}
                        onChangeText={setCorreo}
                        width='100%'
                        iconImage={require('../images/icons/iconCorreo.png')}
                        maxLength={50}
                        style={styles.input}
                    />
                    <Input
                        placeholder='Rubro comercial'
                        value={rubroSeleccionado}
                        onChangeText={setRubroSeleccionado} // Actualiza el estado
                        keyboardType='picker'
                        pickerValues={pickerValuesRubro}
                        width={see}
                        opacity={opacity}
                        height={seeH}
                    />

                    <View style={styles.dui_nit}>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='DUI'
                                value={dui}
                                onChangeText={(text) => setDui(formatDui(text))}
                                width='100%'
                                iconImage={require('../images/icons/iconDui.png')}
                                keyboardType='numeric'
                                maxLength={10}
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='NIT'
                                value={nit}
                                onChangeText={(text) => setNit(formatNit(text))}
                                width='100%'
                                iconImage={require('../images/icons/iconNit.png')}
                                keyboardType='numeric'
                                maxLength={17}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={[styles.dui_nit, { height: seeH }]}>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='NRC'
                                value={nrc}
                                onChangeText={setNrc}
                                iconImage={require('../images/icons/iconNrf.png')}
                                keyboardType='numeric'
                                maxLength={11}
                                width={see}
                                opacity={opacity}
                                height={seeH}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='NRF'
                                value={nrf}
                                onChangeText={setNrf}
                                iconImage={require('../images/icons/iconNrf.png')}
                                keyboardType='numeric'
                                maxLength={11}
                                width={see}
                                opacity={opacity}
                                height={seeH}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button textoBoton='Actualizar' accionBoton={editProfile} fontSize={15} width='38%' />
                        <Button textoBoton='Cambiar contraseña' accionBoton={handleCerrarSesion} fontSize={15} width='52%' />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// Estilos definidos con StyleSheet
const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Permite que el contenedor crezca para ocupar el espacio disponible
        justifyContent: 'center', // Centra el contenido verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
        padding: 20, // Padding alrededor del contenedor
        paddingBottom: 80, // Padding adicional en la parte inferior
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: '100%',
    },
    avatarContainer: {
        alignItems: 'center', // Centra el contenido horizontalmente
        paddingBottom: 35, // Reducido el padding vertical para acercar los inputs al botón
        paddingTop: 35,
    },
    avatarIcon: {
        marginBottom: 10, // Espacio debajo del icono del avatar
        backgroundColor: '#BA181B', // Color de fondo del icono del avatar
    },
    ContainerInputs: {
        width: '100%', // Ancho completo del contenedor
        paddingHorizontal: 20, // Padding horizontal
        paddingBottom: 20, // Padding inferior
    },
    input: {
        marginBottom: 10, // Espacio debajo de cada input
        backgroundColor: 'white', // Color de fondo blanco para el input
        borderColor: 'black', // Color del borde del input
        borderWidth: 0.2, // Grosor del borde del input
        borderRadius: 3, // Radio del borde del input
        width: '100%', // Ancho completo del input
        paddingHorizontal: 10, // Padding horizontal dentro del input
    },
    dui_nit: {
        flexDirection: 'row', // Organiza los elementos en una fila
        justifyContent: 'space-between', // Espacio entre los elementos
        alignItems: 'center', // Alinea los elementos en el centro verticalmente
        width: '100%', // Ancho completo del contenedor
    },
    inputContainer: {
        flex: 1, // Permite que el contenedor se expanda
        marginHorizontal: 5, // Espacio horizontal entre los contenedores
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', // Centra el contenido horizontalmente
        marginTop: 20, // Espacio superior antes del botón
    },
});