#include <Arduino.h>
#include <WiFi.h>

// https://randomnerdtutorials.com/esp8266-nodemcu-websocket-server-arduino/

const char* ssid = "onlab_smart_home";
const char* password = "rubberduck_soup_#^24";
IPAddress boardIP(192, 168, 1, 110);
IPAddress gatewayIP(192, 168, 1, 1);
IPAddress subnet(255, 255, 255, 0);
IPAddress nullIP(0, 0, 0, 0);

WiFiClient wifiClient;

void initWifi() {
  WiFi.mode(WIFI_STA);
  WiFi.config(boardIP, gatewayIP, subnet, nullIP, nullIP);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}
