import { WebSocketServer } from 'ws';
import { mqttTopicCommand, wsListenIf, wsPort } from './config';
import { mqttClient } from './mqtt';
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
      }

      // const deserData = JSON.parse(data.toString());
      // if (deserData?.action === "get_resp" || deserData?.action === "set_resp"){
      //   // TODO fix - sends out esp message for all frontend connections
      //   wsServer.clients.forEach(ws => {
      //     ws.send(JSON.stringify(deserData));
      //   })
      // }
    });
  });
}

export { webServer, wsServer, initWsServer };
