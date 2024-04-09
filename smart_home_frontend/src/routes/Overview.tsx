import useWebSocket from "react-use-websocket";
import { WS_URL } from "../App";
import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import { Box, Button, Stack } from "@mui/material";
import { TemperatureDisplay } from "../components/TemperatureDisplay";

const Overview = () => {
  const [statusData, setStatusData] = useState<any>(null);
  const [time, setTime] = useState('00:00:00');
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (lastMessage?.data){
      const deserResp = JSON.parse(lastMessage?.data);
      if (deserResp?.action == "STATUS_UPDATE"){
        setTime(deserResp?.time);
        setStatusData(deserResp);

      }
    }
  }, [lastMessage]);

  // const onboardLedOn = () => {
  //   if (readyState == ReadyState.OPEN){
  //     sendJsonMessage({
  //       "action": "SET",
  //       "device": "LED_ONBOARD",
  //       "data": "1"
  //     });
  //   }
  // }
  // const onboardLedOff = () => {
  //   if (readyState == ReadyState.OPEN){
  //     sendJsonMessage({
  //       "action": "SET",
  //       "device": "LED_ONBOARD",
  //       "data": "0"
  //     });
  //   }
  // }

  return (
    <MainContainer>
      <h1>Overview</h1>
      <b>{time}</b>
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={2}
      >
        <TemperatureDisplay roomName="Bedroom" temperature={statusData?.deviceStatus.TMP_1} />
        <TemperatureDisplay roomName="Living Room" temperature={statusData?.deviceStatus.TMP_2} />
        <TemperatureDisplay roomName="Main Hall" temperature={statusData?.deviceStatus.TMP_3} />
      </Stack>
      
    </MainContainer>
  )
}

export default Overview;
