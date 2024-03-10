#include <Arduino.h>
#include "networking.h"
#include "websocket.h"
#include "pins.h"

void setup() {
  Serial.begin(115200);
  setupPins();
  initWifi();
  initWebSocket();
}

void loop() {
  ws.cleanupClients();
  // digitalWrite(ledPin, ledState);
}
