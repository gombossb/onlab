// https://mui.com/material-ui/react-slider/

import { Box, Slider, Typography } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';
import { useEffect, useState } from 'react';

export default function ManualBlindsControl(){
  const [blindsValue, setBlindsValue] = useState(0);
  const [blindsFetched, setBlindsFetched] = useState(false);
  const [autoBlindsControl, setAutoBlindsControl] = useState(true);


  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  // useEffect(() => {
  //   if (!autoBlindsFetched)
  //     sendJsonMessage({"action": "GET_AUTOBLINDS"});
  // }, [sendJsonMessage, autoBlindsFetched]);

  useEffect(() => {
    if (lastMessage?.data && !blindsFetched){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "STATUS_UPDATE"){
        setBlindsValue(deserData.status.deviceStatus["SERVO_BLINDS"]);
        setAutoBlindsControl(deserData.status.autoBlinds);
        setBlindsFetched(true);
      }
    }
  }, [lastMessage, blindsFetched]);

  useEffect(() => {
    if (blindsFetched && !autoBlindsControl){
      sendJsonMessage({
        "action": "SET",
        "device": "SERVO_BLINDS",
        "data": `${blindsValue}`
      });
    }
  }, [blindsValue, autoBlindsControl, sendJsonMessage, blindsFetched]);

  return (
    <>
      <Typography variant="h6">
        Manual Blinds Control:
      </Typography>
      {
        autoBlindsControl ?
        <Typography variant="body2">
          auto control enabled
        </Typography> :
        ""
      }
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="blinds value"
          defaultValue={0}
          // getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={10}
          step={10}
          // marks
          min={0}
          max={150}
          value={blindsValue}
          onChange={(_, value) => {
            if (typeof value == "number" && value >= 0 && value <= 150)
              setBlindsValue(value);
          }}
          disabled={autoBlindsControl}
        />
      </Box>
    </>
  );
}
