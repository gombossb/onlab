#include <ArduinoJson.h>

#define NUM_GETTABLE 4
extern String gettableDevices[];

bool gettableDeviceExists(String device);
String getHandler(String device);
