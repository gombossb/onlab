#include <Arduino.h>
#include "pins.h"
#include "handlers/set_handler.h"

String settableDevices[NUM_SETTABLE] = {"LED_CAR", "LED_1", "LED_2", "LED_3", "FAN_1", "FAN_2", "HEATING", "SERVO_BLINDS"};

bool settableDeviceExists(String device){
    for (int i=0; i<NUM_SETTABLE; i++)
        if (settableDevices[i] == device)
            return true;

    return false;
}

bool setHandler(String device, String data){
    int dataInt = atoi(data.c_str());

    if (device == "LED_CAR"){
        ledCarState = dataInt;
        analogWrite(ledCarPin, dataInt);
        return true;
    } else if (device == "LED_1"){
        led1State = dataInt;
        digitalWrite(led1Pin, dataInt);
        return true;
    } else if (device == "LED_2"){
        led2State = dataInt;
        digitalWrite(led2Pin, dataInt);
        return true;
    } else if (device == "LED_3"){
        led3State = dataInt;
        digitalWrite(led3Pin, dataInt);
        return true;
    } else if (device == "FAN_1"){
        fan1State = dataInt;
        analogWrite(fan1Pin, dataInt);
        return true;
    } else if (device == "FAN_2"){
        fan2State = dataInt;
        analogWrite(fan2Pin, dataInt);
        return true;
    } else if (device == "HEATING"){
        heatingState = dataInt;
        analogWrite(heatingPin, dataInt);
        return true;
    } else if (device == "SERVO_BLINDS" && dataInt >= 0 && dataInt <= 180){
        blindsState = dataInt;
        blindsServo.write(dataInt);
        return true;
    }

    return false;
}
