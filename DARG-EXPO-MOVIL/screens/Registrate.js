import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, TextInput, Title, Text, TouchableRipple } from 'react-native-paper';
import ButtonAction from '../components/ButtonAction';

export default function Login({ navigation }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [tel, setTel] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [dui, setDui] = React.useState('');
    const [nit, setNit] = React.useState('');

    const hasErrors = () => {
        return !text.includes('@');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <Avatar.Icon size={75} icon="alpha-d" style={styles.avatarIcon} />
            </View>
            <Text variant="headlineSmall" style={styles.headerText}>Registrate</Text>
            <Text style={styles.subHeaderText}>¡Arregla tu carro con nosotros!</Text>
            <TextInput
                label="Nombre Completo"
                value={name}
                onChangeText={setName}
                style={styles.input}
                left={<TextInput.Icon icon="account-circle" />}
                theme={{ colors: { background: 'white' } }}
            />
            <TextInput
                label="Correo"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
                theme={{ colors: { background: 'white' } }}
            />
            <TextInput
                label="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                theme={{ colors: { background: 'white' } }}
            />
            <TextInput
                label="Teléfono"
                value={tel}
                onChangeText={setTel}
                style={styles.input}
                left={<TextInput.Icon icon="cellphone" />}
                theme={{ colors: { background: 'white' } }}
            />
            <TextInput
                label="DUI"
                value={dui}
                onChangeText={setDui}
                style={styles.input}
                left={<TextInput.Icon icon="badge-account-horizontal" />}
                theme={{ colors: { background: 'white' } }}
            />
            <TextInput
                label="NIT"
                value={nit}
                onChangeText={setNit}
                style={styles.input}
                left={<TextInput.Icon icon="card-account-details" />}
                theme={{ colors: { background: 'white' } }}
            />
            <ButtonAction textoBoton="Registrate" modo="contained" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    headerText: {
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    subHeaderText: {
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    avatarIcon: {
        marginBottom: 10,
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
});
