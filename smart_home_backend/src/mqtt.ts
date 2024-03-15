
import { MqttClient, connect } from "mqtt"
import { mqttHost, mqttPort, mqttClientId } from "./config"

let mqttClient: MqttClient;

let redLed = 0;
let onboardLed = 1;

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
    setInterval(() => {
      mqttClient.publish("sh/command", JSON.stringify({
        "action": "SET",
        "device": "LED_ONBOARD",
        "data": onboardLed
      }), {retain:true,qos:2});
      onboardLed = onboardLed == 0 ? 1 : 0;
    }, 1000);
  });

  const topic1 = 'sh/reply'
  const topic2 = 'sh/statusupdate'

  mqttClient.subscribe([topic1, topic2], () => {
    console.log(`Subscribe to topic '${topic1} + ${topic2}'`);
  });

  mqttClient.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
  });
}

export { initMqttClient, mqttClient };
