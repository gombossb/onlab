import { WebSocketServer } from 'ws';
const http = require('http');
import { listenInterface, port } from './config';
import { wsClient } from './client';

const webServer = http.createServer();
const wsServer = new WebSocketServer({ server: webServer });

const initWsServer = () => {
  webServer.listen(port, listenInterface, () => {
    console.log(`SERVER: ws server is running on ${listenInterface}:${port}`);
  });

  wsServer.on('connection', (ws: any) => {
    ws.on('error', console.error);

    ws.on('message', (data: any) => {
      console.log(`SERVER: received from client: ${data}`);
      const deserData = JSON.parse(data);
      if (deserData?.action === "get" || deserData?.action === "set"){
        wsClient.send(JSON.stringify(deserData));
      }
    });
  });
}

export { webServer, wsServer, initWsServer };
