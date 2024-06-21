import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, TextInput, Dialog, Portal, Provider, RadioButton, TouchableRipple } from 'react-native-paper';
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
                        <TextInput
                            mode="outlined"
                            label="NRC"
                            left={<TextInput.Icon icon="briefcase-account-outline" />}
                            theme={{ colors: { primary: '#BA181B', background: 'white' } }}
                        />
                        <TextInput
                            mode="outlined"
                            label="NRF"
                            left={<TextInput.Icon icon="book-account-outline" />}
                            theme={{ colors: { primary: '#BA181B', background: 'white' } }}
                        />
                        <TextInput
                            mode="outlined"
                            label="Rubro comercial"
                            left={<TextInput.Icon icon="warehouse" />}
                            theme={{ colors: { primary: '#BA181B', background: 'white' } }}
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
                <TextInput
                    label="Nombre Completo"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    left={<TextInput.Icon icon="account-circle" />}
                    theme={{ colors: { primary: '#BA181B', background: 'white' } }}
                />
                <TextInput
                    label="Correo"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    left={<TextInput.Icon icon="email" />}
                    theme={{ colors: { primary: '#BA181B', background: 'white' } }}
                />
                <TextInput
                    label="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    left={<TextInput.Icon icon="lock" />}
                    theme={{ colors: { primary: '#BA181B', background: 'white' } }}
                />
                <TextInput
                    label="Teléfono"
                    value={tel}
                    onChangeText={setTel}
                    style={styles.input}
                    left={<TextInput.Icon icon="cellphone" />}
                    theme={{ colors: { primary: '#BA181B', background: 'white' } }}
                />
                <TextInput
                    label="DUI"
                    value={dui}
                    onChangeText={setDui}
                    style={styles.input}
                    left={<TextInput.Icon icon="badge-account-horizontal" />}
                    theme={{ colors: { primary: '#BA181B', background: 'white' } }}
                />
                <TextInput
                    label="NIT"
                    value={nit}
                    onChangeText={setNit}
                    style={styles.input}
                    left={<TextInput.Icon icon="card-account-details" />}
                    theme={{ colors: { primary: '#BA181B', background: 'white' } }}
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
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
