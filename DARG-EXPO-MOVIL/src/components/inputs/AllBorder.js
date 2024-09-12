import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';


const CustomTextInput = ({ placeholder, keyboardType, value, onChangeText, pickerValues = [], iconImage, maxLength, width = '100%', textAlign = 'left', heightI = 24, widthI = 24, secureTextEntry, key, opacity = 1, padding = 15, tintColor = '#A8AFB9', fontSize = 14, height = 'auto', backgroundColor = 'white', textColor = '#7B7B7B' }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(value);

    const showDatePicker = () => setDatePickerVisibility(true);
    const showTimePicker = () => setTimePickerVisibility(true);

    const handleDateConfirm = (date) => {
        const formattedDate = formatDate(date);
        setSelectedDate(formattedDate);
        setDatePickerVisibility(false);
        onChangeText(formattedDate);
    };

    const handleTimeConfirm = (date) => {
        let formattedTime;

        // Definir hora mínima y máxima
        const minTime = new Date();
        minTime.setHours(9, 0);
        const maxTime = new Date();
        maxTime.setHours(16, 0);

        // Comparar la hora seleccionada con el rango permitido
        if (date < minTime || date > maxTime) {
            Alert.alert('Advertencia', 'La hora seleccionada debe estar entre las 9 AM y las 4 PM.');
            console.log(date);
        } else {
            formattedTime = formatTime(date);
            setSelectedTime(formattedTime);
            onChangeText(formattedTime);
        }
        setTimePickerVisibility(false);
    };

    const handleDateCancel = () => {
        setDatePickerVisibility(false);
    };
    const handleTimeCancel = () => {
        setTimePickerVisibility(false);
    };

    // Fecha de hoy
    const today = new Date();
    // Fecha máxima: último día del año en curso
    const endOfYear = new Date(today.getFullYear(), 11, 31);

    const [selectedValue, setSelectedValue] = useState(value);

    useEffect(() => {
        if (pickerValues.length > 0) {
            setSelectedValue(value);
        }
    }, [pickerValues]);

    const handleValueChange = (itemValue) => {
        setSelectedValue(itemValue);
        if (onChangeText) {
            onChangeText(itemValue);
        }
    };

    return (
        <View style={[styles.container, { width, opacity, height, backgroundColor }]}>
            {iconImage && (
                <Image
                    source={iconImage}
                    style={[styles.icon, { width: widthI, height: heightI, tintColor: tintColor }]}
                />
            )}
            {keyboardType === 'fecha' ? (
                <>
                    <TextInput
                        style={[styles.input, { textAlign, padding, fontSize }]}
                        placeholder={placeholder}
                        value={selectedDate}
                        onPress={showDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        locale="es" // Configura el local para español
                        onConfirm={handleDateConfirm}
                        onCancel={handleDateCancel}
                        minimumDate={today} // Fecha mínima (hoy)
                        maximumDate={endOfYear} // Fecha máxima (último día del año en curso)
                    />
                </>
            ) : keyboardType === 'hora' ? (
                <>
                    <TextInput
                        style={[styles.input, { textAlign, padding, fontSize }]}
                        placeholder={placeholder}
                        value={selectedTime}
                        onPress={showTimePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        locale="es" // Configura el local para español
                        onConfirm={handleTimeConfirm}
                        onCancel={handleTimeCancel}
                    />
                </>
            ) : keyboardType === 'picker' ? (
                <>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.picker}
                        itemStyle={[styles.input, { fontSize }]}
                        onValueChange={handleValueChange}
                    >
                        <Picker.Item label={`${placeholder}`} value={0} />
                        {pickerValues.map((value) => (
                            <Picker.Item key={value.id} label={value.nombre} value={value.id} />
                        ))}
                    </Picker>
                </>
            ) : (
                <TextInput
                    style={[styles.input, { textAlign, padding, fontSize}]}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    secureTextEntry={secureTextEntry}
                    key={key}
                    placeholderTextColor={textColor}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E4E5EB',
        borderRadius: 5,
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    icon: {
        marginLeft: 10,
    },
    input: {
        flex: 1,
        fontFamily: 'PoppinsRegular',
        
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

// Función para formatear la hora como hh:mm a
const formatTime = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
};

// Función para formatear la fecha como DD/MM/YYYY
const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
export default CustomTextInput;
