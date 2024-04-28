// https://mui.com/material-ui/react-slider/

import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';
import { useEffect, useState } from 'react';

export default function BlindsAutoManualSetting(){
  const [autoBlinds, setAutoBlinds] = useState(true);
  const [autoBlindsFetched, setAutoBlindsFetched] = useState(false);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (!autoBlindsFetched)
      sendJsonMessage({"action": "GET_AUTOBLINDS"});
  }, [sendJsonMessage, autoBlindsFetched]);

  useEffect(() => {
    if (!autoBlindsFetched && lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "GET_AUTOBLINDS"){
        setAutoBlinds(deserData.data);
        setAutoBlindsFetched(true);
      }
    }
  }, [lastMessage, autoBlindsFetched]);

  useEffect(() => {
    if (autoBlindsFetched){
      sendJsonMessage({
        "action": "SET_AUTOBLINDS",
        "data": autoBlinds
      });
    }
  }, [autoBlinds, sendJsonMessage, autoBlindsFetched]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={autoBlinds}
            onChange={(_, value) => setAutoBlinds(value)}
          />
        }
        label="Auto Blinds"
      />
    </FormGroup>
  );
}
