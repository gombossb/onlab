// https://mui.com/material-ui/react-slider/

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';
import { useEffect, useState } from 'react';

const marks = [
  {
    value: 5,
    label: '5h',
  },
  {
    value: 6,
    label: '',
  },
  {
    value: 7,
    label: '',
  },
  {
    value: 8,
    label: '',
  },
  {
    value: 9,
    label: '',
  },
  {
    value: 10,
    label: '',
  },
  {
    value: 11,
    label: '',
  },
  {
    value: 12,
    label: '12h',
  },
];

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function BlindsRollupSetting(){
  const [rollupTime, setRollupTime] = useState<number>(7);
  const [rollupTimeFetched, setRollupTimeFetched] = useState(false);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (!rollupTimeFetched)
      sendJsonMessage({"action": "GET_ROLLUP"});
  }, [sendJsonMessage, rollupTimeFetched]);

  useEffect(() => {
    if (!rollupTimeFetched && lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "GET_ROLLUP"){
        setRollupTime(Number(deserData.data));
        setRollupTimeFetched(true);
      }
    }
  }, [lastMessage, rollupTimeFetched]);

  useEffect(() => {
    if (rollupTimeFetched){
      sendJsonMessage({
        "action": "SET_ROLLUP",
        "data": rollupTime
      });
    }
  }, [rollupTime, sendJsonMessage, rollupTimeFetched]);

  return (
    <>
      <Typography variant="h6">
        Auto rollup time:
      </Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Restricted values"
          // defaultValue={900}
          valueLabelFormat={valueLabelFormat}
          step={null}
          // valueLabelDisplay="on"
          marks={marks}
          min={5}
          max={12}
          value={rollupTime}
          onChange={(_, value) => {
            if (typeof value == "number" && value > 4)
              setRollupTime(value);
          }}
        />
      </Box>
    </>
  );
}
