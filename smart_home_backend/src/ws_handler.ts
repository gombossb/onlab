import { states } from "./states";
import { counterLoop, initCounterLoop } from "./time_counter";
import { wsServer } from "./ws_server";

export const handleWebSocketMessage = (msg: any) => {
  if (msg?.action === "SET_SPEED"){
    if (counterLoop && counterLoop[Symbol.toPrimitive]())
      // clearInterval(counterLoop[Symbol.toPrimitive]());
      states.timeSpeed = Number(msg.data);
      // initCounterLoop();
      console.log(`counterLoop: speed set to ${msg.data}`);
  } else if (msg?.action === "GET_SPEED"){
    wsServer.clients.forEach(c => {
      c.send(JSON.stringify({
        "action": "GET_SPEED",
        "data": states.timeSpeed
      }));
    });
  } else if (msg?.action === "GET_ROLLUP"){
    wsServer.clients.forEach(c => {
      c.send(JSON.stringify({
        "action": "GET_ROLLUP",
        "data": states.blindsUpTime
      }));
    });
  } else if (msg?.action === "SET_ROLLUP"){
    const h = Number(msg.data);
    if (h > 3 && h <= 12)
      states.blindsUpTime = h;

    console.log(states);
  } else if (msg?.action === "GET_ROLLDOWN"){
    wsServer.clients.forEach(c => {
      c.send(JSON.stringify({
        "action": "GET_ROLLDOWN",
        "data": states.blindsDownTime
      }));
    });
  } else if (msg?.action === "SET_ROLLDOWN"){
    const h = Number(msg.data);
    if (h > 14 && h <= 22)
      states.blindsDownTime = h;

    console.log(states);
  }
}
