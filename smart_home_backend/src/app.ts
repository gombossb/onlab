// https://github.com/stemmlerjs/simple-typescript-starter/tree/master
// https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
// https://khalilstemmler.com/blogs/typescript/node-starter-project/
// https://yarnpkg.com/package?name=ws

import { WebSocket, WebSocketServer } from 'ws';
const http = require('http');

const webServer = http.createServer();
const wsServer = new WebSocketServer({ server: webServer });
const listenInterface = "127.0.0.1";
const espIp = "192.168.1.110";
const port = 8081;
const wsClient = new WebSocket(`ws://${espIp}/ws`);

// todo time simulation
// getters, setters

// webServer.listen(port, listenInterface, () => {
//   console.log(`WebSocket server is running on ${listenInterface}:${port}`);
// });

// wsServer.on('connection', function connection(ws: any) {
//   ws.on('error', console.error);

//   ws.on('message', function message(data: any) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });

wsClient.on('error', console.error);

wsClient.on('open', function open() {
  console.log("connected to esp websocket")
  wsClient.send(JSON.stringify({
    'action': 'get',
    'device': 'LED_ONBOARD',
    'data': '1'
  }));
});

wsClient.on('message', function message(data) {
  console.log('received: %s', data);
});