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
    width: 5,
    backgroundColor: '#BA181B',
    borderRadius: 2.5,
    position: 'absolute',
    right: 2,
    marginLeft: 15,
  },
});

export default CustomScrollBar;
