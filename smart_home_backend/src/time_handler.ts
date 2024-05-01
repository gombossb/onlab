import { mqttClient, onlyDiffPublish } from "./mqtt";
import { states } from "./states";
import { wsServer } from "./ws_server";
import { blindsDownDegree, blindsUpDegree, fanMaxValue, mqttTopicCommand, peltierMaxValue, tempEpsilon } from "./config";

const timeHandler = (counter: number) => {
  if (mqttClient.connected){
    console.log(states)
    if (states.autoBlinds){
      if (states.deviceStatus["SERVO_BLINDS"] == blindsDownDegree && (counter >= hoursToCount(states.blindsUpTime, 0) && counter <= hoursToCount(states.blindsDownTime, 0))){
        mqttClient.publish(mqttTopicCommand, JSON.stringify({
          "action": "SET",
          "device": "SERVO_BLINDS",
          "data": `${blindsUpDegree}`
        }));
      } else if (states.deviceStatus["SERVO_BLINDS"] == blindsUpDegree && (counter >= hoursToCount(states.blindsDownTime, 0) || counter <= hoursToCount(states.blindsUpTime, 0))){
        mqttClient.publish(mqttTopicCommand, JSON.stringify({
          "action": "SET",
          "device": "SERVO_BLINDS",
          "data": `${blindsDownDegree}`
        }));
      }
    }

    if (states.autoTempControl && states.deviceStatus["FAN_1"] && states.deviceStatus["FAN_2"] && states.deviceStatus["HEATING"]){
      const average: number = (
        states.deviceStatus['TMP_1'] + states.deviceStatus['TMP_2'] + states.deviceStatus['TMP_3']
      ) / 3.0;
      
      // cooling
      if ((average - states.targetTemp) > tempEpsilon){
        onlyDiffPublish("FAN_1", fanMaxValue);
        onlyDiffPublish("FAN_2", fanMaxValue);
        onlyDiffPublish("HEATING", 0);

      // heating
      } else if ((average - states.targetTemp) < (-1.0 * tempEpsilon)){
        onlyDiffPublish("FAN_1", 0);
        onlyDiffPublish("FAN_2", 0);
        onlyDiffPublish("HEATING", peltierMaxValue);
        
      // no heating, cooling
      } else {
        onlyDiffPublish("FAN_1", 0);
        onlyDiffPublish("FAN_2", 0);
        onlyDiffPublish("HEATING", 0);
      }
    }

    // turn on car charging LED if light level over simulated 50 W
    const carCharging = states.deviceStatus["PHOTO_RES"];
    const toChargeCar = (((states.deviceStatus["PHOTO_RES"] - 100)/12) > 50) ? 1 : 0;
    onlyDiffPublish("LED_CAR", toChargeCar ? carCharging : 0);

    if (wsServer.clients.size){
      wsServer.clients.forEach(wsC => {
        wsC.send(JSON.stringify({
          'action': 'STATUS_UPDATE',
          'time': timeCountToTime(counter),
          'timeCounter': counter,
          'status': states
        }));
      })
    }
  }
}

const timeCountToTime = (count: number) => {
  const hours = Math.floor(count / 3600.0);
  const minutes = Math.floor((count % 3600) / 60.0);
  // const seconds = count % 60;

  // return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
}

const hoursToCount = (hour: number, minute: number) =>
  hour * 3600 + minute * 60;

export { timeHandler, timeCountToTime };
