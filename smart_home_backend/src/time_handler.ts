import { mqttClient } from "./mqtt";
import { states } from "./states";
import { wsServer } from "./ws_server";
import { blindsDownDegree, blindsUpDegree, mqttTopicCommand } from "./config";

const timeHandler = (counter: number) => {
  if (mqttClient.connected){
    console.log(states.deviceStatus)
    // TODO call to handling logic eg. auto brightness, blinds
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
  const seconds = count % 60;

  // return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
}

const hoursToCount = (hour: number, minute: number) =>
  hour * 3600 + minute * 60;

export { timeHandler, timeCountToTime };
