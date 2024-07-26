import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native'; // Importa los estilos de React Native

const CustomTextInput = ({ placeholder, keyboardType, value, onChangeText, iconImage, maxLength, width = '100%', textAlign = 'left', heightI = 24, widthI = 24, secureTextEntry, key, opacity =1, padding = 15}) => {
    return (
        <View style={[styles.container, { width, opacity}]}>
            {iconImage && (
                <Image
                    source={iconImage} // Fuente de la imagen del ícono
                    style={[styles.icon, { width: widthI, height: heightI }]} // Estilos del ícono
                />
            )}
            <TextInput
                style={[styles.input, { textAlign, padding }]} // Estilo para el TextInput definido en los estilos
                placeholder={placeholder} // Propiedad para mostrar un texto de ejemplo cuando el campo está vacío
                keyboardType={keyboardType} // Propiedad para especificar el tipo de teclado (numérico, email, etc.)
                value={value} // Propiedad para almacenar y mostrar el valor actual del campo
                onChangeText={onChangeText}
                maxLength={maxLength}// Propiedad para manejar cambios en el texto ingresado
                secureTextEntry={secureTextEntry}
                key={key}
            />
        </View>
    );
};

// Estilos para el componente CustomTextInput
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Alinea los elementos en una fila
        alignItems: 'center', // Centra verticalmente los elementos en el contenedor
        borderWidth: 1, // Ancho del borde
        borderColor: '#E4E5EB', // Color del borde
        borderRadius: 5, // Radio de borde para esquinas redondeadas
        marginTop: 12,
        marginBottom: 12, // Margen inferior para separación con otros elementos
        backgroundColor: 'white',
    },
    icon: {
        marginLeft: 10, // Espaciado a la izquierda y derecha del ícono
        tintColor: '#A8AFB9', // Color gris para el ícono
    },
    input: {
        flex: 1, // Ocupa el espacio restante en la fila
        fontSize: 14,
        fontFamily: 'PoppinsRegular',
    },
});

export default CustomTextInput; // Exporta el componente CustomTextInput para ser utilizado en otras partes de la aplicación
