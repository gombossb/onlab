#include <Arduino.h>
#include "pins.h"
#include "convert.h"
#include "handlers/get_handler.h"

String gettableDevices[NUM_GETTABLE] = {"LED_RED", "LED_ONBOARD", "TMP_1", "TMP_2", "TMP_3", "SERVO_BLINDS"};

bool gettableDeviceExists(String device){
    for (int i=0; i<NUM_GETTABLE; i++)
        if (gettableDevices[i] == device)
            return true;

    return false;
}

float tempReadingToC(uint32_t reading){
    return (reading * 3300) / 4096 / 10 - 273.15;
}

String getHandler(String device){
    String data = "";
    if (device == "LED_RED"){
        data = String(redLedState);
    } else if (device == "LED_ONBOARD"){
        data = String(onBoardLedState);
    } else if (device == "TMP_1"){
        uint32_t reading = analogRead(tmp1Pin);
        data = String(tempReadingToC(reading));
    } else if (device == "TMP_2"){
        uint32_t reading = analogRead(tmp2Pin);
        data = String(tempReadingToC(reading));
    } else if (device == "TMP_3"){
        uint32_t reading = analogRead(tmp3Pin);
        data = String(tempReadingToC(reading));
    } else if (device == "SERVO_BLINDS"){
        data = String(blindsState);
    }

    return data;
}
