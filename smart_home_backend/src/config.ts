const timeUpdateInterval = 100; // ms
const defaultTimeIncrement = 1800 / 10;

const wsListenIf = "127.0.0.1";
const wsPort = 8081;

const mqttHost = "192.168.1.100";
const mqttPort = 1883;
const mqttClientId = `sh_backend_${Math.random().toString(16).slice(3)}`;

const mqttTopicReply = "sh/reply";
const mqttTopicStatusUpdate = "sh/statusupdate";
const mqttTopicCommand = "sh/command";

export {
  timeUpdateInterval, defaultTimeIncrement,
  wsListenIf, wsPort,
  mqttHost, mqttPort, mqttClientId,
  mqttTopicReply, mqttTopicStatusUpdate, mqttTopicCommand
};
