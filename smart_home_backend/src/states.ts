import { defaultTimeIncrement, blindsDownDegree } from "./config";

const states: any = {
  'timeSpeed': defaultTimeIncrement,
  // 'updateFrequency': timeUpdateInterval,
  'deviceStatus': {
    'SERVO_BLINDS': `${blindsDownDegree}`
  },
  'autoBlinds': true,
  'blindsUpTime': 7,
  'blindsDownTime': 18,
  'autoTempControl': true,
  'targetTemp': 21,
  'temps': [[], [], []],
};

export { states };
