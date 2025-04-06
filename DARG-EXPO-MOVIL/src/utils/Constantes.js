// IP de donde se encuentra la Api, en este caso la dirección 
// IP de la máquina local
// utilizar la dirección IP del servidor y no localhost
const createConfig = (ip) => ({
    IP: ip,
    SERVER_URL: `${ip}/Proyecto-Tecnico-Cientifico-2024/api/services/publico/`,
    IMAGE_URL: `${ip}/Proyecto-Tecnico-Cientifico-2024/api/images/`
});
const Config = createConfig('https://www.dargworkshop.lat'); // Aquí cambian la IP
export default Config;

//192.168.1.101
//https://www.dargworkshop.lat