const listenInterface = "127.0.0.1";
const espIp = "192.168.1.110";
const port = 8081;
const dayResolution = 86400;
const timeUpdateResolution = 500; // ms

const mqttHost = "192.168.1.100";
const mqttPort = 1883;
const mqttClientId = `sh_backend_${Math.random().toString(16).slice(3)}`;

export { listenInterface, espIp, port, dayResolution, timeUpdateResolution, mqttHost, mqttPort, mqttClientId };
