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
    pinMode(ledCarPin, OUTPUT);
    digitalWrite(ledCarPin, ledCarState);

    pinMode(led1Pin, OUTPUT);
    digitalWrite(led1Pin, led1State);
    pinMode(led2Pin, OUTPUT);
    digitalWrite(led2Pin, led2State);
    pinMode(led3Pin, OUTPUT);
    digitalWrite(led3Pin, led3State);

    pinMode(tmp1Pin, INPUT);
    pinMode(tmp2Pin, INPUT);
    pinMode(tmp3Pin, INPUT);

    pinMode(photoResPin, INPUT);

    pinMode(fan1Pin, OUTPUT);
    analogWrite(fan1Pin, fan1State);
    pinMode(fan2Pin, OUTPUT);
    analogWrite(fan2Pin, fan2State);

    pinMode(heatingPin, OUTPUT);
    analogWrite(heatingPin, heatingState);

    pinMode(blindsPin, OUTPUT);

    blindsServo.setPeriodHertz(50);
    blindsServo.attach(blindsPin, 500, 2400);
    blindsServo.write(blindsState);
}
