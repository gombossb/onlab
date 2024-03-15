#include <Arduino.h>
#include "pins.h"
#include "handlers/set_handler.h"

String settableDevices[NUM_SETTABLE] = {"LED_RED", "LED_ONBOARD"};

bool settableDeviceExists(String device){
    for (int i=0; i<NUM_SETTABLE; i++)
        if (settableDevices[i] == device)
            return true;

    return false;
}

bool setHandler(String device, String data){
    int dataInt = atoi(data.c_str());

    if (device == "LED_RED"){
        redLedState = dataInt;
        digitalWrite(redLedPin, dataInt);
        return true;
    } else if (device == "LED_ONBOARD"){
        onBoardLedState = dataInt;
        digitalWrite(onBoardLedPin, dataInt);
        return true;
    }

    return false;
}
