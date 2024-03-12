import { WebSocket } from 'ws';
import { espIp } from './config';
import { wsServer } from './server';

const wsClient = new WebSocket(`ws://${espIp}/ws`);
const clients = {};

const initWsClient = () => {
  wsClient.on('error', console.error);

  wsClient.on('open', () => {
    console.log("CLIENT: connected to esp websocket");
  });

  wsClient.on('message', (data) => {
    console.log(`CLIENT: received from esp: ${data}`);
    const deserData = JSON.parse(data.toString());
    if (deserData?.action === "get_resp" || deserData?.action === "set_resp"){
      // TODO fix - sends out esp message for all frontend connections
      wsServer.clients.forEach(ws => {
        ws.send(JSON.stringify(deserData));
      })
    }
  });

  // retry connection if it fails
  wsClient.on('close', () => {
    console.log("CLIENT: connection closed, retrying")
    setTimeout(initWsClient, 5000);
    wsClient.close();
  })
}

export { wsClient, initWsClient };
