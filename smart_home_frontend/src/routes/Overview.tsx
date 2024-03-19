import useWebSocket, { ReadyState } from "react-use-websocket";
import { WS_URL } from "../App";
import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import { Box, Button, Stack } from "@mui/material";

const Overview = () => {
  const [temperature1, setTemperature1] = useState(0);
  const [time, setTime] = useState('00:00:00');
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
      
  //   }, 1000);
  //   clearInterval(interval);
  // }, []);

  useEffect(() => {
    if (lastMessage?.data){
      const deserResp = JSON.parse(lastMessage?.data);
      // console.log(deserResp)
      setTime(deserResp?.time);
      setTemperature1(deserResp?.deviceStatus.TMP_1);
    }
  }, [lastMessage]);

  // const refresh = () => {
  //   if (readyState == ReadyState.OPEN){
  //     sendJsonMessage({
  //       "action": "GET",
  //       "device": "TMP_1"
  //     });
  //   }
  // }

  const onboardLedOn = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "SET",
        "device": "LED_ONBOARD",
        "data": "1"
      });
    }
  }
  const onboardLedOff = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "SET",
        "device": "LED_ONBOARD",
        "data": "0"
      });
    }
  }

  const redLedOn = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "SET",
        "device": "LED_RED",
        "data": "1"
      });
    }
  }
  const redLedOff = () => {
    if (readyState == ReadyState.OPEN){
      sendJsonMessage({
        "action": "SET",
        "device": "LED_RED",
        "data": "0"
      });
    }
  }

  return (
    <MainContainer>
      <h1>Overview</h1>
      <b>{time}</b>
      <Box>{temperature1} C</Box>
      <Stack spacing={2}>
        <Stack
          direction="row" spacing={2}
        >
          <Button
            variant="contained"
            onClick={onboardLedOn}
            >
              onboard led on
          </Button>
          <Button
            variant="outlined"
            onClick={onboardLedOff}
            >
              onboard led off
          </Button>
        </Stack>
        <Stack
          direction="row" spacing={2}
        >
          <Button
            variant="contained"
            onClick={redLedOn}
            color="error"
            >
              red led on
          </Button>
          <Button
            variant="outlined"
            onClick={redLedOff}
            color="error"
            >
              red led off
          </Button>
        </Stack>
      </Stack>
    </MainContainer>
  )
}

export default Overview;
