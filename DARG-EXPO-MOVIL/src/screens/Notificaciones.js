import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native';
import Text from '../components/utilidades/Text'; // Importación del componente de texto personalizado
import CardNoti from '../components/notificaciones/CardNotif'; // Importación del componente de tarjeta de notificación personalizado
import CardNotiActCita from '../components/notificaciones/CardNotifActCitas'; // Importación del componente de tarjeta de notificación personalizado
import fetchData from '../utils/FetchData';

export default function AppNotificaciones() {

    const [citas, setCitas] = useState([]);
    const [actEstadoCita, setActEstadoCita] = useState([]);

    const readCitasExistentes = async () => {
        try {
            const responseCitas = await fetchData('citas.php', 'readAllNotisCitas');
            if (responseCitas.status) {
                setCitas(responseCitas.dataset);
                console.log(responseCitas);
            } else {
                setCitas([]);
                Alert.alert('¡Aviso!', `${responseCitas.error}`);
            }
        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    const readActEstadoCita = async () => {
        try {
            const responseCitas = await fetchData('citas.php', 'actualizacionCitaNoti');
            if (responseCitas.status) {
                setActEstadoCita(responseCitas.dataset);
                console.log(responseCitas);
            } else {
                setActEstadoCita([]);
                Alert.alert('¡Aviso!', `${responseCitas.error}`);
            }
        } catch (error) {
            console.error('Error en leer los elementos:', error);
            Alert.alert('Error', 'Hubo un error.');
        }
    };

    const handleMarcarComoLeido = async (NotificacionId) => {

        const formData = new FormData();
        formData.append('id_notificacion', NotificacionId);

        try {
            const response = await fetchData('citas.php', 'marcarComoLeido', formData);
            if (!response.error) {
                Alert.alert('Éxito', 'Se ha marcado como leido.');
                readActEstadoCita();
            } else {
                Alert.alert('Error', response.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al marcar como leido');
        }
    };

    useEffect(() => {
        readCitasExistentes();
        readActEstadoCita();
    }, []);

    const processCitas = (citas) => {
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Ajustar 'now' para que sea a medianoche para comparaciones de fecha

        return citas.map(cita => {
            const citaDate = new Date(cita.fecha_hora_cita);
            citaDate.setHours(0, 0, 0, 0); // Ajustar la fecha de la cita para que sea a medianoche para comparaciones de fecha

            const diffTime = citaDate - now;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            // Notificar 3 días antes o en el mismo día
            if (diffDays <= 3 && diffDays >= 0) {
                const day = String(citaDate.getDate()).padStart(2, '0');
                const month = String(citaDate.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
                const year = citaDate.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;

                return {
                    title: 'Se acerca tu proxima cita con nosotros para tu vehículo:',
                    vehicle: cita.modelo_automovil, // Ajusta esto si 'modelo_automovil' no es la propiedad correcta
                    date: formattedDate, // Formatear la fecha manualmente
                    time: cita.hora_cita,
                    service: cita.nombre_servicio,
                    finishdate: cita.fecha_aproximada_finalizacion,
                    key: cita.id_cita // Ajusta esto si tienes una propiedad única para la cita
                };
            }
            return null;
        }).filter(cita => cita !== null); // Filtra citas nulas
    };

    const handleMarkAsRead = (NotificacionId) => {
        // Aquí puedes añadir la lógica para marcar la cita como leída en la base de datos o en el estado local
        handleMarcarComoLeido(NotificacionId);

        console.log(`Cita con ID ${NotificacionId} marcada como leída`);
    };

    const showAlert = (responseCitas) => {
        Alert.alert(
            'Detalle',
            `Tu cita registrada para la fecha ${responseCitas.fecha_hora_cita} con tu auto modelo ${responseCitas.modelo_automovil} ha sido ${responseCitas.estado_nuevo} el ${responseCitas.fecha_creacion} para nuestro servicio ${responseCitas.nombre_servicio}.`,
            [
                {
                    text: 'Marcar como leido',
                    onPress: () => handleMarkAsRead(responseCitas.id_notificacion),
                    style: 'default',
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                }
            ]
        );
    };

    const citasProcesadas = processCitas(citas);

    return (
        <View style={styles.contenedorTotal}>
            <StatusBar style="dark" backgroundColor="#ffffff" />
            <View style={styles.col}>
                <View style={styles.contenedorTitulo}>
                    <Text texto='Notificaciones' font='PoppinsMedium' fontSize={25} />
                    <Image
                        source={require('../images/icons/iconCampana.png')}  // Ruta de la imagen de campana
                        style={styles.image}
                    />
                </View>
                <Text texto={`¡Mantente al tanto tus citas aqui!`} font='PoppinsRegular' fontSize={14} color='#6A6A6A' />
            </View>
            <ScrollView style={styles.scrollCards}>

                <View style={styles.section}>

                    <Text texto='Próximas Citas' font='PoppinsBold' fontSize={18} />
                    {citasProcesadas.map((cita) => (
                        <CardNoti
                            key={cita.key}
                            title={cita.title}
                            vehicle={cita.vehicle}
                            date={cita.date}
                            time={cita.time}
                            service={cita.service}
                            finishdate={cita.finishdate}
                            onPress={() => {
                                // Acción cuando se presiona la tarjeta
                                Alert.alert('Detalle', `El servicio que espera el auto ${cita.vehicle} es ${cita.service} a las ${cita.finishdate}`);
                            }}
                        />
                    ))}
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text texto='Actualización del Estado de Cita' font='PoppinsBold' fontSize={18} />
                    {actEstadoCita.map((responseCitas) => (
                        <CardNotiActCita
                            key={responseCitas.id_notificacion}
                            idCita={responseCitas.id_cita}
                            title={"Presiona este mensaje para saber más detalles."}
                            vehicle={responseCitas.modelo_automovil}
                            date={responseCitas.fecha_creacion}
                            service={responseCitas.nombre_servicio}
                            finishdate={responseCitas.fecha_hora_cita}
                            onPress={() => showAlert(responseCitas)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

// Estilos para los componentes de la pantalla de notificaciones
const styles = StyleSheet.create({
    contenedorTotal: {
        flex: 1, // Ocupa todo el espacio disponible
        backgroundColor: '#F9FAFB', // Fondo gris claro
        alignItems: 'flex-start', // Alinea elementos al inicio horizontalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio verticalmente
        marginTop: 20, // Margen superior de 20 unidades
        paddingTop: 20, // Relleno superior de 20 unidades
        padding: 0, // Sin relleno horizontal adicional
    },
    col: {
        width: '100%', // Ancho completo
        paddingHorizontal: 15, // Relleno horizontal de 15 unidades
        marginVertical: 20, // Margen vertical de 20 unidades
        backgroundColor: '#F9FAFB', // Fondo gris claro
    },
    contenedorTitulo: {
        width: '100%', // Ancho completo
        backgroundColor: '#F9FAFB', // Fondo gris claro
        flexDirection: 'row', // Disposición en fila para los elementos hijos
        alignItems: 'center', // Alinea elementos al centro verticalmente
        justifyContent: 'flex-start', // Alinea elementos al inicio horizontalmente
    },
    image: {
        marginLeft: 10, // Margen izquierdo de 10 unidades para la imagen
        width: 25, // Ancho fijo de 25 unidades
        height: 28, // Altura fija de 28 unidades
    },
    scrollCards: {
        flex: 1, // Ocupa todo el espacio disponible
        width: '100%', // Ancho completo
        backgroundColor: '#F9FAFB', // Fondo gris claro para el área de desplazamiento
        paddingTop: 10, // Relleno superior de 10 unidades
    },
    section: {
        paddingHorizontal: 15, // Relleno horizontal de 15 unidades
        paddingBottom: 10, // Relleno inferior de 10 unidades
    },
    divider: {
        height: 1, // Altura de la línea divisoria
        backgroundColor: '#E0E0E0', // Color gris claro para la línea divisoria
        marginVertical: 15, // Margen vertical de 15 unidades
    },
});
