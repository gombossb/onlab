#include <ESP32Servo.h>

void setupPins();

const int onBoardLedPin = 2;
extern int onBoardLedState;

const int redLedPin = 23;
extern int redLedState;

const int tmp1Pin = 36;

const int blindsPin = 22;
extern int blindsState;
extern Servo blindsServo;
