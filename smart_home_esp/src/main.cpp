#include <Arduino.h>
#include "wifi.h"
#include "mqtt.h"
// #include "websocket.h"
#include "pins.h"

void setup() {
  Serial.begin(115200);
  setupPins();
  initWifi();
  initMqtt();
  // initWebSocket();
}

void loop() {
  // ws.cleanupClients();
  // digitalWrite(ledPin, ledState);
  mqttClient.loop();
}
