import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/utilidades/text';
import Button from '../components/buttons/btnRojo';
import Input from '../components/inputs/allBorder';

export default function AppRestablecerContra() {
    const navigation = useNavigation();
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1);
    };
    const handlePrevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    // Función para manejar la navegación a Pantalla1
    const navigateToPantalla1 = () => {
        navigation.navigate('Pantalla1');
    };
    return (
        <View style={styles.contenedorTotal}>
            {step === 1 && (
                <View style={styles.contenedor}>
                    <Text texto='¿Olvidó su contraseña?' font='PoppinsSemiBold' fontSize={25} />
                    <Text texto='¡No te preocupes! Ingresa el correo electrónico con el que te registraste, y te enviaremos un código de recuperación.'
                        font='PoppinsMedium' fontSize={13} textAlign='center' />
                    <Image
                        source={require('../images/personas/personImg.png')} // Ruta de tu imagen
                        style={styles.image}
                    />
                    <Input
                        placeholder='Correo'
                        width='95%'
                        iconImage={(require('../images/icons/iconUser.png'))}
                    />
                    <Button textoBoton='Siguiente' fontSize={17} width={250} accionBoton={handleNextStep} marginTop={35} marginBottom={55} />
                    <Text texto='Volver al inicio de sesión' font='PoppinsRegular' fontSize={15} color='#6A6A6A' />
                    <TouchableOpacity onPress={navigateToPantalla1}>
                        <Text texto='Aquí' font='PoppinsMedium' fontSize={15} color='#BA181B' />
                    </TouchableOpacity>
                </View>
            )}
            {step === 2 && (
                <View style={styles.contenedor}>
                    <Text texto='¡Revisa tu correo!' font='PoppinsSemiBold' fontSize={25} />
                    <Text texto='Ingresa el código que te enviamos en los espacios de abajo y reestablece tú contraseña.'
                        font='PoppinsMedium' fontSize={13} textAlign='center' />
                    <Image
                        source={require('../imagenes/personImg.png')} // Ruta de tu imagen
                        style={styles.image}
                    />
                    <View style={styles.contenedorInputs}>
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
            {step === 3 && (
                <View style={styles.contenedor}>
                    <Text texto='¡Último paso!' font='PoppinsSemiBold' fontSize={25} />
                    <Text texto='Ingresa tú nueva contraseña para volver a utilizar nuestra aplicación, ¡te extrañamos!.'
                        font='PoppinsMedium' fontSize={13} textAlign='center' />
                    <Image
                        source={require('../imagenes/person2Img.png')} // Ruta de tu imagen
                        style={styles.image2}
                    />
                    <Input
                        placeholder='Nueva contraseña'
                        width='95%'
                        iconImage={(require('../imagenes/iconLock.png'))}
                    />
                    <Input
                        placeholder='Confirmar contraseña'
                        width='95%'
                        iconImage={(require('../imagenes/iconLock.png'))}
                    />
                    <Button textoBoton='Restablecer' fontSize={17} width={250} accionBoton={navigateToPantalla1} marginTop={35} marginBottom={55} />
                    <TouchableOpacity onPress={handlePrevStep}>
                        <Text texto='Volver al paso anterior, Aquí' font='PoppinsRegular' fontSize={15} color='#6A6A6A' />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    contenedor: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    image: {
        marginVertical: 35,
        width: 250,
        height: 166,
    },
    col: {
        marginTop: 25,
    },
    contenedorInputs: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    image2: {
        marginVertical: 35,
        width: 210,
        height: 205,
    },
});
