// https://mui.com/material-ui/react-slider/

import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';
import { useEffect, useState } from 'react';

export default function AutoTempControlSetting(){
  const [autoTempControl, setAutoTempControl] = useState(true);
  const [autoTempControlFetched, setAutoTempControlFetched] = useState(false);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (!autoTempControlFetched)
      sendJsonMessage({"action": "GET_AUTOTEMPCONTROL"});
  }, [sendJsonMessage, autoTempControlFetched]);

  useEffect(() => {
    if (!autoTempControlFetched && lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "GET_AUTOTEMPCONTROL"){
        setAutoTempControl(deserData.data);
        setAutoTempControlFetched(true);
      }
    }
  }, [lastMessage, autoTempControlFetched]);

  useEffect(() => {
    if (autoTempControlFetched){
      sendJsonMessage({
        "action": "SET_AUTOTEMPCONTROL",
        "data": autoTempControl
      });
    }
  }, [autoTempControl, sendJsonMessage, autoTempControlFetched]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={autoTempControl}
            onChange={(_, value) => setAutoTempControl(value)}
          />
        }
        label="Auto Temp Control"
      />
    </FormGroup>
  );
}
