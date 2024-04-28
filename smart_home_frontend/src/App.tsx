import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import useWebSocket from 'react-use-websocket';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme';

export const WS_URL = "ws://127.0.0.1:8081/ws";

function App() {
  // https://blog.logrocket.com/websocket-tutorial-real-time-node-react/
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    shouldReconnect: () => true,
    reconnectAttempts: 40,
    reconnectInterval: 1000,
    heartbeat: {
      timeout: 5000,
      interval: 2000,
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
