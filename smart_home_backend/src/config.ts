const timeUpdateInterval = 500; // ms
const defaultTimeIncrement = 450;

const wsListenIf = "127.0.0.1";
const wsPort = 8081;

const mqttHost = "192.168.1.100";
const mqttPort = 1883;
const mqttClientId = `sh_backend_${Math.random().toString(16).slice(3)}`;

const mqttTopicReply = "sh/reply";
const mqttTopicStatusUpdate = "sh/statusupdate";
const mqttTopicCommand = "sh/command";

const blindsDownDegree = 150;
const blindsUpDegree = 0;

const tempEpsilon = 1.0;
const fanMaxValue = 4095;
const peltierMaxValue = 2048;

export {
  timeUpdateInterval, defaultTimeIncrement,
  wsListenIf, wsPort,
  mqttHost, mqttPort, mqttClientId,
  mqttTopicReply, mqttTopicStatusUpdate, mqttTopicCommand,
  blindsDownDegree, blindsUpDegree,
  tempEpsilon, fanMaxValue, peltierMaxValue
};
