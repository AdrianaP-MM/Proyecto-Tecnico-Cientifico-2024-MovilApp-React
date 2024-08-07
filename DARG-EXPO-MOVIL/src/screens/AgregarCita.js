import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import Input from '../components/inputs/AllBorder'; // Importa el componente Input desde su ruta
import Button from '../components/buttons/ButtonRojo'; // Importa el componente Button desde su ruta
import fetchData from '../utils/FetchData';

// Componente funcional para agregar una cita
export default function AppAddCita({ navigation, route }) {
    const { fecha, hora, auto, movilizacion, zona, ida, regreso } = route.params || {}; // Extrae los parámetros de la ruta si existen
    const [fechaLlegada, setFechaLlegada] = useState(fecha);
    const [horaLlegada, setHoraLlegada] = useState(hora);
    const [autoSeleccionado, setAutoSeleccionado] = useState(auto);
    const [movilizacionSeleccionada, setMovilizacionSeleccionada] = useState(movilizacion);
    const [zonaHabilitada, setZonaHabilitada] = useState(zona);
    const [direccionIda, setDireccionIda] = useState(ida);
    const [direccionRegreso, setDireccionRegreso] = useState(regreso);

    const validateFields = () => {
        if (!fechaLlegada || !horaLlegada || !autoSeleccionado || !movilizacionSeleccionada || !zonaHabilitada || !direccionIda || !direccionRegreso 
            || autoSeleccionado == 0 || movilizacionSeleccionada == 0 || zonaHabilitada == 0) {
            Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
            return false;
        }
        return true;
    };

    const createCita = async () => {
        if (!validateFields()) return;
        try {
            const formData = new FormData();
            formData.append('id_automovil', autoSeleccionado);
            const responseValidationCita = await fetchData('citas.php', 'searchCitaAuto', formData);

            if (!responseValidationCita.status) {
                console.log('Se puede agregar la cita');
                const formData = new FormData();
                const fecha_hora_cita = formatSQLDateTime(fechaLlegada, horaLlegada);
                const fecha_registro = getCurrentSQLDateTime();
                formData.append('fecha_hora_cita', fecha_hora_cita);
                formData.append('input_automovil', autoSeleccionado);
                formData.append('input_movilizacion', movilizacionSeleccionada);
                formData.append('input_zona', zonaHabilitada);
                formData.append('input_ida', direccionIda);
                formData.append('input_regreso', direccionRegreso);
                formData.append('fecha_registro', fecha_registro);
                const responseCreateRow = await fetchData('citas.php', 'createRow', formData);
                if (responseCreateRow.status) {
                    Alert.alert('Exito', `${responseCreateRow.message}`);
                    navigation.navigate('Citas');
                }
                else {
                    Alert.alert('Error', `${responseCreateRow.error}`);
                }
            } else {
                Alert.alert('Error', `${responseValidationCita.error}`);
            }
            // Aquí puedes agregar el código para enviar los datos a la API o hacer cualquier otro procesamiento necesario
        } catch (error) {
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    const [pickerValuesAutos, setPickerValuesAutos] = useState([]);
    const [pickerValuesMovilizacion, setPickerValuesMovilizacion] = useState([]);
    const [pickerValuesZona, setPickerValuesZona] = useState([]);

    useEffect(() => {
        readElements();
    }, []);

    const readElements = async () => {
        try {
            setPickerValuesMovilizacion([
                { id: 'Yo llevo el auto y lo traigo de regreso', nombre: 'Yo llevo el auto y lo traigo de regreso' },
                { id: 'Yo solo regreso el auto', nombre: 'Yo solo regreso el auto' },
                { id: 'Yo solo llevo el auto', nombre: 'Yo solo llevo el auto' },
            ]);
            setPickerValuesZona([
                { id: 'Ayutuxtepeque', nombre: 'Ayutuxtepeque' },
                { id: 'Aguilares', nombre: 'Aguilares' },
            ]);
            const responseAutomoviles = await fetchData('automoviles.php', 'readAllMyCars');
            if (responseAutomoviles.status) {
                setPickerValuesAutos(responseAutomoviles.dataset.map(item => ({
                    id: item.id_automovil, // Asegúrate de que el campo id sea correcto
                    nombre: item.placa_automovil // Asegúrate de que el campo nombre sea correcto
                })));
                console.log(responseAutomoviles.dataset);
            } else {
                Alert.alert('Error', `${responseAutomoviles.error}`);
            }
        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#F9FAFB" />
            <View style={styles.contenedorForm}>
                <Input
                    placeholder='Fecha de llegada'
                    keyboardType='fecha'
                    value={fechaLlegada}
                    onChangeText={setFechaLlegada} // Actualiza el estado
                />
                <Input
                    placeholder='Hora de llegada'
                    value={horaLlegada}
                    onChangeText={setHoraLlegada} // Actualiza el estado
                    keyboardType='hora'
                />
                <Input
                    placeholder='Automóvil'
                    value={autoSeleccionado}
                    onChangeText={setAutoSeleccionado} // Actualiza el estado
                    keyboardType='picker'
                    pickerValues={pickerValuesAutos}
                />
                <Input
                    placeholder='Movilización del vehículo'
                    value={movilizacionSeleccionada}
                    onChangeText={setMovilizacionSeleccionada} // Actualiza el estado
                    keyboardType='picker'
                    pickerValues={pickerValuesMovilizacion}
                />
                <Input
                    placeholder='Zona habilitada'
                    value={zonaHabilitada}
                    onChangeText={setZonaHabilitada} // Actualiza el estado
                    keyboardType='picker'
                    pickerValues={pickerValuesZona}
                />
                <Input
                    placeholder='Dirección de ida'
                    value={direccionIda}
                    onChangeText={setDireccionIda} // Actualiza el estado
                />
                <Input
                    placeholder='Dirección de regreso'
                    value={direccionRegreso}
                    onChangeText={setDireccionRegreso} // Actualiza el estado
                />
            </View>
            <View style={styles.contenedorBtn} >
                <Button textoBoton='Aceptar' accionBoton={createCita} />
            </View>
        </ScrollView >
    );
}

// Estilos para el componente AppAddCita utilizando StyleSheet.create
const styles = StyleSheet.create({
    contenedorTotal: {
        flexGrow: 1, // Ocupa todo el espacio disponible
        backgroundColor: 'white', // Fondo blanco
        alignItems: 'flex-start', // Alinea elementos al inicio horizontalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio verticalmente
        paddingBottom: 100, // Espacio inferior para evitar que el botón quede oculto por el teclado
    },
    contenedorForm: {
        height: 'auto', // Altura automática basada en su contenido
        width: '100%', // Ancho completo
        padding: 20, // Relleno de 20 unidades en todos los lados
    },
    contenedorBtn: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: '#F9FAFB', // Fondo gris claro
        alignItems: 'center', // Alinea elementos al centro horizontalmente
        justifyContent: 'center', // Alinea elementos al centro verticalmente
    },
});

const formatSQLDateTime = (fecha, hora) => {
    // Convertir fecha de DD/MM/YYYY a YYYY-MM-DD
    const [day, month, year] = fecha.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    // Convertir hora de hh:mm AM/PM a HH:MM:SS
    let [time, modifier] = hora.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    const formattedTime = `${hours}:${minutes}:00`;

    // Combinar fecha y hora en el formato SQL
    return `${formattedDate} ${formattedTime}`;
};

const getCurrentSQLDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};