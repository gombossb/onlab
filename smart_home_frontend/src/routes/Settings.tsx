import { Box } from "@mui/material";
import { MainContainer } from "../components/MainContainer"
import TimeSpeedSetting from "../components/settings/TimeSpeedSetting";

const Settings = () => {
  return (
    <MainContainer>
      <h1>Settings</h1>
      <Box>
        <TimeSpeedSetting />
        {
          // TODO
          // blinds rollup, rolldown time
          // update freq
        }
      </Box>
    </MainContainer>
  )
}

export default Settings;
