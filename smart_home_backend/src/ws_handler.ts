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
        "Data": states.timeSpeed
      }));
    });
  }
}
