#include <Arduino.h>
#include "init.h"
#include "networking.h"
#include "websocket.h"
#include "pins.h"

void setup() {
  initial_setup();
  init_wifi();
  initWebSocket();
}

void loop() {
  ws.cleanupClients();
  digitalWrite(ledPin, ledState);
}
