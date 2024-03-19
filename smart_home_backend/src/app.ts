// https://github.com/stemmlerjs/simple-typescript-starter/tree/master
// https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
// https://khalilstemmler.com/blogs/typescript/node-starter-project/
// https://yarnpkg.com/package?name=ws

import { initMqttClient } from "./mqtt";
import { initCounterLoop } from "./time_counter";
import { initWsServer } from "./ws_server";

initMqttClient();
initWsServer();
initCounterLoop();
