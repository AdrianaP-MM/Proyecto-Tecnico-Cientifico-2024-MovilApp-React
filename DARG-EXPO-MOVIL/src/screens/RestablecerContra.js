import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../components/utilidades/Text'; // Importación del componente de texto personalizado
import Button from '../components/buttons/ButtonRojo'; // Importación del componente de botón personalizado
import Input from '../components/inputs/AllBorder'; // Importación del componente de entrada de texto personalizado

import { correoValidate, formatNOSpaces, validateEmail, formatEmail, validatePassword } from '../utils/Validator'
import fetchData from '../utils/FetchData';

export default function AppRestablecerContra() {

    const navigation = useNavigation();
    const [step, setStep] = useState(1); // Estado para controlar el paso del proceso de restablecimiento

    const handleNextStep = () => {
        setStep(prevStep => prevStep + 1); // Función para avanzar al siguiente paso
    };
    const handlePrevStep = () => {
        setStep(prevStep => prevStep - 1); // Función para retroceder al paso anterior
    };

    //---------------- Constantes y funciones utilizadas para mandar el correo electronico
    const [correo, setCorreo] = useState(''); // Estado para almacenar el correo electrónico ingresado
    const [codeSend, setCodeSend] = useState('');
    const [isValidCorreo, setIsValidCorreo] = useState(false); // Estado para verificar si el correo es válido

    // Función para enviar el código de verificación al correo ingresado
    const handleSendCode = async () => {
        if (correoValidate(correo)) {
            const formData = new FormData();
            formData.append('user_correo', correo);
            try {
                const confirmCorreo = await fetchData('usuarios_clientes.php', 'checkCorreo', formData);
                // Validar y usar la respuesta de tallas
                if (confirmCorreo.status) {
                    console.log('El usuario con correo existe', confirmCorreo);

                    const sendCorreo = await fetchData('usuarios_clientes.php', 'enviarCodigoRecuperacion', formData);
                    //console.log(formData)
                    if (sendCorreo.status) {
                        Alert.alert('Éxito', 'El código ha sido enviado correctamente al correo electrónico');
                        setCodeSend(sendCorreo.codigo);
                        console.log('Código: ', sendCorreo.codigo)
                        return true;
                    } else {
                        Alert.alert('Error', sendCorreo.error);
                        return false;
                    }
                } else {
                    Alert.alert('No se encontró el usuario', 'Necesita un usuario con ese correo electrónico para restablecer su contraseña');
                    return false;
                }

            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Hubo un problema al enviar el código.');
                return false;
            }
        } else {
            Alert.alert('Error', 'El dominio del correo electrónico no es válido.');
            return false;
        }

    };

    // Función para manejar el envío del correo 1
    function sendCorreo1() {
        // Llamar handleSendCode y luego handleNextStep si handleSendCode devuelve verdadero
        handleSendCode().then((success) => {
            if (success) {
                handleNextStep(); // Ejecutar la siguiente acción después del éxito del envío del código
            }
        });
    }

    // Función para manejar el envío del correo 2
    function sendCorreo2() {
        handleSendCode(); // Llamar handleSendCode directamente
    }

    // Función para manejar el cambio en el campo de texto del correo electrónico
    const handleEmailChange = (correo) => {
        setCorreo(formatEmail(correo)); // Actualiza el estado 'correo' con el valor ingresado
        setIsValidCorreo(validateEmail(correo)); // Actualiza el estado 'isValidEmail' con el resultado de la validación
    };

    //---------------------- Constantes y funciones utilizadas para confirmar el código
    const [codeInputs, setCodeInputs] = useState(['', '', '', '', '', '', '', '']);

    const handleConcatenate = () => {
        // Verificar si todos los inputs están completos
        for (let i = 0; i < codeInputs.length; i++) {
            if (codeInputs[i].trim() === '') {
                Alert.alert('Error', 'Por favor complete todos los campos.');
                return;
            }
        }

        // Concatenar los valores de los inputs
        const concatenatedCode = codeInputs.join('');
        console.log('Código concatenado:', concatenatedCode);
        handleVerify(concatenatedCode);

        // Aquí podrías hacer algo con el código concatenado, como enviarlo a un servidor, etc.
    };

    // Función para manejar la verificación del código
    const handleVerify = (code) => {
        console.log('Código verify: ', codeSend)
        if (code.trim() === codeSend) {
            Alert.alert('Éxito', 'Código ingresado correctamente');
            handleNextStep();
        } else {
            Alert.alert('Error', 'El código no coincide con el que se le envió en el correo.');
        }
    };

    const handleInputChange = (text, index) => {
        // Actualizar el estado de los inputs cuando se modifica el texto
        const newInputs = [...codeInputs];
        newInputs[index] = text;
        setCodeInputs(newInputs);
    };
    //---------------------- Constantes y funciones utilizadas para restablecer la contraseña
    const [contra, setContra] = useState(''); // Estado para almacenar el correo electrónico ingresado
    const [confirmContra, setConfirmContra] = useState('');

    // Función para manejar el restablecimiento de la contraseña

    const validateFields = () => {
        if (!contra || !correo) {
            Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
            return false;
        }

        if (contra.length < 8 || confirmContra.length < 8) {
            Alert.alert('Error', 'La contraseña es menor a 8 caracteres.');
            return false;
        }

        // Valida el correo electrónico
        if (!validatePassword(contra)) {
            Alert.alert('Campos incorrectos', 'La contraseña debe de tener almenos una letra mayuscula, una letra minuscula, un numero y un simbolo.');
            return false;
        }

        return true;
    };


    const handleResetPassword = async () => {
        if (contra !== confirmContra) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }
        if (!validateFields()) return;

        // Creamos un objeto FormData para enviar los datos al servidor
        const formData = new FormData();
        formData.append('user_contra', contra);
        formData.append('user_correo', correo);

        try {
            const response = await fetchData('usuarios_clientes.php', 'updatePassword', formData);

            if (response.status) {
                Alert.alert('Éxito', 'Contraseña restablecida correctamente');
                navigation.navigate('Login'); // Navegamos a la pantalla 'Login'
            } else {
                Alert.alert('Error', response.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al restablecer la contraseña.');
        }
    };



    return (
        <View style={styles.contenedorTotal}>
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
                        value={correo}
                        onChangeText={handleEmailChange}
                    />

                    <Button
                        textoBoton='Siguiente'
                        fontSize={17}
                        width={250}
                        marginTop={35}
                        marginBottom={55}

                        isValidCorreo={isValidCorreo}
                        accionBoton={sendCorreo1} />

                    <Text texto='Volver al inicio de sesión' font='PoppinsRegular' fontSize={15} color='#6A6A6A' />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
                        source={require('../images/personas/personImg.png')} // Ruta de tu imagen
                        style={styles.image}
                    />
                    <View style={styles.contenedorInputs}>
                        {codeInputs.map((value, index) => (
                            <Input
                                key={index}
                                width='12%'
                                placeholder={(index + 1).toString()}
                                maxLength={1}
                                textAlign='center'
                                value={value}
                                onChangeText={(text) => handleInputChange(text, index)}
                            />
                        ))}
                    </View>
                    <Button
                        textoBoton='Aceptar'
                        fontSize={17}
                        width={250}
                        marginTop={35}
                        marginBottom={55}
                        accionBoton={handleConcatenate} />
                    <Text texto='¿No te ha caído nada?' font='PoppinsRegular' fontSize={15} color='#6A6A6A' />
                    <TouchableOpacity onPress={sendCorreo2}>
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
                        source={require('../images/personas/person2Img.png')} // Ruta de la imagen
                        style={styles.image2}
                    />
                    <Input
                        placeholder='Nueva contraseña'
                        width='95%'
                        iconImage={(require('../images/icons/iconLock.png'))} // Icono de candado
                        secureTextEntry={true}
                        value={contra}
                        onChangeText={(text) => setContra(formatNOSpaces(text))}
                        maxLength={16}
                        keyboardType='password'
                    />
                    <Input
                        placeholder='Confirmar contraseña'
                        width='95%'
                        iconImage={(require('../images/icons/iconLock.png'))} // Icono de candado
                        secureTextEntry={true}
                        value={confirmContra}
                        onChangeText={(text) => setConfirmContra(formatNOSpaces(text))}
                        maxLength={16}
                        keyboardType='password'
                    />
                    <Button
                        textoBoton='Restablecer'
                        fontSize={17} width={250}
                        accionBoton={handleResetPassword}
                        marginTop={35} marginBottom={55} />
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
        justifyContent: 'space-between', // Espacio uniformemente distribuido entre elementos
    },
    image2: {
        marginVertical: 35, // Margen vertical de 35 unidades para la imagen
        width: 210, // Ancho fijo de 210 unidades para la imagen
        height: 205, // Altura fija de 205 unidades para la imagen
    },
});
