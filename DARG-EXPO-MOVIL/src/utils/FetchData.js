import Config from './Constantes'; // Importa el objeto de configuración desde 'Constantes'

// Función asincrónica que maneja las peticiones fetch
export default async function fetchData(filename, action, form = null) {
    // URL base del servidor obtenida desde la configuración
    const SERVER_URL = Config.SERVER_URL;
    console.log('SERVER_URL:', SERVER_URL); // Imprime la URL del servidor para depuración

    // Opciones para la petición fetch
    const OPTIONS = {
        method: form ? 'POST' : 'GET', // Usa POST si se proporciona un formulario, de lo contrario usa GET
        ...(form && { body: form }) // Añade el cuerpo si se proporciona un formulario
    };

    try {
        // Construcción de la URL con los parámetros necesarios
        const PATH = new URL(SERVER_URL + filename);
        PATH.searchParams.append('action', action);
        console.log('PATH:', PATH.href); // Imprime la URL completa para depuración

        // Realización de la petición fetch
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        
        // Verificación del estado de la respuesta
        if (!RESPONSE.ok) {
            throw new Error(`HTTP error! status: ${RESPONSE.status}`); // Lanza un error si el estado no es OK
        }

        // Parseo del JSON de la respuesta
        const DATA = await RESPONSE.json();
        //console.log('RESPONSE:', action, DATA); // Imprime los datos recibidos para depuración
        return DATA; // Devuelve los datos obtenidos

    } catch (error) {
        console.log('Fetch error:', error); // Imprime el error de fetch
        throw error; // Lanza el error para que el llamador pueda manejarlo
    }
}
