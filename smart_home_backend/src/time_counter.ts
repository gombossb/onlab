import { timeUpdateResolution } from "./config";
import { states } from "./states";
import { timeHandler } from "./time_handler";

let counter = 0;
let counterLoop: NodeJS.Timeout | null = null;

const initCounterLoop = () => {
  counterLoop = setInterval(() => {
    counter = (counter + states.timeSpeed) % 86400;
    timeHandler(counter);
  }, timeUpdateResolution);
}

export { counter, initCounterLoop };
