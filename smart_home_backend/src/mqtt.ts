
import { MqttClient, connect } from "mqtt"
import { mqttHost, mqttPort, mqttClientId } from "./config"

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
    console.log(`mqttClient: connected to ${mqttHost}:${mqttPort}`)
  })

  const topic = 'shtime'

  mqttClient.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })

  mqttClient.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
  })
}

export { initMqttClient, mqttClient };