import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';

function valuetext(value: number) {
  return `${value}°C`;
}

const ManualHeatingControl = () => {
  const [heatingValue, setHeatingValue] = useState<number>(0);
  const [heatingValueFetched, setHeatingValueFetched] = useState(false);
  const [autoTempControl, setAutoTempControl] = useState(true);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (!heatingValueFetched)
      sendJsonMessage({"action": "GET", "device": "HEATING"});
  }, [sendJsonMessage, heatingValueFetched]);

  useEffect(() => {
    if (!heatingValueFetched && lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "GET_RESP" && deserData?.device == "HEATING"){
        setHeatingValue(Number(deserData.data));
        setHeatingValueFetched(true);
      }
    } else if (lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "STATUS_UPDATE"){
        setAutoTempControl(deserData.status.autoTempControl);
      }
    }
  }, [lastMessage, heatingValueFetched]);

  useEffect(() => {
    if (heatingValueFetched){
      sendJsonMessage({
        "action": "SET",
        "device": "HEATING",
        "data": `${heatingValue}`
      });
    }
  }, [heatingValue, sendJsonMessage, heatingValueFetched]);

  return (
    <>
      <Typography variant="h6">
        Manual Heating Control:
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
          aria-label="heating value"
          defaultValue={0}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={1}
          step={100}
          // marks
          min={0}
          max={2048}
          value={heatingValue}
          onChange={(_, value) => {
            if (typeof value == "number" && value >= 0 && value <= 4095)
              setHeatingValue(value);
          }}
          disabled={autoTempControl}
        />
      </Box>
    </>
  );
}

export { ManualHeatingControl };
