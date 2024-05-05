import useWebSocket from "react-use-websocket";
import { WS_URL } from "../App";
import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import { Stack, Typography } from "@mui/material";
import { TemperatureDisplay } from "../components/displays/TemperatureDisplay";
import { FanDisplay } from "../components/displays/FanDisplay";
import { CarChargingDisplay } from "../components/displays/CarChargingDisplay";
import { HeatingDisplay } from "../components/displays/HeatingDisplay";
import { BlindsDisplay } from "../components/displays/BlindsDisplay";
import { LedDisplay } from "../components/displays/LedDisplay";

const Overview = () => {
  const [statusData, setStatusData] = useState<any>(null);
  const [time, setTime] = useState('00:00:00');
  const { /*sendJsonMessage,*/ lastMessage/*, readyState*/ } = useWebSocket(WS_URL, {
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

  return (
    <MainContainer>
      <h1>Smart Home Status</h1>
      <Typography variant="h4" my={2}>Time: {time}</Typography>
      <Stack spacing={2} useFlexGap>
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
        >
          <TemperatureDisplay roomName="Bedroom" temperature={(statusData?.status.deviceStatus.TMP_1 * 1.0).toFixed(1)} />
          <TemperatureDisplay roomName="Living Room" temperature={(statusData?.status.deviceStatus.TMP_2 * 1.0).toFixed(1)} />
          <TemperatureDisplay roomName="Main Hall" temperature={(statusData?.status.deviceStatus.TMP_3 * 1.0).toFixed(1)} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
        >
          <LedDisplay roomName="Bedroom" value={statusData?.status.deviceStatus.LED_1} />
          <LedDisplay roomName="Living Room" value={statusData?.status.deviceStatus.LED_2} />
          <LedDisplay roomName="Main Hall" value={statusData?.status.deviceStatus.LED_3} />
        </Stack>
        
        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
        >
          <FanDisplay roomName="Living Room -> Bedroom" value={statusData?.status.deviceStatus.FAN_1 * 1.0} />
          <FanDisplay roomName="Main Hall -> Living Room" value={statusData?.status.deviceStatus.FAN_2 * 1.0} />
          <HeatingDisplay value={statusData?.status.deviceStatus.HEATING * 1.0} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="flex-start"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
        >
          <BlindsDisplay value={(statusData?.status.deviceStatus.SERVO_BLINDS)} />
          <CarChargingDisplay value={(statusData?.status.deviceStatus.PHOTO_RES)} />
        </Stack>
      </Stack>

    </MainContainer>
  )
}

export default Overview;
