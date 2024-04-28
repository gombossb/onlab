// https://mui.com/material-ui/react-slider/

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';
import { useEffect, useState } from 'react';

const marks = [
  {
    value: 15,
    label: '15h',
  },
  {
    value: 16,
    label: '16h',
  },
  {
    value: 17,
    label: '17h',
  },
  {
    value: 18,
    label: '18h',
  },
  {
    value: 19,
    label: 'l9h',
  },
  {
    value: 20,
    label: '20h',
  },
  {
    value: 21,
    label: '21h',
  },
  {
    value: 22,
    label: '22h',
  },
];

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function BlindsRolldownSetting(){
  const [rolldownTime, setRolldownTime] = useState<number>(18);
  const [rolldownTimeFetched, setRolldownTimeFetched] = useState(false);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (!rolldownTimeFetched)
      sendJsonMessage({"action": "GET_ROLLDOWN"});
  }, [sendJsonMessage, rolldownTimeFetched]);

  useEffect(() => {
    if (!rolldownTimeFetched && lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "GET_ROLLDOWN"){
        setRolldownTime(Number(deserData.data));
        setRolldownTimeFetched(true);
      }
    }
  }, [lastMessage, rolldownTimeFetched]);

  useEffect(() => {
    if (rolldownTimeFetched){
      sendJsonMessage({
        "action": "SET_ROLLDOWN",
        "data": rolldownTime
      });
    }
  }, [rolldownTime, sendJsonMessage, rolldownTimeFetched]);

  return (
    <>
      <Typography variant="h6">
        Auto rolldown time:
      </Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Restricted values"
          // defaultValue={900}
          valueLabelFormat={valueLabelFormat}
          step={null}
          // valueLabelDisplay="on"
          marks={marks}
          min={15}
          max={22}
          value={rolldownTime}
          onChange={(_, value) => {
            if (typeof value == "number" && value > 14)
              setRolldownTime(value);
          }}
        />
      </Box>
    </>
  );
}
