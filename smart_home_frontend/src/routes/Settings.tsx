import { Box } from "@mui/material";
import { MainContainer } from "../components/MainContainer"
import TimeSpeedSetting from "../components/settings/TimeSpeedSetting";
import BlindsRollupSetting from "../components/settings/BlindsRollupSetting";
import BlindsRolldownSetting from "../components/settings/BlindsRolldownSetting";

const Settings = () => {
  return (
    <MainContainer>
      <h1>Settings</h1>
      <Box>
        <TimeSpeedSetting />
        <BlindsRollupSetting />
        <BlindsRolldownSetting />
        {
          // TODO
          // update freq?
        }
      </Box>
    </MainContainer>
  )
}

export default Settings;
