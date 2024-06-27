import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import Input from '../components/inputs/allBorder'; // Importa el componente Input desde su ruta
import Button from '../components/buttons/btnRojo'; // Importa el componente Button desde su ruta

// Componente funcional para agregar una cita
export default function AppAddCita({ route }) {
    const { fecha, hora, auto, movilizacion, zona, ida, regreso } = route.params || {}; // Extrae los parámetros de la ruta si existen
    return (
        <ScrollView contentContainerStyle={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#F9FAFB" />
            <View style={styles.contenedorForm}>
                <Input
                    placeholder='Fecha de llegada'
                    value={fecha} // Valor de la fecha recibida
                />
                <Input
                    placeholder='Hora de llegada'
                    value={hora} // Valor de la hora recibida
                />
                <Input
                    placeholder='Automóvil'
                    value={auto} // Valor del automóvil recibido
                />
                <Input
                    placeholder='Movilizacion del vehiculo' 
                    value={movilizacion} // Valor de la movilización recibida
                />
                <Input
                    placeholder='Zona habilitada'
                    value={zona}  // Valor de la zona recibida
                />
                <Input
                    placeholder='Dirección ida'
                    value={ida} // Valor de la dirección de ida recibida
                />
                <Input
                    placeholder='Dirección regreso'
                    value={regreso} // Valor de la dirección de regreso recibida
                />
            </View>
            <View style={styles.contenedorBtn} >
                <Button textoBoton='Aceptar' />
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
