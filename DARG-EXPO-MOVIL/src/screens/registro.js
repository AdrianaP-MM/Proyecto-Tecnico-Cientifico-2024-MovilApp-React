import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Dialog, Portal, Provider, RadioButton, TouchableRipple } from 'react-native-paper';
import Text from '../components/utilidades/text';
import Button from '../components/buttons/btnRojo';
import Input from '../components/inputs/allBorder';
import { StatusBar } from 'expo-status-bar';

export default function Registrate({ navigation }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [dui, setDui] = React.useState('');
    const [nit, setNit] = React.useState('');

    const [visiblePersonaDialog, setVisiblePersonaDialog] = React.useState(true);
    const [visibleCamposDialog, setVisibleCamposDialog] = React.useState(false);
    const [checked, setChecked] = React.useState('natural');
    const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);

    const handleNext = () => {
        setVisiblePersonaDialog(false);
        if (checked === 'juridica') {
            setVisibleCamposDialog(true);
        }
    };

    const handleNavigate = () => {
        navigation.navigate('Login');
    };

    const hasErrors = () => {
        return !email.includes('@');
    };

    const handleNextCampos = () => {
        setVisibleCamposDialog(false);
        setShowAdditionalFields(true);
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
                            iconImage={require('../images/icons/iconUser.png')}
                        />
                        <Input
                            placeholder='NRF'
                            width='95%'
                            iconImage={require('../images/icons/iconUser.png')}
                        />
                        <Input
                            placeholder='Rubro comercial'
                            width='95%'
                            iconImage={require('../images/icons/iconUser.png')}
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
                    placeholder='Nombre Completo'
                    value={name}
                    onChangeText={setName}
                    width='95%'
                    iconImage={require('../images/icons/iconUser.png')}
                />
                <Input
                    placeholder='Correo'
                    value={email}
                    onChangeText={setEmail}
                    width='95%'
                    iconImage={require('../images/icons/iconUser.png')}
                />
                <Input
                    placeholder='Contraseña'
                    value={password}
                    onChangeText={setPassword}
                    width='95%'
                    iconImage={require('../images/icons/iconUser.png')}
                    secureTextEntry={true}
                />
                <Input
                    placeholder='Teléfono'
                    value={tel}
                    onChangeText={setTel}
                    width='95%'
                    iconImage={require('../images/icons/iconUser.png')}
                />
                <Input
                    placeholder='DUI'
                    value={dui}
                    onChangeText={setDui}
                    width='95%'
                    iconImage={require('../images/icons/iconUser.png')}
                />
                <Input
                    placeholder='NIT'
                    value={nit}
                    onChangeText={setNit}
                    width='95%'
                    iconImage={require('../images/icons/iconUser.png')}
                />
                <Button textoBoton='Registrate' accionBoton={handleNavigate} fontSize={17} width='55%' />
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
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    avatarIcon: {
        marginBottom: 10,
        backgroundColor: '#BA181B',
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
        marginTop: 0,
    },
    center: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
