// https://mui.com/material-ui/react-slider/

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';
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

export default function TimeSpeedSetting(){
  const [timeSpeed, setTimeSpeed] = useState<number>(450);
  const [timeSpeedFetched, setTimeSpeedFetched] = useState(false);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (!timeSpeedFetched)
      sendJsonMessage({"action": "GET_SPEED"});
  }, [sendJsonMessage, timeSpeedFetched]);

  useEffect(() => {
    if (!timeSpeedFetched && lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "GET_SPEED"){
        setTimeSpeed(Number(deserData.data));
        setTimeSpeedFetched(true);
      }
    }
  }, [lastMessage, timeSpeedFetched]);

  useEffect(() => {
    if (timeSpeedFetched){
      sendJsonMessage({
        "action": "SET_SPEED",
        "data": timeSpeed
      });
    }
  }, [timeSpeed, sendJsonMessage, timeSpeedFetched]);

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
          onChange={(_, value) => {
            if (typeof value == "number" && value > 10)
              setTimeSpeed(value);
          }}
        />
      </Box>
    </>
  );
}
