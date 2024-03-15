#include <PubSubClient.h>

extern const char *topicReceive;
extern const char *topicTransmit;
extern const char *topicStatusUpdate;

extern PubSubClient mqttClient;
void initMqtt();
void mqttReconnect();
