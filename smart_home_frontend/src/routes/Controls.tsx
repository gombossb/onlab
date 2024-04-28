import { MainContainer } from "../components/MainContainer";
import { Box } from "@mui/material";
import LedControl from "../components/controls/LedControl";
import { TargetTemperatureControl } from "../components/controls/TargetTemperatureControl";

const Controls = () => {
  return (
    <MainContainer>
      <h1>Controls</h1>
      <Box>
        <TargetTemperatureControl />
        <LedControl roomName="Bedroom" ledId={1} />
        <LedControl roomName="Living Room" ledId={2} />
        <LedControl roomName="Main Hall" ledId={3} />
      </Box>
    </MainContainer>
  )
}

export default Controls;
