import { MainContainer } from "../components/MainContainer";
import { Box } from "@mui/material";
import BlindsAutoManualControl from "../components/controls/BlindsAutoManualControl";
import LedControl from "../components/controls/LedControl";

const Controls = () => {
  return (
    <MainContainer>
      <h1>Controls</h1>
      <Box>
        <BlindsAutoManualControl />
        <LedControl roomName="Bedroom" ledId={1} />
        <LedControl roomName="Living Room" ledId={2} />
        <LedControl roomName="Main Hall" ledId={3} />
      </Box>
    </MainContainer>
  )
}

export default Controls;
