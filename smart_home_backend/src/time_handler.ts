import { mqttClient } from "./mqtt";
import { states } from "./states";
import { wsServer } from "./ws_server";

const timeHandler = (counter: number) => {
  if (mqttClient.connected && wsServer.clients.size){
    // TODO call to handling logic eg. auto brightness, blinds

    wsServer.clients.forEach(wsC => {
      wsC.send(JSON.stringify({
        'action': 'STATUS_UPDATE',
        'time': timeCountToTime(counter),
        'timeCounter': counter,
        'deviceStatus': states.deviceStatus
      }));
    })
  }
}

const timeCountToTime = (count: number) => {
  const hours = Math.floor(count / 3600.0);
  const minutes = Math.floor((count % 3600) / 60.0);
  const seconds = count % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export { timeHandler, timeCountToTime };
