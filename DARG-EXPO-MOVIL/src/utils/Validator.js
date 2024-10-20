// Función para validar el correo electrónico
export const correoValidate = (email) => {
    // Lista de dominios permitidos
    const allowedDomains = [
        'gmail.com',
        'hotmail.com',
        'yahoo.com',
        'outlook.com',
        'aol.com',          // Añadido: AOL
        'icloud.com',       // Añadido: iCloud
        'mail.com',         // Añadido: Mail.com
        'zoho.com',         // Añadido: Zoho
        'gmx.com',          // Añadido: GMX
        'protonmail.com',   // Añadido: ProtonMail
        'gmail.sv',
        'hotmail.sv',
        'yahoo.sv',
        'outlook.sv',
        'icloud.sv',
        'ricaldone.edu.sv'
    ];

    // Extrae el dominio del correo electrónico
    const domain = email.split('@')[1];

    // Verifica si el dominio está en la lista de dominios permitidos
    if (allowedDomains.some(allowedDomain => domain.endsWith(allowedDomain))) {
        return true;
    } else {
        return false;  // Si el dominio no está en la lista de dominios permitidos
    }
};

// Función para validar el formato del correo electrónico utilizando una expresión regular
export const validateEmail = (correo) => {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s¿@]+$/; // Expresión regular para validar formato de email
    return correoRegex.test(correo); // Devuelve true si el email cumple con el formato, false si no
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password); // Devuelve true si la contraseña cumple con el formato, false si no
};

// Format the NIT
export const formatNit = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 4) {
        return numericValue;
    } else if (numericValue.length <= 10) {
        return numericValue.slice(0, 4) + '-' + numericValue.slice(4);
    } else if (numericValue.length <= 13) {
        return numericValue.slice(0, 4) + '-' + numericValue.slice(4, 10) + '-' + numericValue.slice(10);
    } else {
        return numericValue.slice(0, 4) + '-' + numericValue.slice(4, 10) + '-' + numericValue.slice(10, 13) + '-' + numericValue.slice(13, 14);
    }
};

// Función para formatear el número de teléfono
export const formatTel = (value) => {
    const numericValue = value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
    if (numericValue.length <= 4) {
        return numericValue;
    } else if (numericValue.length <= 8) {
        return numericValue.slice(0, 4) + '-' + numericValue.slice(4);
    } else {
        return numericValue.slice(0, 4) + '-' + numericValue.slice(4, 8);
    }
};

// Función para formatear el DUI
export const formatDui = (value) => {
    const numericValue = value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
    if (numericValue.length <= 8) {
        return numericValue;
    } else {
        return numericValue.slice(0, 8) + '-' + numericValue.slice(8, 9);
    }
};

// Función que filtra solo letras en una cadena de texto
export const formatAlphabetic = (value) => {
    // Elimina todos los caracteres que no sean letras (mayúsculas o minúsculas)
    return value.replace(/[^a-zA-Z\s]/g, '');
};

// Función que filtra solo números en una cadena de texto
export const formatNumeric = (value) => {
    // Elimina todos los caracteres que no sean números (0-9)
    return value.replace(/[^0-9]/g, '');
};


// Función que filtra y sanitiza una cadena de texto para un correo electrónico
export const formatEmail = (email) => {
    // Elimina los espacios en blanco
    const noSpaces = email.replace(/\s+/g, '');
    // Elimina caracteres no válidos en el correo electrónico, excepto '@' y '.'
    const sanitizedEmail = noSpaces.replace(/[^a-zA-Z0-9@._-]/g, '');
    return sanitizedEmail;
};

// Función que filtra y sanitiza una cadena de texto para contraseñas
export const formatNOSpaces = (password) => {
    // Elimina los espacios en blanco
    return password.replace(/\s+/g, '');
};

// Función que filtra solo números y letras, eliminando caracteres especiales
export const formatAlphanumeric = (value) => {
    // Elimina todos los caracteres que no sean letras (mayúsculas o minúsculas) o números
    return value.replace(/[^a-zA-Z0-9]/g, '');
};

// Función que formatea una placa de automóvil según los prefijos válidos
export const formatPlaca = (value) => {
    // Definir los prefijos válidos
    const validPrefixes = [
        'A', 'AB', 'C', 'CC', 'CD', 'D', 'E', 'F', 'M', 'MB', 'MI',
        'N', 'O', 'P', 'PR', 'PNC', 'RE', 'T', 'V'
    ];

    // Eliminar espacios en blanco del valor
    value = value.replace(/\s+/g, '');

    // Verificar si comienza con un prefijo válido
    let isValidPrefix = false;
    let prefix = '';

    for (let validPrefix of validPrefixes) {
        if (value.startsWith(validPrefix)) {
            prefix = validPrefix;
            isValidPrefix = true;
            break;
        }
    }

    // Si no tiene un prefijo válido, retornar una cadena vacía
    if (!isValidPrefix) {
        return '';
    }

    // Obtener el sufijo (parte después del prefijo)
    let suffix = value.slice(prefix.length);

    // Validar que el sufijo tenga letras (excepto 'O'), números o guiones
    const validSuffix = /^[A-NP-Za-z0-9\-]+$/;

    // Si el sufijo es inválido, retornar solo el prefijo
    if (!validSuffix.test(suffix)) {
        return prefix;
    }

    // Retornar el valor completo formateado
    return prefix + suffix;
};

export const convertirFechaSQL = (fecha) => {
    // Divide la fecha en día, mes y año usando el delimitador "/"
    const [dia, mes, anio] = fecha.split('/');

    // Retorna la fecha en formato 'YYYY-MM-DD' para la consulta SQL
    return `${anio}-${mes}-${dia}`;
}

export const formatTime = (value) => {
    // Elimina todos los caracteres no numéricos o los dos puntos ':'
    let numericValue = value.replace(/[^0-9:]/g, '');

    // Eliminar segundos puntos si existen más de uno
    const colonCount = (numericValue.match(/:/g) || []).length;
    if (colonCount > 1) {
        numericValue = numericValue.replace(/:/g, '').slice(0, 4); // Se queda solo con los 4 primeros caracteres
    }

    // Si hay más de 2 caracteres, insertar ':' después del segundo dígito
    if (numericValue.length >= 3) {
        numericValue = numericValue.slice(0, 2) + ':' + numericValue.slice(2, 4);
    }

    // Limitar la longitud a 5 caracteres (hh:mm)
    if (numericValue.length > 5) {
        numericValue = numericValue.slice(0, 5);
    }

    // Validar horas y minutos para que estén en un rango correcto
    const [hours, minutes] = numericValue.split(':');

    if (hours && parseInt(hours) > 23) {
        numericValue = '23:' + (minutes || '');
    }

    if (minutes && parseInt(minutes) > 59) {
        numericValue = (hours || '00') + ':59';
    }

    return numericValue;
};
