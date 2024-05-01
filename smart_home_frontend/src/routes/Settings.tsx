import { Box } from "@mui/material";
import { MainContainer } from "../components/MainContainer"
import TimeSpeedSetting from "../components/settings/TimeSpeedSetting";
import BlindsRollupSetting from "../components/settings/BlindsRollupSetting";
import BlindsRolldownSetting from "../components/settings/BlindsRolldownSetting";
import BlindsAutoManualSetting from "../components/settings/BlindsAutoManualSetting";
import AutoTempControlSetting from "../components/settings/AutoTempControlSetting";

const Settings = () => {
  return (
    <MainContainer>
      <h1>Settings</h1>

      <Box>
        <TimeSpeedSetting />
      </Box>

      <Box mt={3}>
        <BlindsAutoManualSetting />
        <BlindsRollupSetting />
        <BlindsRolldownSetting />
        {
          // TODO
          // update freq?
        }
      </Box>

      <Box mt={3}>
        <AutoTempControlSetting />
      </Box>
    </MainContainer>
  )
}

export default Settings;
