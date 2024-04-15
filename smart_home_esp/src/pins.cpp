#include <Arduino.h>
#include <ESP32Servo.h>
#include "pins.h"

int ledCarState = 0;

int led1State = 0;
int led2State = 0;
int led3State = 0;

int fan1State = 0;
int fan2State = 0;

int heatingState = 0;

int blindsState = 0;

Servo blindsServo;

void setupPins(){
    pinMode(ledCarState, OUTPUT);

    pinMode(led1Pin, OUTPUT);
    pinMode(led2Pin, OUTPUT);
    pinMode(led3Pin, OUTPUT);

    pinMode(tmp1Pin, INPUT);
    pinMode(tmp2Pin, INPUT);
    pinMode(tmp3Pin, INPUT);

    pinMode(fan1Pin, OUTPUT);
    pinMode(fan2Pin, OUTPUT);

    pinMode(heatingPin, OUTPUT);

    pinMode(blindsPin, OUTPUT);

    blindsServo.setPeriodHertz(50);
    blindsServo.attach(blindsPin, 500, 2400);
    blindsServo.write(blindsState);
}
