#include <Arduino.h>
#include <ESPAsyncWebServer.h>

extern AsyncWebServer server;
extern AsyncWebSocket ws;

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len, uint32_t client_id);
void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
    void *arg, uint8_t *data, size_t len);
void initWebSocket();
