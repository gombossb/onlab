import { dayResolution, timeUpdateResolution } from "./config";
import { states } from "./states";

let counter = 0;
let counterLoop: NodeJS.Timeout | null = null;

const initCounterLoop = () => {
  counterLoop = setInterval(() => {
    counter = (counter + states.timeSpeed) % dayResolution;
    console.log(counter);
  }, timeUpdateResolution);
}

const timeCountToTime = (count: number) => {
  const hourRatio = dayResolution / 24;
  const minuteRatio = dayResolution / (24 * 60);
  const secondRatio = dayResolution / (24 * 60 * 60);

  // const hour = count - 
  // TODO
}

export { counter, initCounterLoop };
