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

unsigned long lastMsg = 0;
int value = 0;

void loop() {
  if (!mqttClient.connected()){
    mqttReconnect();
  }
  // ws.cleanupClients();
  // digitalWrite(ledPin, ledState);
  mqttClient.loop();
  unsigned long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    Serial.print("Publish message: ");
    Serial.println(now);
    mqttClient.publish("shtime", String(now).c_str());
  }
}
