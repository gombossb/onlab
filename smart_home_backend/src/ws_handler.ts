import { onlyDiffPublish } from "./mqtt";
import { states } from "./states";
import { counterLoop } from "./time_counter";
import { wsServer } from "./ws_server";

export const handleWebSocketMessage = (msg: any) => {
  switch (msg?.action){
    case "SET_SPEED": {
      if (counterLoop && counterLoop[Symbol.toPrimitive]()){
        // clearInterval(counterLoop[Symbol.toPrimitive]());
        states.timeSpeed = Number(msg.data);
        // initCounterLoop();
        console.log(`counterLoop: speed set to ${msg.data}`);
      }
      break;
    }

    case "GET_SPEED": {
      wsServer.clients.forEach(c => {
        c.send(JSON.stringify({
          "action": "GET_SPEED",
          "data": states.timeSpeed
        }));
      });
      break;
    }
    
    case "GET_ROLLUP": {
      wsServer.clients.forEach(c => {
        c.send(JSON.stringify({
          "action": "GET_ROLLUP",
          "data": states.blindsUpTime
        }));
      });
      break;
    }

    case "SET_ROLLUP": {
      const h = Number(msg.data);
      if (h > 3 && h <= 12)
        states.blindsUpTime = h;
      break;
    }

    case "GET_ROLLDOWN": {
      wsServer.clients.forEach(c => {
        c.send(JSON.stringify({
          "action": "GET_ROLLDOWN",
          "data": states.blindsDownTime
        }));
      });
      break;
    }

    case "SET_ROLLDOWN": {
      const h = Number(msg.data);
      if (h > 14 && h <= 22)
        states.blindsDownTime = h;
      break;
    }

    case "GET_TARGETTEMP": {
      wsServer.clients.forEach(c => {
        c.send(JSON.stringify({
          "action": "GET_TARGETTEMP",
          "data": states.targetTemp
        }));
      });
      break;
    }

    case "SET_TARGETTEMP": {
      const val = msg.data;
      if (val > 16 && val < 27){
        states.targetTemp = val;
      }
      break;
    }

    case "GET_AUTOBLINDS": {
      wsServer.clients.forEach(c => {
        c.send(JSON.stringify({
          "action": "GET_AUTOBLINDS",
          "data": states.autoBlinds
        }));
      });
      break;
    }

    case "SET_AUTOBLINDS": {
      const val = msg.data;
      if (val === true || val === false){
        states.autoBlinds = val;
      }
      break;
    }

    case "GET_AUTOTEMPCONTROL": {
      wsServer.clients.forEach(c => {
        c.send(JSON.stringify({
          "action": "GET_AUTOTEMPCONTROL",
          "data": states.autoTempControl
        }));
      });
      break;
    }

    case "SET_AUTOTEMPCONTROL": {
      const val = msg.data;
      if (val === true || val === false){
        states.autoTempControl = val;
        if (val === false){
          onlyDiffPublish("FAN_1", 0);
          onlyDiffPublish("FAN_2", 0);
          onlyDiffPublish("HEATING", 0);
        }
      }
      break;
    }
  }
}
