#include <Arduino.h>
#include <ArduinoJson.h>
#include "websocket.h"
#include "pins.h"

bool getHandler(JsonDocument inputJson, uint32_t clientId){
    // const char *action = inputJson["action"];
    const char *device = inputJson["device"];
    // const char *data = inputJson["data"];

    JsonDocument outputJson;
    outputJson["device"] = device;

    if (strcmp(device, "LED_RED") == 0){
        Serial.print(redLedState);
        outputJson["data"] = String(redLedState);
    } else if (strcmp(device, "LED_ONBOARD") == 0){
        Serial.print(onBoardLedState);
        outputJson["data"] = String(onBoardLedState);
    }

    if (outputJson.containsKey("data")){
        String outputStr;
        serializeJson(outputJson, outputStr);
        ws.text(clientId, outputStr);
        return true;
    }

    return false;
}
