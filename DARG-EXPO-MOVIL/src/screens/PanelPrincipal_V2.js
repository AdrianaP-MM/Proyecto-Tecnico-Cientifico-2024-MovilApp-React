import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import Text from '../components/utilidades/Text';
import { StatusBar } from 'expo-status-bar';
import fetchData from '../utils/FetchData';
import { useFocusEffect } from '@react-navigation/native';
import * as contants from '../utils/Constantes';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '../components/inputs/AllBorder';
import TarjetaCarro from '../components/carros/CardCarro';
import ButtonPastilla from '../components/citas/ButtonPastilla'; // Importación del componente de botón personalizado
import CardCita from '../components/citas/CardCita';
import { verDetalles } from '../utils/CitasFunctions'



// Componente principal del dashboard
export default function DashboardScreen({ navigation }) {

  const [notificaciones, setNotificaciones] = useState(0);
  const [actEstadoCita, setActEstadoCita] = useState([]);
  const [totalNotificaciones, setTotalNotificaciones] = useState(0);

  const actualizarTotalNotificaciones = (nuevasCitas, nuevasActualizaciones) => {
    const total = nuevasCitas.length + nuevasActualizaciones.length;
    setTotalNotificaciones(total); // Actualiza el total de notificaciones
};

  // Función para obtener las notificaciones de citas próximas
  const fetchNotificaciones = async () => {
    try {
      const responseCitas = await fetchData('citas.php', 'readAllNotisCitas');
      if (responseCitas.status && responseCitas.dataset) {
        const citasProximas = processCitas(responseCitas.dataset); // Procesar citas próximas
        const numeroNotificaciones = citasProximas.length; // Número de citas próximas

        // Actualizar el total de notificaciones sumando a las actuales
        setNotificaciones(prevNotificaciones => prevNotificaciones + numeroNotificaciones);
        console.log("Notificaciones de citas próximas: " + numeroNotificaciones);
      } else {
        console.log('Error al obtener las notificaciones de citas.');
      }
    } catch (error) {
      console.error('Error al obtener notificaciones de citas:', error);
    }
  };


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
          title: 'Se acerca tu próxima cita con nosotros para tu vehículo:',
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

  // Función para obtener las actualizaciones de estado de cita
  const readActEstadoCita = async () => {
    try {
        const responseCitas = await fetchData('citas.php', 'actualizacionCitaNoti');
        if (responseCitas.status) {
            setActEstadoCita(responseCitas.dataset); // Actualizar actualizaciones de estado
            actualizarTotalNotificaciones(citas, responseCitas.dataset); // Actualiza el total de notificaciones
            console.log(responseCitas);
        } else {
            setActEstadoCita([]); // Si no hay datos, vacía actualizaciones de estado
            actualizarTotalNotificaciones(citas, []); // Actualiza el total
            Alert.alert('¡Aviso!', `${responseCitas.error}`);
        }
    } catch (error) {
        console.error('Error en leer los elementos:', error);
        Alert.alert('Error', 'Hubo un error.');
    }
};


  useFocusEffect(
    React.useCallback(() => {
      readElements(); // Leer elementos de la API
      fetchNotificaciones();
      readActEstadoCita();
    }, [])
  );

  const [autos, setAutos] = useState([]);
  const [citasProximas, setCitasProximas] = useState([]);

  const [selectedButton, setSelectedButton] = useState('Mis autos'); // Estado para el botón seleccionado
  // Función para cambiar el estado del botón seleccionado
  const changeEstado = async (button) => {
    let endpoint;
    let dataTransform;

    switch (button) {
      case 'Mis autos':
        endpoint = 'readAllMyCars';
        dataTransform = item => ({
          imagen: item.imagen_automovil,
          modelo: item.modelo_automovil,
          placa: item.placa_automovil
        });
        break;
      case 'Autos eliminados':
        endpoint = 'readAllDelete';
        dataTransform = item => ({
          imagen: item.imagen_automovil,
          modelo: item.modelo_automovil,
          placa: item.placa_automovil
        });
        break;
      default:
        endpoint = 'readAllEspecific';
        const formData = new FormData();
        formData.append('estado_cita', 'proximas');
        try {
          const responseCitasPrx = await fetchData('citas.php', endpoint, formData);
          if (responseCitasPrx.status) {
            setCitasProximas(responseCitasPrx.dataset);
          } else {
            setCitasProximas([]);
          }
        } catch (error) {
          console.error('Error fetching citas:', error);
          setCitasProximas([]);
        }
        setSelectedButton(button);
        return;
    }

    try {
      const response = await fetchData('automoviles.php', endpoint);
      if (response.status) {
        const data = response.dataset.map(dataTransform);
        setAutos(data);
      } else {
        setAutos([]);
      }
    } catch (error) {
      console.error('Error leyendo los automóviles', error);
      setAutos([]);
    }

    setSelectedButton(button);
  };

  const [cliente, setCliente] = useState([]);

  // Función para leer datos de la API
  const readElements = async () => {
    try {
      const responseCliente = await fetchData('usuarios_clientes.php', 'readProfile');
      changeEstado('Mis autos');

      if (responseCliente.status) {
        setCliente(responseCliente.dataset);
        //console.log(responseCliente.dataset)
      } else {
        setCliente([]);
        Alert.alert('Error', `${responseCliente.error}`);
      }
    } catch (error) {
      console.error('Error en leer los elementos:', error);
      Alert.alert('Error', 'Hubo un error.');
    }
  };

  const nombre = cliente.nombres_cliente;

  // Render principal del componente DashboardScreen
  return (
    <View style={styles.contenedorTotal}>
      <StatusBar style="light" backgroundColor="#010101" />
      <View style={styles.header}>
        <Image
          source={require('../images/panelPrincipal/backImage.png')}
          style={styles.headerImage} />
        <View style={styles.titleContainer}>
          <Text texto='REVOLUTION GARAGE' font='PoppinsBold' fontSize={13} color='white' textAlign='center' />
        </View>
        <View style={styles.campanitaContainer}>
          <TouchableOpacity style={styles.notificationIcon} onPress={() => navigation.navigate('Notificaciones')}>
            <MaterialIcons name="notifications" size={35} color="#E5383B" />
            {notificaciones > 0 && ( // Mostrar el indicador si el total de notificaciones es mayor a 0
              <View style={styles.notificationIndicator}>
                <MaterialIcons name="error-outline" size={15} color="white" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.saludoContainer}>
          <View style={styles.textContainer}>
            <Text texto={`¡Bienvenido`} font='PoppinsSemiBold' fontSize={25} color='white' textAlign='right' />
            <Text texto={`${nombre}!`} font='PoppinsSemiBold' fontSize={25} color='white' textAlign='right' />
          </View>
          <View style={styles.searchContainer}>
            <Input
              placeholder='Buscar..'
              textAlign='left'
              padding={5}
              fontSize={12}
              iconImage={(require('../images/icons/iconLupa.png'))}
              backgroundColor='#000000'
              textColor='white'
              tintColor='#E5383B'
              width='95%'
            />
            <Text texto='Por aqui podras buscar tus automóviles, citas y servicios que te interesen ' fontSize={10}
              paddingHorizontal={10} font='PoppinsLight' color='white' />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.contenedorMenu}>
          <ButtonPastilla
            textoBoton='Mis autos'
            accionBoton={() => changeEstado('Mis autos')}
            selected={selectedButton === 'Mis autos'}
            width={90}
          />
          <ButtonPastilla
            textoBoton='Autos eliminados'
            accionBoton={() => changeEstado('Autos eliminados')}
            selected={selectedButton === 'Autos eliminados'}
            width={145}
          />
          <ButtonPastilla
            textoBoton='Citas próximas'
            accionBoton={() => changeEstado('Citas próximas')}
            selected={selectedButton === 'Citas próximas'}
            width={130}
          />
        </View>
        <View style={styles.contenedorResult}>
          {selectedButton === 'Mis autos' || selectedButton === 'Autos eliminados' ? (
            autos.length === 0 ? (
              <Text texto='Sin autos para mostrar' fontSize={20}
                paddingHorizontal={10} font='PoppinsMedium' textAlign='center'
              />
            ) : (

              <FlatList
                data={autos} // Datos para la lista
                renderItem={({ item }) => (
                  <TarjetaCarro
                    carro={item}
                    onPress={() => navigation.navigate('InformacionCarro', { carro: item })} // Navega a la información del carro al presionar
                  />
                )}
                keyExtractor={(item) => item.placa} // Clave única para cada item basado en la placa del carro
                numColumns={2} // Número de columnas en la cuadrícula
                columnWrapperStyle={styles.row} // Estilo para las filas de la cuadrícula
                style={styles.scrollAutos}
              />
            )
          ) : selectedButton === 'Citas próximas' ? (
            citasProximas.length === 0 ? (
              <Text texto='Sin citas para mostrar' fontSize={20}
                paddingHorizontal={10} font='PoppinsMedium' textAlign='center'
              />
            ) : citasProximas.length === 1 ? (
              <CardCita
                accionCard={() => verDetalles(navigation, citasProximas[0].id_cita, citasProximas[0].fecha_cita, citasProximas[0].hora_cita, citasProximas[0].id_automovil, citasProximas[0].movilizacion_vehiculo, citasProximas[0].zona_habilitada, citasProximas[0].direccion_ida, citasProximas[0].direccion_regreso, citasProximas[0].estado_cita)}
                cita={citasProximas[0]}
                citaData={{
                  fotoCarro: citasProximas[0].imagen_automovil,
                  fecha_cita: citasProximas[0].fecha_cita,
                  anio_cita: citasProximas[0].anio_cita,
                  hora_cita: citasProximas[0].hora_cita,
                  modelo_automovil: citasProximas[0].modelo_automovil,
                  placa_automovil: citasProximas[0].placa_automovil,
                  movilizacion_vehiculo: citasProximas[0].movilizacion_vehiculo
                }}
              />
            ) : (
              <ScrollView>
                {citasProximas.map(cita => (
                  <CardCita
                    key={cita.id_cita}
                    accionCard={() => verDetalles(
                      navigation,
                      cita.id_cita,
                      cita.fecha_cita,
                      cita.hora_cita,
                      cita.id_automovil,
                      cita.movilizacion_vehiculo,
                      cita.zona_habilitada,
                      cita.direccion_ida,
                      cita.direccion_regreso,
                      cita.estado_cita
                    )}
                    citaData={{
                      fotoCarro: cita.imagen_automovil,
                      fecha_cita: cita.fecha_cita,
                      anio_cita: cita.anio_cita,
                      hora_cita: cita.hora_cita,
                      modelo_automovil: cita.modelo_automovil,
                      placa_automovil: cita.placa_automovil,
                      movilizacion_vehiculo: cita.movilizacion_vehiculo
                    }}
                  />
                ))}
              </ScrollView>
            )
          ) : null}
        </View>
      </View>
    </View>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  contenedorTotal: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  header: {
    position: 'relative',
    flexDirection: 'column',
    height: 310,
    width: '100%',
    alignItems: 'center',
  },
  headerImage: {
    position: 'absolute'
  },
  titleContainer: {
    paddingTop: 25,
  },
  campanitaContainer: {
    alignSelf: 'flex-end',
  },
  saludoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  contenedorMenu: {
    width: '100%', // Ancho completo
    height: 'auto', // Altura automática basada en su contenido
    flexDirection: 'row', // Disposición en fila para los elementos hijos
    alignItems: 'center', // Alinea elementos al centro verticalmente
    justifyContent: 'center', // Espacio uniformemente distribuido entre elementos
    zIndex: 1, // Orden en la pila
  },
  body: {
    flex: 1,
    width: '100%',
  },
  contenedorResult: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    paddingBottom: 30,
  },
  textContainer: {
    alignSelf: 'flex-end'
  },
  scrollAutos: {
    flex: 1, // Ocupa todo el espacio disponible
    width: '100%', // Ancho completo
    backgroundColor: 'white',
    paddingTop: 15,
  },
  notificationIcon: {
    position: 'relative',
    alignSelf: 'flex-end',
  },
  notificationIndicator: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#E5383B',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
