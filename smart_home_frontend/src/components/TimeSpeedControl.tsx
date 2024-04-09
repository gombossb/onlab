// https://mui.com/material-ui/react-slider/

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WS_URL } from '../App';
import { useEffect, useState } from 'react';

const marks = [
  {
    value: 450,
    label: 'Slow',
  },
  {
    value: 900,
    label: '',
  },
  {
    value: 1800,
    label: '',
  },
  {
    value: 2700,
    label: '',
  },
  {
    value: 3600,
    label: 'Fast',
  },
];

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function TimeSpeedControl(){
  const [timeSpeed, setTimeSpeed] = useState<number | undefined>(undefined);
  // const [speedFetched, setSpeedFetched] = useState(false);

  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (readyState == ReadyState.OPEN && timeSpeed == undefined)
      sendJsonMessage({"action": "GET_SPEED"});
  }, [sendJsonMessage, readyState, timeSpeed]);

  useEffect(() => {
    if (readyState == ReadyState.OPEN){
      if (timeSpeed === undefined && lastMessage?.data){
        const deserData = JSON.parse(lastMessage?.data);
        if (deserData?.action == "GET_SPEED"){
          setTimeSpeed(Number(deserData.data));
        }
      }
    }
  }, [timeSpeed, lastMessage, readyState]);

  useEffect(() => {
    if (readyState == ReadyState.OPEN && typeof timeSpeed == "number"){
      sendJsonMessage({
        "action": "SET_SPEED",
        "data": timeSpeed
      });
    }
  }, [timeSpeed, sendJsonMessage, readyState])

  return (
    <>
      <Typography variant="h6">
        Time speed:
      </Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Restricted values"
          // defaultValue={900}
          valueLabelFormat={valueLabelFormat}
          step={null}
          // valueLabelDisplay="off"
          marks={marks}
          min={450}
          max={3600}
          value={timeSpeed}
          onChange={(_, value) => setTimeSpeed(Number(value.toString()))}
        />
      </Box>
    </>
  );
}
