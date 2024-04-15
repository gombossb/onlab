#include <ArduinoJson.h>

#define NUM_GETTABLE 11
extern String gettableDevices[];

bool gettableDeviceExists(String device);
String getHandler(String device);
