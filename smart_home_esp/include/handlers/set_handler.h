#include <ArduinoJson.h>

#define NUM_SETTABLE 2
extern String settableDevices[];

bool settableDeviceExists(String device);
bool setHandler(String device, String data);
