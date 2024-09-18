export const verDetalles = (navigation, cita) => {
    navigation.navigate('Detalles de la cita', {
        id_cita: cita.id_cita,
        fecha: cita.fecha_cita,
        hora: cita.hora_cita,
        auto: cita.id_automovil,
        movilizacion: cita.movilizacion_vehiculo,
        zona: cita.zona_habilitada, 
        ida: cita.direccion_ida, 
        regreso: cita.direccion_regreso, 
        estado: cita.estado 
    });
};
