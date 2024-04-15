#include <Arduino.h>
#include "pins.h"
#include "handlers/get_handler.h"

String gettableDevices[NUM_GETTABLE] = {"LED_CAR", "LED_1", "LED_2", "LED_3", "TMP_1", "TMP_2", "TMP_3", "FAN_1", "FAN_2", "HEATING", "SERVO_BLINDS"};

bool gettableDeviceExists(String device){
    for (int i=0; i<NUM_GETTABLE; i++)
        if (gettableDevices[i] == device)
            return true;

    return false;
}

int tempReadingToC(uint32_t reading){
    return (((int)reading * 5.0 / 4096.0) - 3.3) / 0.055;
}

String getHandler(String device){
    String data = "";
    // if (device == "LED_1"){
    //     data = String(led1State);
    // } else if (device == "LED_2"){
    //     data = String(led2State);
    // } else if (device == "LED_3"){
    //     data = String(led3State);

    /*} else */ if (device == "TMP_1"){
        uint32_t reading = analogRead(tmp1Pin);
        delay(10);
        data = String(tempReadingToC(reading));
    } else if (device == "TMP_2"){
        uint32_t reading = analogRead(tmp2Pin);
        delay(10);
        data = String(tempReadingToC(reading));
    } else if (device == "TMP_3"){
        uint32_t reading = analogRead(tmp3Pin);
        delay(10);
        data = String(tempReadingToC(reading));

     } //else if (device == "FAN_1"){
    //     data = String(fan1State);
    // } else if (device == "FAN_2"){
    //     data = String(fan2State);

    // } else if (device == "HEATING"){
    //     data = String(heatingPin);

    /*} else */ if (device == "SERVO_BLINDS"){
        data = String(blindsState);
    }

    return data;
}
