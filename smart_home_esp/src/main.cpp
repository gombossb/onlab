#include <Arduino.h>
#include "wifi.h"
#include "mqtt.h"
#include "pins.h"
#include "handlers/status_update.h"

void setup() {
  Serial.begin(115200);
  setupPins();
  initWifi();
  initMqtt();
}

unsigned long lastMsg = 0;

void loop() {
  if (!mqttClient.connected()){
    mqttReconnect();
  }

  mqttClient.loop();

  unsigned long now = millis();
  if (now - lastMsg > 1000) {
    lastMsg = now;
    sendStatusUpdate();
  }
}
