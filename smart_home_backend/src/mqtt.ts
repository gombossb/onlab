
import { MqttClient, connect } from "mqtt"
import { mqttHost, mqttPort, mqttClientId, mqttTopicReply, mqttTopicStatusUpdate } from "./config"
import { states } from "./states";

let mqttClient: MqttClient;

// let redLed = 0;
// let onboardLed = 1;

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
    // setInterval(() => {
    //   mqttClient.publish("sh/command", JSON.stringify({
    //     "action": "GET",
    //     "device": "LED_ONBOARD",
    //     // "data": onboardLed
    //   }), {retain:true,qos:2});
    //   onboardLed = onboardLed == 0 ? 1 : 0;
    // }, 1000);
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
