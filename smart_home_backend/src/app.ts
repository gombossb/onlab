// https://github.com/stemmlerjs/simple-typescript-starter/tree/master
// https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
// https://khalilstemmler.com/blogs/typescript/node-starter-project/
// https://yarnpkg.com/package?name=ws

import { initWsClient, wsClient } from "./client";
import { initWsServer } from "./server";

// todo time simulation
// getters, setters

initWsServer();
initWsClient();
