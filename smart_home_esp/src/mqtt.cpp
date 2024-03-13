// https://www.emqx.com/en/blog/esp32-connects-to-the-free-public-mqtt-broker

#include <WiFi.h>
#include "wifi.h"
#include "mqtt.h"
#include "handlers/mqtt_callback.h"

const char *mqtt_broker = "192.168.1.100";
const int mqtt_port = 1883;
const char *topic = "shtime";
// const char *mqtt_username = "emqx";
// const char *mqtt_password = "public";

PubSubClient mqttClient;

void initMqtt(){
    mqttClient.setClient(wifiClient);
    mqttClient.setCallback(mqttCallback);
    mqttClient.setServer(mqtt_broker, mqtt_port);

    // TODO
    mqttClient.publish(topic, "Hi, I'm ESP32 ^^");
    mqttClient.subscribe(topic);
}

void mqttReconnect(){
    String client_id = "esp32-client-";
    client_id += String(WiFi.macAddress());

    while (!mqttClient.connected()){
        if (mqttClient.connect(client_id.c_str())){
            Serial.print("Connected to MQTT broker: ");
            Serial.print(mqtt_broker);
            Serial.print(":");
            Serial.println(mqtt_port);
        } else {
            Serial.print("failed with state ");
            Serial.println(mqttClient.state());
            delay(2000);
        }
    }
}
