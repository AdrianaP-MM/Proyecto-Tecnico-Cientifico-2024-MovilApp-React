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
import { verDetalles } from '../utils/CitasFunctions';
import Button from '../components/buttons/ButtonRojo'; // Importa el componente Button desde su ruta
import { formatAlphabetic, formatAlphanumeric, formatNumeric, formatPlaca } from '../utils/Validator'
import VerticalCard from '../components/servicios/CardServicios'; // Importa componente para tarjetas verticales

// Componente principal del dashboard
export default function DashboardScreen({ navigation }) {

  const [notificaciones, setNotificaciones] = useState(0);
  const [actEstadoCita, setActEstadoCita] = useState([]);


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
      if (responseCitas.status && responseCitas.dataset) {
        setActEstadoCita(responseCitas.dataset); // Guardar las actualizaciones de estado

        // Actualizar el total de notificaciones sumando a las actuales
        setNotificaciones(prevNotificaciones => prevNotificaciones + responseCitas.dataset.length);
        console.log("Notificaciones de actualizaciones de estado: " + responseCitas.dataset.length);
      } else {
        console.log('Error al obtener actualizaciones de estado.');
      }
    } catch (error) {
      console.error('Error en leer actualizaciones de estado:', error);
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
    console.log('asasa')
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
          console.error('Error leyendo citas:', error);
          setCitasProximas([]);
        }
        setSelectedButton(button);
        return;
    }
    try {
      setAutos([]);
      const response = await fetchData('automoviles.php', endpoint);
      if (response.status) {
        const data = response.dataset.map(dataTransform);
        setAutos(data);
        console.log(data);
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
  const [typePickerValues, setTypePickerValues] = useState([]);

  const [searchState, setSearchState] = useState(false)

  // Función para leer datos de la API
  const readElements = async () => {
    try {
      if (pickerMasc) {
        setSearchState(true)
      }

      setTypePickerValues([
        { id: 'Auto', nombre: 'Automóvil' },
        { id: 'Cita', nombre: 'Cita' },
        { id: 'Servicio', nombre: 'Servicio' },
      ]);

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

  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [dataSetFound, setDataSetFound] = useState([])

  const searchElements = async () => {
    let endPoint;
    let php;
    let dataTransform;

    const formData = new FormData();
    formData.append('search_value', searchValue);

    // Determina el endpoint y archivo PHP basados en el valor de pickerMasc
    if (pickerMasc === 'Auto') {
      endPoint = 'searchAutosByPlaca';
      php = 'automoviles.php';
        imagen: item.imagen_automovil,
        modelo: item.modelo_automovil,
        placa: item.placa_automovil
      });
    } else if (pickerMasc === 'Cita') {
      endPoint = 'searchCitaByNumber';
      php = 'citas.php';
    } else {
      endPoint = 'searchServicioByName';
      php = 'servicio.php';
    }

    try {
      // Usa el endpoint y archivo PHP correctos
      const response = await fetchData(php, endPoint, formData);
      if (response.status) {
        let data;
        if (pickerMasc === 'Auto') {
          data = response.dataset.map(dataTransform);
        } else {
          data = response.dataset;
        }
      } else {
        setDataSetFound([]);
        if (response.error) { Alert.alert('Error', response.error) }
      }
    } catch (error) {
      console.error('Error buscando', error);
      setDataSetFound([]);
    }
    console.log('Buscando elementos con valor:', searchValue);
  };


  const toggleView = (state) => {
    // Verifica si hay un tipo de valor seleccionado
    if (!pickerMasc && state == true) {
      Alert.alert('Error', 'Debe escoger el elemento a buscar.');
    }
    else {
      // Verifica si se ha ingresado un valor de búsqueda
      if (!searchValue && state == true) {
        Alert.alert('Error', 'Debe ingresar un valor para poder buscar.');
      }
      else {
        // Alterna la vista de búsqueda
        setShowSearchResult(state);
        if (state == true) { searchElements(); }
      }
    }

  };

  const [pickerMasc, setPikerMasc] = useState('');

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
              placeholder="Seleccione el elemento a buscar:"
              keyboardType='picker'
              value={pickerMasc}
              height={30}
              marginBottom={0}
              width='95%'
              fontSize={12}
              onChangeText={(text) => {
                setPikerMasc(text);
                // Cambia el estado en función del nuevo valor
                if (text) {
                  setSearchState(true);  // Se debe mostrar el estado de búsqueda
                } else {
                  setSearchState(false); // Se debe ocultar el estado de búsqueda
                }
                setSearchValue('');
                toggleView(false)
              }}
              pickerValues={typePickerValues}
            />

            <Input
              placeholder='Buscar..'
              textAlign='left'
              padding={5}
              fontSize={14}
              iconImage={(require('../images/icons/iconLupa.png'))}
              backgroundColor='#000000'
              textColor='white'
              tintColor='#E5383B'
              width='95%'
              textColorI='white'
              value={searchValue}
              editable={searchState}
              maxLength={50}
              onChangeText={(text) => {
                if (pickerMasc === 'Auto') {
                  setSearchValue(formatPlaca(text));
                } else if (pickerMasc == 'Cita') {
                  setSearchValue(formatNumeric(text));
                } else {
                  setSearchValue(formatAlphabetic(text));
                }
              }}
            />
            <Text texto='Por aqui podras buscar tus automóviles por la placa, citas por el número de cita y servicios por nombre del servicio que te interesen ' fontSize={10}
              paddingHorizontal={10} font='PoppinsLight' color='white' />
            <Button textoBoton='Buscar' fontSize={13} height={30} width={90} marginBottom={5} marginTop={5} accionBoton={() => toggleView(true)} />
          </View>
        </View>
      </View>
      {showSearchResult ? (
        <View Style={styles.contenedorSearchResult}>
          <TouchableOpacity onPress={() => toggleView(false)}>
            <Image
              source={require('../images/icons/btnBack.png')} // Imagen del botón de retroceso
              style={{ width: 35, height: 27, zIndex: 3 }} // Estilo de la imagen
              tintColor='black'
            />
          </TouchableOpacity>
          <View style={styles.contenedorSearch}>
            {pickerMasc === 'Auto' && (
              dataSetFound.length === 0 ? (
                <Text texto='No se encontró al auto con esa placa.' fontSize={20}
                  paddingHorizontal={10} font='PoppinsMedium' textAlign='center'
                />
              ) : (
                <ScrollView>
                  {dataSetFound.map(carro => (
                    <TarjetaCarro
                      key={carro.placa_automovil} // Asignar una key única, por ejemplo la placa del carro
                      carro={carro}
                      onPress={() => navigation.navigate('InformacionCarro', { carro: carro })}
                    />
                  ))}
                </ScrollView>
              )
            )}
            {pickerMasc === 'Cita' && (
              dataSetFound.length === 0 ? (
                <Text texto='No se encontraron citas con ese número.' fontSize={20}
                  paddingHorizontal={10} font='PoppinsMedium' textAlign='center'
                />
              ) : (
                <ScrollView>
                  {dataSetFound.map(cita => (
                    <CardCita
                      key={cita.id_cita}
                      accionCard={() => verDetalles(navigation, cita)}
                      citaData={{
                        id_cita: cita.id_cita,
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
            )}
            {pickerMasc !== 'Auto' && pickerMasc !== 'Cita' && (
              dataSetFound.length === 0 ? (
                <Text texto='No se encontraron servicios con ese nombre.' fontSize={20}
                  paddingHorizontal={10} font='PoppinsMedium' textAlign='center'
                />
              ) : (
                <FlatList
                  data={dataSetFound}
                  renderItem={({ item }) => (
                    <VerticalCard
                      title={item.nombre_servicio}
                      tipo={item.descripcion_servicio}
                      idServiciosDisponibles={item.id_servicio}
                    />
                  )}
                  keyExtractor={(item) => item.nombre_servicio}
                  numColumns={2}
                  columnWrapperStyle={styles.row}
                  style={styles.scrollAutos}
                />
              )
            )}
          </View>
        </View>
      ) : (
        <View style={styles.body}>
          <View style={styles.contenedorMenu}>
            <ButtonPastilla
              textoBoton='Mis autos'
              accionBoton={() => {
                setSelectedButton('Mis autos');
                changeEstado('Mis autos');
              }}
              selected={selectedButton === 'Mis autos'}
              width={90}
            />
            <ButtonPastilla
              textoBoton='Autos eliminados'
              accionBoton={() => {
                setSelectedButton('Autos eliminados');
                changeEstado('Autos eliminados');
              }}
              selected={selectedButton === 'Autos eliminados'}
              width={145}
            />
            <ButtonPastilla
              textoBoton='Citas próximas'
              accionBoton={() => {
                setSelectedButton('Citas próximas');
                changeEstado('Citas próximas');
              }}
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
                  data={autos}
                  renderItem={({ item }) => (
                    <TarjetaCarro
                      carro={item}
                      onPress={() => navigation.navigate('InformacionCarro', { carro: item })}
                    />
                  )}
                  keyExtractor={(item) => item.placa}
                  numColumns={2}
                  columnWrapperStyle={styles.row}
                  style={styles.scrollAutos}
                />
              )
            ) : selectedButton === 'Citas próximas' ? (
              citasProximas.length === 0 ? (
                <Text texto='Sin citas para mostrar' fontSize={20}
                  paddingHorizontal={10} font='PoppinsMedium' textAlign='center'
                />
              ) : (
                <ScrollView>
                  {citasProximas.map(cita => (
                    <CardCita
                      key={cita.id_cita}
                      accionCard={() => verDetalles(navigation, cita)}
                      citaData={{
                        id_cita: cita.id_cita,
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
      )}
    </View>
  );
}

// Estilos para el componente
const styles = StyleSheet.create({
  contenedorTotal: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 24,
    paddingBottom: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: '100%'
  },
  header: {
    position: 'relative',
    flexDirection: 'column',
    height: 390,
    width: '100%',
    alignItems: 'center',
  },
  headerImage: {
    position: 'absolute',
    height: 375,
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
  row: {
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  contenedorSearchResult: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    paddingBottom: 30,
  },
  contenedorSearch: {
    minHeight: 390,
    marginTop: 10,
    width: '100%',
    paddingBottom: 30,
  }
});
