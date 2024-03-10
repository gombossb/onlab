// https://github.com/stemmlerjs/simple-typescript-starter/tree/master
// https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
// https://yarnpkg.com/package?name=ws

const { WebSocketServer } = require('ws');
const http = require('http');

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const listenInterface = "127.0.0.1";
const port = 8081;
server.listen(port, listenInterface, () => {
  console.log(`WebSocket server is running on ${listenInterface}:${port}`);
});
wsServer.on('connection', function connection(ws: any) {
  ws.on('error', console.error);

  ws.on('message', function message(data: any) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
