#include <Arduino.h>
#include <ArduinoJson.h>
#include "websocket.h"
#include "pins.h"

bool setHandler(JsonDocument inputJson, uint32_t clientId){
    // const char *action = inputJson["action"];
    const char *device = inputJson["device"];
    const char *data = inputJson["data"];
    uint8_t outputPin = 0;

    if (strcmp(device, "LED_RED") == 0){
        redLedState = atoi(data);
        outputPin = redLedPin;
    } else if (strcmp(device, "LED_ONBOARD") == 0){
        onBoardLedState = atoi(data);
        outputPin = onBoardLedPin;
    }

    if (outputPin != 0){
        digitalWrite(outputPin, atoi(data));
        // Serial.print(outputPin);
        // Serial.print(" set to ");
        // Serial.println(atoi(data));
        
        ws.text(clientId, "ok");
        return true;
    }

    return false;
}
