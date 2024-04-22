import { Box } from "@mui/material";
import { MainContainer } from "../components/MainContainer"
import TimeSpeedControl from "../components/controls/TimeSpeedControl";

const Settings = () => {
  return (
    <MainContainer>
      <h1>Settings</h1>
      <Box>
        <TimeSpeedControl />
      </Box>
    </MainContainer>
  )
}

export default Settings;
