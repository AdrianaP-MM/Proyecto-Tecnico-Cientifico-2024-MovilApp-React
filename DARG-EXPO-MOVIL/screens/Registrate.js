import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, TextInput, Text, Dialog, Portal, Button, Provider, RadioButton } from 'react-native-paper';

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
        navigation.navigate('MyCarsScreen');
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
                    <Dialog.Title style={styles.dialogTitle}>Elige tu persona</Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                            <View style={styles.radioContainer}>
                                <RadioButton value="natural" color="#BA181B" />
                                <Text>Persona natural</Text>
                            </View>
                            <View style={styles.radioContainer}>
                                <RadioButton value="juridica" color="#BA181B" />
                                <Text>Persona jurídica</Text>
                            </View>
                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleNext} theme={{ colors: { primary: '#BA181B' } }}>
                            Siguiente
                        </Button>
                    </Dialog.Actions>
                </Dialog>

                <Dialog
                    visible={visibleCamposDialog}
                    onDismiss={() => setVisibleCamposDialog(false)}
                    style={styles.dialog}
                >
                    <Dialog.Title style={styles.dialogTitle}>Completa los siguientes campos</Dialog.Title>
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
                    <Dialog.Actions>
                        <Button onPress={handleNextCampos} theme={{ colors: { primary: '#BA181B' } }}>
                            Siguiente
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

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

                <Button
                    mode="contained"
                    onPress={handleNavigate}
                    style={styles.button}
                    theme={{ colors: { primary: '#BA181B' } }}
                >
                    Ir a MyCarsScreen
                </Button>

            </ScrollView>
        </Provider>
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
        marginBottom: 10,
    },
    dialog: {
        backgroundColor: 'white',
    },
    dialogTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#BA181B',
        borderRadius: 5,
    },
});
