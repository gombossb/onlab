import { WebSocketServer } from 'ws';
import { mqttTopicCommand, wsListenIf, wsPort } from './config';
import { mqttClient } from './mqtt';
import { handleWebSocketMessage } from './ws_handler';
const http = require('http');

const webServer = http.createServer();
const wsServer = new WebSocketServer({ server: webServer });

const initWsServer = () => {
  webServer.listen(wsPort, wsListenIf, () => {
    console.log(`wsServer: running on ${wsListenIf}:${wsPort}`);
  });

  wsServer.on('connection', (ws: any) => {
    ws.on('error', console.error);

    ws.on('message', (data: any) => {
      console.log(`wsServer: received from client: ${data}`);
      const deserData = JSON.parse(data);

      if (deserData?.action === "GET" || deserData?.action === "SET"){
        mqttClient.publish(mqttTopicCommand, JSON.stringify(deserData));
      } else {
        handleWebSocketMessage(deserData);
      }
    });
  });
}

export { webServer, wsServer, initWsServer };
