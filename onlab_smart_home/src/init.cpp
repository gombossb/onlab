#include <Arduino.h>
#include "pins.h"

void initial_setup(){
    Serial.begin(115200);
    pinMode(ledPin, OUTPUT);
}
