#include <ArduinoJson.h>

#define NUM_SETTABLE 3
extern String settableDevices[];

bool settableDeviceExists(String device);
bool setHandler(String device, String data);
