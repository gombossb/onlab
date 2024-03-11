// https://m1cr0lab-esp32.github.io/remote-control-with-websocket/websocket-and-json/
// https://randomnerdtutorials.com/esp8266-nodemcu-websocket-server-arduino/

#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include "pins.h"
#include "handlers/get_handler.h"
#include "handlers/set_handler.h"

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len, uint32_t client_id) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    JsonDocument json;
    DeserializationError err = deserializeJson(json, data);
    if (err) {
        Serial.print(F("deserializeJson() failed with code "));
        Serial.println(err.c_str());
        return;
    }

    const char *action = json["action"];
    if (strcmp(action, "set") == 0) {
      setHandler(json, client_id);
    } else if (strcmp(action, "get") == 0){
      getHandler(json, client_id);
    }
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
             void *arg, uint8_t *data, size_t len) {
    switch (type) {
      case WS_EVT_CONNECT:
        Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
        break;
      case WS_EVT_DISCONNECT:
        Serial.printf("WebSocket client #%u disconnected\n", client->id());
        break;
      case WS_EVT_DATA:
        handleWebSocketMessage(arg, data, len, client->id());
        break;
      case WS_EVT_PONG:
      case WS_EVT_ERROR:
        break;
  }
}

const char index_html[] PROGMEM = R"rawliteral(
hello world
)rawliteral";

void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", index_html);
  });

  // Start server
  server.begin();
}
