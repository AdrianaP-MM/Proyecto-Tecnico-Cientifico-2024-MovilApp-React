export const verDetalles = async (navigation, id_cita, fecha, hora, auto, movilizacion, zona, ida, regreso, estado) => {
    navigation.navigate('Detalles de la cita', {
        id_cita: id_cita,
        fecha: fecha,
        hora: hora,
        auto: auto,
        movilizacion: movilizacion,
        zona: zona,
        ida: ida,
        regreso: regreso,
        estado: estado
    });
};