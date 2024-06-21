import * as React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';
import Text from '../components/utilidades/text';
import Button from '../components/buttons/btnRojo';
import Input from '../components/inputs/allBorder';

export default function EditarJuridico({ navigation }) {
    const [nombre, setNombre] = React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [departamento, setDepartamento] = React.useState('');
    const [correo, setCorreo] = React.useState('');
    const [dui, setDui] = React.useState('');
    const [nit, setNit] = React.useState('');
    const [nrc, setNrc] = React.useState('');
    const [nrf, setNrf] = React.useState('');

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

    const formatDui = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length <= 8) {
            return numericValue;
        } else {
            return numericValue.slice(0, 8) + '-' + numericValue.slice(8, 9);
        }
    };

    const formatNit = (value) => {
        return value.replace(/\D/g, '').slice(0, 14);
    };

    const handleNavigate = () => {
        navigation.navigate('TabNavigator');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#F9FAFB' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar.Icon size={75} icon="account" style={styles.avatarIcon} />
                    <Text texto='Empresa' font='PoppinsBold' fontSize={20} textAlign='center' />
                    <TouchableRipple
                        onPress={() => console.log('Pressed')}
                        rippleColor="rgba(0, 0, 0, .32)"
                    >
                        <Text texto='Cambiar foto de perfil' font='PoppinsRegular' fontSize={14} textAlign='center' color='#BA181B' />
                    </TouchableRipple>
                </View>

                <View style={styles.ContainerInputs}>
                    <Input
                        placeholder='Nombre'
                        value={nombre}
                        onChangeText={setNombre}
                        width='95%'
                        style={styles.input}
                    />

                    <Input
                        placeholder='Apellido'
                        value={apellido}
                        onChangeText={setApellido}
                        width='95%'
                        style={styles.input}
                    />

                    <Input
                        placeholder='Departamento'
                        value={departamento}
                        onChangeText={setDepartamento}
                        width='95%'
                        style={styles.input}
                    />

                    <Input
                        placeholder='Correo@ejemplo.com'
                        value={correo}
                        onChangeText={setCorreo}
                        width='95%'
                        style={styles.input}
                    />

                    <View style={styles.dui_nit}>
                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='DUI'
                                value={dui}
                                onChangeText={(text) => setDui(formatDui(text))}
                                width='95%'
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
                                width='95%'
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
                                width='95%'
                                keyboardType='numeric'
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Input
                                placeholder='NRF'
                                value={nrf}
                                onChangeText={setNrf}
                                width='95%'
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

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        paddingVertical: 50,
    },
    avatarIcon: {
        marginBottom: 10,
        backgroundColor: '#BA181B',
    },
    ContainerInputs: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.2,
        borderRadius: 3,
        width: '100%',
        paddingHorizontal: 10,
    },
    dui_nit: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});
