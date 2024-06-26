import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/utilidades/text'; // Importación del componente de texto personalizado
import Button from '../components/buttons/btnRojo'; // Importación del componente de botón personalizado
import Input from '../components/inputs/allBorder'; // Importación del componente de entrada de texto personalizado

export default function AppRestablecerContra() {
    const navigation = useNavigation();
    const [step, setStep] = useState(1); // Estado para controlar el paso del proceso de restablecimiento

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1); // Función para avanzar al siguiente paso
    };
    const handlePrevStep = () => {
        setStep(prevStep => prevStep - 1); // Función para retroceder al paso anterior
    };

    return (
        <View style={styles.contenedorTotal}>
            {/* Paso 1: Ingresar correo */}
            {step === 1 && (
                <View style={styles.contenedor}>
                    <Text texto='¿Olvidó su contraseña?' font='PoppinsSemiBold' fontSize={25} />
                    <Text texto='¡No te preocupes! Ingresa el correo electrónico con el que te registraste, y te enviaremos un código de recuperación.'
                        font='PoppinsMedium' fontSize={13} textAlign='center' />
                    <Image
                        source={require('../images/personas/personImg.png')} // Ruta de la imagen
                        style={styles.image}
                    />
                    <Input
                        placeholder='Correo'
                        width='95%'
                        iconImage={(require('../images/icons/iconUser.png'))}
                    />
                    <Button textoBoton='Siguiente' fontSize={17} width={250} accionBoton={handleNextStep} marginTop={35} marginBottom={55} />
                    <Text texto='Volver al inicio de sesión' font='PoppinsRegular' fontSize={15} color='#6A6A6A' />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text texto='Aquí' font='PoppinsMedium' fontSize={15} color='#BA181B' />
                    </TouchableOpacity>
                </View>
            )}
            {/* Paso 2: Ingresar codigo de verificacion */}
            {step === 2 && (
                <View style={styles.contenedor}>
                    <Text texto='¡Revisa tu correo!' font='PoppinsSemiBold' fontSize={25} />
                    <Text texto='Ingresa el código que te enviamos en los espacios de abajo y reestablece tú contraseña.'
                        font='PoppinsMedium' fontSize={13} textAlign='center' />
                    <Image
                        source={require('../images/personas/personImg.png')} // Ruta de tu imagen
                        style={styles.image}
                    />
                    <View style={styles.contenedorInputs}>
                        {/* Inputs para los digitos del codigo */}
                        <Input
                            placeholder='1'
                            keyboardType='numeric'
                            maxLength={1}
                            width='20%'
                            textAlign='center'
                        />
                        <Input
                            placeholder='2'
                            keyboardType='numeric'
                            maxLength={1}
                            width='20%'
                            textAlign='center'
                        />
                        <Input
                            placeholder='3'
                            keyboardType='numeric'
                            maxLength={1}
                            width='20%'
                            textAlign='center'
                        />
                        <Input
                            placeholder='4'
                            keyboardType='numeric'
                            maxLength={1}
                            width='20%'
                            textAlign='center'
                        />
                    </View>
                    <Button textoBoton='Aceptar' fontSize={17} width={250} accionBoton={handleNextStep} marginTop={35} marginBottom={55} />
                    <Text texto='¿No te ha caído nada?' font='PoppinsRegular' fontSize={15} color='#6A6A6A' />
                    <TouchableOpacity>
                        <Text texto='Vuelve a generarlo aquí' font='PoppinsMedium' fontSize={15} color='#BA181B' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePrevStep} style={styles.col}>
                        <Text texto='Volver al paso anterior, Aquí' font='PoppinsRegular' fontSize={15} color='#6A6A6A' />
                    </TouchableOpacity>
                </View>
            )}
            {/* Paso 3: Ingresar tu nueva contraseña */}
            {step === 3 && (
                <View style={styles.contenedor}>
                    <Text texto='¡Último paso!' font='PoppinsSemiBold' fontSize={25} />
                    <Text texto='Ingresa tú nueva contraseña para volver a utilizar nuestra aplicación, ¡te extrañamos!.'
                        font='PoppinsMedium' fontSize={13} textAlign='center' />
                    <Image
                        source={require('../images/personas/person2Img.png')} // Ruta de la imagen
                        style={styles.image2}
                    />
                    <Input
                        placeholder='Nueva contraseña'
                        width='95%'
                        iconImage={(require('../images/icons/iconLock.png'))} // Icono de candado
                        secureTextEntry={true}
                    />
                    <Input
                        placeholder='Confirmar contraseña'
                        width='95%'
                        iconImage={(require('../images/icons/iconLock.png'))} // Icono de candado
                        secureTextEntry={true}
                    />
                    <Button textoBoton='Restablecer' fontSize={17} width={250} accionBoton={() => navigation.navigate('Login')} marginTop={35} marginBottom={55} />
                    <TouchableOpacity onPress={handlePrevStep}>
                        <Text texto='Volver al paso anterior, Aquí' font='PoppinsRegular' fontSize={15} color='#6A6A6A' />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

// Estilos para los componentes de la pantalla de restablecimiento de contraseña
const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: '#F9FAFB', // Fondo gris claro
        alignItems: 'center', // Alinea elementos al centro horizontalmente
        justifyContent: 'center', // Alinea elementos al centro verticalmente
        padding: 20, // Relleno de 20 unidades en todos los lados
    },
    contenedor: {
        height: 'auto', // Altura automática basada en su contenido
        width: '100%', // Ancho completo
        backgroundColor: '#F9FAFB', // Fondo gris claro
        alignItems: 'center', // Alinea elementos al centro horizontalmente
        justifyContent: 'center', // Alinea elementos al centro verticalmente
        padding: 0, // Sin relleno adicional
    },
    image: {
        marginVertical: 35, // Margen vertical de 35 unidades para la imagen
        width: 250, // Ancho fijo de 250 unidades para la imagen
        height: 166, // Altura fija de 166 unidades para la imagen
    },
    col: {
        marginTop: 25, // Margen superior de 25 unidades para el texto con enlace
    },
    contenedorInputs: {
        flexDirection: 'row', // Disposición en fila para los inputs de código
        width: '100%', // Ancho completo
        justifyContent: 'space-around', // Espacio uniformemente distribuido entre elementos
    },
    image2: {
        marginVertical: 35, // Margen vertical de 35 unidades para la imagen
        width: 210, // Ancho fijo de 210 unidades para la imagen
        height: 205, // Altura fija de 205 unidades para la imagen
    },
});
