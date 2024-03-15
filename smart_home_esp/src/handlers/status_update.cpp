#include <Arduino.h>
#include "handlers/get_handler.h"
#include "mqtt.h"

void sendStatusUpdate(){
    for (int i=0; i<NUM_GETTABLE; i++){
        JsonDocument outputJson;
        outputJson["action"] = "STATUS_UPDATE";
        outputJson["device"] = gettableDevices[i];
        outputJson["data"] = getHandler(gettableDevices[i]);

        String outputStr;
        serializeJson(outputJson, outputStr);
        mqttClient.publish(topicStatusUpdate, outputStr.c_str());
        // delay?
    }
}
