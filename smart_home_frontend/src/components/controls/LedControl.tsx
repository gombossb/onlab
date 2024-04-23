// https://mui.com/material-ui/react-slider/

import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';
import { useEffect, useState } from 'react';

export default function LedControl({roomName, ledId}: {roomName: string, ledId: number}){
  const [ledChecked, setLedChecked] = useState("0");
  const [ledFetched, setLedFetched] = useState(false);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  // useEffect(() => {
  //   if (!autoBlindsFetched)
  //     sendJsonMessage({"action": "GET_AUTOBLINDS"});
  // }, [sendJsonMessage, autoBlindsFetched]);

  useEffect(() => {
    if (lastMessage?.data && !ledFetched){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "STATUS_UPDATE"){
        setLedChecked(deserData.status.deviceStatus[`LED_${ledId}`]);
        setLedFetched(true);
      }
    }
  }, [lastMessage, ledId, ledFetched]);

  useEffect(() => {
    if (ledFetched){
      sendJsonMessage({
        "action": "SET",
        "device": `LED_${ledId}`,
        "data": ledChecked
      });
    }
  }, [ledChecked, sendJsonMessage, ledId, ledFetched]);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={ledChecked == "1"}
            onChange={(_, value) => setLedChecked(value ? "1" : "0")}
          />
        }
        label={`${roomName} LED`}
      />
    </FormGroup>
  );
}
