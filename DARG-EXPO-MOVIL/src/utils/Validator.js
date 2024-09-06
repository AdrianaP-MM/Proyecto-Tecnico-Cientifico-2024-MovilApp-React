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
        'protonmail.com'    // Añadido: ProtonMail
    ];

    // Extrae el dominio del correo electrónico
    const domain = email.split('@')[1];

    // Verifica si el dominio está en la lista de dominios permitidos
    return allowedDomains.includes(domain.toLowerCase());
};

// Función para validar el formato del correo electrónico utilizando una expresión regular
export const validateEmail = (correo) => {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de email
    return correoRegex.test(correo); // Devuelve true si el email cumple con el formato, false si no
};

export const formatNit = (value) => {
    return value.replace(/\D/g, '').slice(0, 14); // Elimina caracteres no numéricos y limita a 14 dígitos
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