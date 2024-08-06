import React, { useRef, useState, useEffect } from 'react'; // Asegúrate de incluir useEffect aquí
import { StyleSheet, View, ScrollView, Animated, Button, TextInput } from 'react-native';
// Importa la card que se utiliza para mostrar el contenido
import HorizontalCard from '../components/servicios/CardGruposServicios';
// Importa la barra de scroll personalizada
import CustomScrollBar from '../components/servicios/ScrollBarPerzonalizada';
import Text from '../components/utilidades/Text';
import { Config } from '../utils/Constantes'; //Importacion de la constante IP
import { fillData } from '../utils/FillData';
import { func } from 'prop-types';

export default function App() {
  // Constantes para ver las dimensiones para la barra de scroll
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Estado para manejar el correo ingresado
  const [correo, setCorreo] = useState('');

  // Función para enviar el código de verificación al correo ingresado
  const handleSendCode = async () => {
    const formData = new FormData();
    formData.append('user_correo', correo);

    try {
      const confirmCorreo = await fillData({
        php: 'usuarios_clientes',
        accion: 'checkCorreo',
        method: 'POST',
        formData: formData
      });

      // Manejo de la respuesta aquí
      console.log(confirmCorreo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // Container principal de pantalla
    <View style={styles.container}>
      <View style={styles.titulo} /*Contenedor del titulo de la pantalla*/>
        <Text texto='Grupos de servicio' font='PoppinsMedium' fontSize={25} />
      </View>

      <View /*Contenedor que guarda el scroll de las cards de servicios*/
        style={styles.scrollViewContainer}
        onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      >
        <ScrollView /*Scroll view donde se encuentran las cards*/
          style={styles.scrollView}
          contentContainerStyle={styles.containerCards}
          /*De aqui se saca el alto del content y se usa el parametro para el scroll personalizado*/
          onContentSizeChange={(width, height) => setContentHeight(height)}
          /*Se agrega el event al contenedor Animated*/
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          /*Se oculta la scroll bar predeterminada*/
          showsVerticalScrollIndicator={false}
        >
          <HorizontalCard
            title="Electrónica básica"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Iluminación y señalización"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Sensores y sistemas de control"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
          <HorizontalCard
            title="Revisión de dirección"
            imageUrl="https://motor.elpais.com/wp-content/uploads/2019/04/cambio-aceite-coche.jpg"
          />
        </ScrollView>

        <CustomScrollBar /*Se agregan los parametros que espera recibir la custom bar*/
          scrollY={scrollY}
          contentHeight={contentHeight}
          containerHeight={containerHeight}
        />
      </View>

      <View style={styles.inputContainer} /*Contenedor del input y botón*/>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          value={correo}
          onChangeText={setCorreo}
        />
        <Button title="Enviar Código" onPress={handleSendCode} />
      </View>
    </View>
  );
}

// Hoja de estilos para el contenedor
const styles = StyleSheet.create({
  container: {
    flex: 1, /*Propiedad flex*/
    backgroundColor: '#F9FAFB', /*Fondo del contenedor*/
    alignItems: 'center', /*Alinear al centro verticalmente*/
    justifyContent: 'center', /*Alinear al centro horizontalmente*/
  },
  scrollView: {
    width: '97%', /*Ancho del contenedor scroll*/
  },
  containerCards: {
    paddingBottom: 20, /*Separación inferior del contenedor de las cards*/
  },
  titulo: {
    alignItems: 'flex-start', /*Alinear al inicio*/
    width: '100%', /*Ancho del título*/
    paddingHorizontal: 20, /*Separación interior del título*/
    marginVertical: 20, /*Separación vertical del título*/
  },
  scrollViewContainer: {
    width: '92%', /*Ancho del contenedor scroll*/
    maxHeight: '78%', /*Alto máximo del contenedor scroll*/
    position: 'relative', /*Posición del contenedor scroll*/
  },
  inputContainer: {
    width: '100%', /*Ancho del contenedor del input*/
    paddingHorizontal: 20, /*Separación horizontal del contenedor del input*/
    marginVertical: 20, /*Separación vertical del contenedor del input*/
    alignItems: 'center', /*Alinear al centro*/
  },
  input: {
    width: '100%', /*Ancho del input*/
    padding: 10, /*Padding del input*/
    borderWidth: 1, /*Ancho del borde del input*/
    borderColor: '#ccc', /*Color del borde del input*/
    borderRadius: 5, /*Radio del borde del input*/
    marginBottom: 10, /*Margen inferior del input*/
  },
});
