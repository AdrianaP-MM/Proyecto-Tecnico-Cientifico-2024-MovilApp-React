import * as React from 'react'; // Importa todas las funcionalidades de React
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'; // Importa componentes necesarios de react-native
import { Avatar, TouchableRipple } from 'react-native-paper'; // Importa componentes necesarios de react-native-paper
import Text from '../components/utilidades/text'; // Importa el componente de texto personalizado
import Button from '../components/buttons/ButtonRojo'; // Importa el botón personalizado
import Input from '../components/inputs/allBorder'; // Importa el componente de entrada personalizado


// Componente principal que exporta la pantalla de edición jurídica
export default function EditarJuridico({ navigation }) {
    // Declaración de estados para cada campo de entrada
    const [nombre, setNombre] = React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [departamento, setDepartamento] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [dui, setDui] = React.useState('');
    const [nit, setNit] = React.useState('');
    const [nrc, setNrc] = React.useState('');
    const [nrf, setNrf] = React.useState('');

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

    // Función para navegar a otra pantalla
    const handleNavigate = () => {
        navigation.navigate('TabNavigator');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#F9FAFB' }} // Contenedor principal que ajusta el comportamiento del teclado
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta el comportamiento del teclado dependiendo de la plataforma
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Ajuste vertical del teclado para iOS y otras plataformas
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar.Icon size={75} icon="account" style={styles.avatarIcon} />
                    <Text texto='Empresa' font='PoppinsBold' fontSize={20} textAlign='center' />
                    <TouchableRipple
                        onPress={() => console.log('Pressed')} // Acción al presionar el botón
                        rippleColor="rgba(0, 0, 0, .32)" // Color del efecto ripple
                        style={styles.changePhotoButton} // Estilos del botón
                    >
                        <Text texto='Cambiar foto de perfil' font='PoppinsRegular' fontSize={14} textAlign='center' color='#BA181B' />
                    </TouchableRipple>
                </View>

                <View style={styles.ContainerInputs}> 
                    <Input
                        placeholder='Nombre'
                        value={nombre}
                        onChangeText={setNombre}
                        width='100%' // Cambiado a 100% para ocupar el ancho completo
                        style={styles.input}
                    />

                    <Input
                        placeholder='Apellido'
                        value={apellido}
                        onChangeText={setApellido}
                        width='100%' // Cambiado a 100% para ocupar el ancho completo
                        style={styles.input}
                    />

                    <Input
                        placeholder='Departamento'
                        value={departamento}
                        onChangeText={setDepartamento}
                        width='100%' // Cambiado a 100% para ocupar el ancho completo
                        style={styles.input}
                    />

                    <Input
                        placeholder='Correo@ejemplo.com'
                        value={correo}
                        onChangeText={setCorreo}
                        width='100%' // Cambiado a 100% para ocupar el ancho completo
                        style={styles.input}
                    />

                    <View style={styles.dui_nit}>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='DUI'
                                value={dui}
                                onChangeText={(text) => setDui(formatDui(text))}
                                width='100%' // Cambiado a 100% para ocupar el ancho completo
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
                                width='100%' // Cambiado a 100% para ocupar el ancho completo
                                keyboardType='numeric'
                                maxLength={14}
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={styles.dui_nit}>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='NRC'
                                value={nrc}
                                onChangeText={setNrc}
                                width='100%' // Cambiado a 100% para ocupar el ancho completo
                                keyboardType='numeric'
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='NRF'
                                value={nrf}
                                onChangeText={setNrf}
                                width='100%' // Cambiado a 100% para ocupar el ancho completo
                                keyboardType='numeric'
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button textoBoton='Actualizar' accionBoton={handleNavigate} fontSize={17} width='55%' />
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
    avatarContainer: {
        alignItems: 'center', // Centra el contenido horizontalmente
        paddingBottom: 10, // Reducido el padding vertical para acercar los inputs al botón
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
        alignItems: 'center', // Centra el contenido horizontalmente
        marginTop: 20, // Espacio superior antes del botón
    },
});