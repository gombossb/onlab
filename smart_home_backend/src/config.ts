const dayResolution = 86400;
const timeUpdateResolution = 500; // ms
const defaultTimeUpdateSpeed = 60;

const wsListenIf = "127.0.0.1";
const wsPort = 8081;

const mqttHost = "192.168.1.100";
const mqttPort = 1883;
const mqttClientId = `sh_backend_${Math.random().toString(16).slice(3)}`;

export { dayResolution, timeUpdateResolution, defaultTimeUpdateSpeed, wsListenIf, wsPort, mqttHost, mqttPort, mqttClientId };
