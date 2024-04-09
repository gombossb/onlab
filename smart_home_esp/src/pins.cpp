#include <Arduino.h>
#include <ESP32Servo.h>
#include "pins.h"

int onBoardLedState = 0;
int redLedState = 0;
int blindsState = 0;

Servo blindsServo;

void setupPins(){
    pinMode(onBoardLedPin, OUTPUT);
    pinMode(redLedPin, OUTPUT);
    pinMode(tmp1Pin, INPUT);
    pinMode(tmp2Pin, INPUT);
    pinMode(tmp3Pin, INPUT);
    pinMode(blindsPin, OUTPUT);

    blindsServo.setPeriodHertz(50);
    blindsServo.attach(blindsPin, 1050, 1950);
    blindsServo.write(blindsState);
}
