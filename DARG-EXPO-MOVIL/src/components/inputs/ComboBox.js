import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa el componente Picker

const CustomPicker = ({ selectedValue, onValueChange, iconImage, width = '95%', heightI = 24, widthI = 24, color = '#737373', optionColor = '#000', items = [], opacity = 1 }) => {
    return (
        <View style={[styles.container, { width, opacity }]}>
            {iconImage && (
                <Image
                    source={iconImage} // Fuente de la imagen del ícono
                    style={[styles.icon, { width: widthI, height: heightI }]} // Estilos del ícono
                />
            )}
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={[styles.picker, { color }]} // Estilo para el Picker
            >
                {items.map((item, index) => (
                    <Picker.Item label={item.label} value={item.value} key={index} color={optionColor} />
                ))}
            </Picker>
        </View>
    );
};

// Estilos para el componente CustomPicker
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
    picker: {
        flex: 1, // Ocupa el espacio restante en la fila
        fontSize: 14,
        fontFamily: 'PoppinsRegular',
    },
});

export default CustomPicker; // Exporta el componente CustomPicker para ser utilizado en otras partes de la aplicación
