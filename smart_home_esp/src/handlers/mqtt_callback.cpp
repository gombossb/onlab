#include <Arduino.h>
#include <ArduinoJson.h>
#include "mqtt.h"
#include "handlers/mqtt_callback.h"
#include "handlers/set_handler.h"
#include "handlers/get_handler.h"

void mqttCallback(char *topic, byte *payload, unsigned int length) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message:");
    for (int i = 0; i < length; i++) {
        Serial.print((char) payload[i]);
    }
    Serial.println();
    Serial.println("-----------------------");

    if (strcmp(topic, topicReceive) == 0){
        JsonDocument json;
        JsonDocument outputJson;
        DeserializationError err = deserializeJson(json, payload, length);
        if (err) {
            Serial.print("deserializeJson() failed with code ");
            Serial.println(err.c_str());
            return;
        }

        String action = json["action"];
        String device = json["device"];
        outputJson["device"] = device;
        String data = json["data"];

        if (action == "SET" && settableDeviceExists(device)){
            bool ret = setHandler(device, data);
            outputJson["action"] = "SET_RESP";
            outputJson["data"] = (ret) ? "OK" : "FAIL";
        } else if (action == "GET" && gettableDeviceExists(device)){
            String data = getHandler(device);
            outputJson["action"] = "GET_RESP";
            outputJson["data"] = (data != "") ? data : "FAIL";
        }

        String outputStr;
        serializeJson(outputJson, outputStr);
        mqttClient.publish(topicTransmit, outputStr.c_str());
    }
}
