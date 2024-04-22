
import { MqttClient, connect } from "mqtt"
import { mqttHost, mqttPort, mqttClientId, mqttTopicReply, mqttTopicStatusUpdate } from "./config"
import { states } from "./states";

let mqttClient: MqttClient;

const initMqttClient = () => {
  mqttClient = connect(`mqtt://${mqttHost}:${mqttPort}`, {
    clientId: mqttClientId,
    clean: true,
    connectTimeout: 4000,
    // username: 'emqx',
    // password: 'public',
    reconnectPeriod: 1000,
  })

  mqttClient.on('connect', () => {
    console.log(`mqttClient: connected to ${mqttHost}:${mqttPort}`);
    mqttClient.publish("sh/command", JSON.stringify({
      "action": "SET",
      "device": "HEATING",
      "data": 0
    }));
    mqttClient.publish("sh/command", JSON.stringify({
      "action": "SET",
      "device": "FAN_1",
      "data": 0
    }));
    mqttClient.publish("sh/command", JSON.stringify({
      "action": "SET",
      "device": "FAN_2",
      "data": 0
    }));
    mqttClient.publish("sh/command", JSON.stringify({
      "action": "SET",
      "device": "LED_3",
      "data": 1
    }));
  });

  mqttClient.subscribe([mqttTopicReply, mqttTopicStatusUpdate], () => {
    console.log(`mqttClient: Subscribing to topic '${mqttTopicReply} + ${mqttTopicStatusUpdate}'`);
  });

  mqttClient.on('message', (topic, payload) => {
    // console.log('mqttClient: Received Message:', topic, payload.toString())
    if (topic === mqttTopicStatusUpdate || topic === mqttTopicReply){
      const receivedData = JSON.parse(payload.toString());
      if (receivedData['action'] === 'STATUS_UPDATE'/* || receivedData['action'] === 'GET_RESP'*/){
        states.deviceStatus[receivedData['device']] = receivedData['data'];
      }
    }
  });
}

export { initMqttClient, mqttClient };
