import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import useWebSocket from 'react-use-websocket';

export const WS_URL = "ws://127.0.0.1:8081/ws";

function App() {
  // https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    shouldReconnect: () => true,
    reconnectAttempts: 5,
    reconnectInterval: 3000,
  });

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  )
}

export default App
