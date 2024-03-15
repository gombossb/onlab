#include <Arduino.h>
#include "pins.h"
#include "convert.h"
#include "handlers/get_handler.h"

String gettableDevices[NUM_GETTABLE] = {"LED_RED", "LED_ONBOARD", "TMP_1"};

bool gettableDeviceExists(String device){
    for (int i=0; i<NUM_GETTABLE; i++)
        if (gettableDevices[i] == device)
            return true;

    return false;
}

String getHandler(String device){
    String data = "";
    if (device == "LED_RED"){
        data = String(redLedState);
    } else if (device == "LED_ONBOARD"){
        data = String(onBoardLedState);
    } else if (device == "TMP_1"){
        uint32_t voltage = analogReadMilliVolts(tmp1Pin);
        // TODO fix
        float celsius = millivoltToCelsius(voltage);
        // Serial.println(voltage);
        // Serial.println(celsius);
        // Serial.println("--------");
        data = String(celsius);
    }

    return data;
}
