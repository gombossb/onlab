import useWebSocket from "react-use-websocket";
import { WS_URL } from "../App";
import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import { TemperatureDisplay } from "../components/TemperatureDisplay";
import { FanDisplay } from "../components/FanDisplay";
import { CarChargingDisplay } from "../components/CarChargingDisplay";

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
      <Typography variant="h4">{time}</Typography>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
        >
          <TemperatureDisplay roomName="Bedroom" temperature={statusData?.status.deviceStatus.TMP_1} />
          <TemperatureDisplay roomName="Living Room" temperature={statusData?.status.deviceStatus.TMP_2} />
          <TemperatureDisplay roomName="Main Hall" temperature={statusData?.status.deviceStatus.TMP_3} />
        </Stack>
        
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
        >
          <FanDisplay roomName="Living Room -> Bedroom" percent={(statusData?.status.deviceStatus.FAN_1 / 4096.0 * 100).toString()} />
          <FanDisplay roomName="Main Hall -> Living Room" percent={(statusData?.status.deviceStatus.FAN_2 / 4096.0 * 100).toString()} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
        >
          <CarChargingDisplay percent={100} />
        </Stack>
      </Stack>

    </MainContainer>
  )
}

export default Overview;
