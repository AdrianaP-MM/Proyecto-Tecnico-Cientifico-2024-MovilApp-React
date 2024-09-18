// IP de donde se encuentra la Api, en este caso la dirección 
// IP de la máquina local
// utilizar la dirección IP del servidor y no localhost
const createConfig = (ip) => ({
    IP: ip,
    SERVER_URL: `${ip}/PROYECTO-TECNICO-CIENTIFICO-2024/api/services/publico/`,
    IMAGE_URL: `${ip}/PROYECTO-TECNICO-CIENTIFICO-2024/api/images/`
});
const Config = createConfig('http://192.168.248.128'); // Aquí cambian la IP
export default Config;