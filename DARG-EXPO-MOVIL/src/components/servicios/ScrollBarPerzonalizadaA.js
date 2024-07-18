import React from 'react';
//Se importa el Animated porque sera utilizado por la barra personalizada
import { Animated, StyleSheet } from 'react-native';

//Constante para la barra perzonalizada con los parametros que espera
const CustomScrollBar = ({ scrollY, contentHeight, containerHeight }) => {

  if (contentHeight <= containerHeight) {
    return null; // No mostrar la barra de desplazamiento si el contenido cabe en el contenedor
  }

  //Constante para saber el alto de la barra perzonalizada
  const scrollBarHeight = containerHeight * (containerHeight / contentHeight);

  //Constante el comportamiento de la barra perzonalizada
  const scrollBarTranslateY = scrollY.interpolate({
    inputRange: [0, contentHeight - containerHeight],
    outputRange: [0, containerHeight - scrollBarHeight],
    extrapolate: 'clamp',
  });

  return (
    //Contenedor para la barra perzonalizada
    <Animated.View
      style={[
        styles.scrollBar,
        { height: scrollBarHeight, transform: [{ translateY: scrollBarTranslateY }] },
      ]}
    />
  );
};

//Hoja de estilos para la barra perzonalizada
const styles = StyleSheet.create({
  scrollBar: {
    width: 5, /*Ancho de la scrollbar*/
    backgroundColor: '#BA181B', /*Color de la scrollbar*/
    borderRadius: 2.5, /*Borde redondeado la scrollbar*/
    position: 'absolute', /*Posicion de la scrollbar para que sea visible*/
    right: 2, /*Separacion a la derecha de la scrollbar*/
    marginLeft: 15, /*Separacion a la izquierda de la scrollbar*/
  },
});

export default CustomScrollBar;
