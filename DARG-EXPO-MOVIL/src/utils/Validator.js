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