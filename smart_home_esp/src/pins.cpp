#include <Arduino.h>
#include "pins.h"

int onBoardLedState = 0;
int redLedState = 0;

void setupPins(){
    pinMode(onBoardLedPin, OUTPUT);
    pinMode(redLedPin, OUTPUT);
    pinMode(tmp1Pin, INPUT);
}
