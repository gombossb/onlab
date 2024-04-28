import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';

function valuetext(value: number) {
  return `${value}°C`;
}

const ManualFanControl = ({index, fanName}: {index: number, fanName: string}) => {
  const [fanValue, setFanValue] = useState<number>(0);
  const [fanValueFetched, setFanValueFetched] = useState(false);
  const [autoTempControl, setAutoTempControl] = useState(true);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (!fanValueFetched)
      sendJsonMessage({"action": "GET", "device": `FAN_${index}`});
  }, [sendJsonMessage, fanValueFetched, index]);

  useEffect(() => {
    if (!fanValueFetched && lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "GET_RESP" && deserData?.device == `FAN_${index}`){
        setFanValue(Number(deserData.data));
        setFanValueFetched(true);
      }
    } else if (lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "STATUS_UPDATE"){
        setAutoTempControl(deserData.status.autoTempControl);
      }
    }
  }, [lastMessage, fanValueFetched, index]);

  useEffect(() => {
    if (fanValueFetched){
      sendJsonMessage({
        "action": "SET",
        "device": `FAN_${index}`,
        "data": `${fanValue}`
      });
    }
  }, [fanValue, sendJsonMessage, fanValueFetched, index]);

  return (
    <>
      <Typography variant="h6">
        {fanName}:
      </Typography>
      {
        autoTempControl ?
        <Typography variant="body2">
          auto control enabled
        </Typography> :
        ""
      }
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="fan value"
          defaultValue={0}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={1}
          step={100}
          // marks
          min={0}
          max={4095}
          value={fanValue}
          onChange={(_, value) => {
            if (typeof value == "number" && value >= 0 && value <= 4095)
              setFanValue(value);
          }}
          disabled={autoTempControl}
        />
      </Box>
    </>
  );
}

export { ManualFanControl };
