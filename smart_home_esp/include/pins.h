#include <ESP32Servo.h>

void setupPins();

const int ledCarPin = 23;
extern int ledCarState;

const int led1Pin = 21;
extern int led1State;

const int led2Pin = 19;
extern int led2State;

const int led3Pin = 18;
extern int led3State;

const int tmp1Pin = 36;
const int tmp2Pin = 39;
const int tmp3Pin = 34;

const int photoResPin = 35;

const int fan1Pin = 32;
extern int fan1State;

const int fan2Pin = 33;
extern int fan2State;

const int heatingPin = 25;
extern int heatingState;

const int blindsPin = 22;
extern int blindsState;
extern Servo blindsServo;
