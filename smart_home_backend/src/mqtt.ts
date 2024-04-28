
import { MqttClient, connect } from "mqtt"
import { mqttHost, mqttPort, mqttClientId, mqttTopicReply, mqttTopicStatusUpdate, mqttTopicCommand } from "./config"
import { states } from "./states";
import { wsServer } from "./ws_server";

let mqttClient: MqttClient;

const onlyDiffPublish = (device: string, targetValue: number) => {
  if (Number(states.deviceStatus[device]) != targetValue){
    mqttClient.publish(mqttTopicCommand, JSON.stringify({
      "action": "SET",
      "device": device,
      "data": `${targetValue}`
    }));
  }
}

const initMqttClient = () => {
  mqttClient = connect(`mqtt://${mqttHost}:${mqttPort}`, {
    clientId: mqttClientId,
    clean: true,
    connectTimeout: 2000,
    // username: 'emqx',
    // password: 'public',
    reconnectPeriod: 500,
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
  });

  mqttClient.subscribe([mqttTopicReply, mqttTopicStatusUpdate], () => {
    console.log(`mqttClient: Subscribing to topic '${mqttTopicReply} + ${mqttTopicStatusUpdate}'`);
  });

  mqttClient.on('message', (topic, payload) => {
    // console.log('mqttClient: Received Message:', topic, payload.toString())
    if (topic === mqttTopicStatusUpdate || topic === mqttTopicReply){
      const receivedData = JSON.parse(payload.toString());
      if (receivedData['action'] === 'STATUS_UPDATE'){
        states.deviceStatus[receivedData['device']] = receivedData['data'];

        if (receivedData['device'].startsWith("TMP_")){
          const index = Number(receivedData['device'].substring(4)) - 1;
          states.temps[index].push(Number(receivedData['data']));

          if (states.temps[index].length > 5)
            states.temps[index].shift();

          states.deviceStatus[`TMP_${index+1}`] = states.temps[index].reduce(
            (a: number, b: number) => a + b
          ) / states.temps[index].length;
        }
      } else if (receivedData['action'] === 'GET_RESP' || receivedData['action'] === 'SET_RESP'){
        wsServer.clients.forEach(c => {
          c.send(payload.toString());
        })
      }
    }
  });
}

export { initMqttClient, onlyDiffPublish, mqttClient };
