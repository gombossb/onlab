import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_URL } from '../../App';

function valuetext(value: number) {
  return `${value}°C`;
}

const TargetTemperatureControl = () => {
  const [targetTemp, setTargetTemp] = useState<number>(22);
  const [targetTempFetched, setTargetTempFetched] = useState(false);
  const [autoTempControl, setAutoTempControl] = useState(false);

  const { sendJsonMessage, lastMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (!targetTempFetched)
      sendJsonMessage({"action": "GET_TARGETTEMP"});
  }, [sendJsonMessage, targetTempFetched]);

  useEffect(() => {
    if (!targetTempFetched && lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "GET_TARGETTEMP"){
        setTargetTemp(Number(deserData.data));
        setTargetTempFetched(true);
      }
    } else if (lastMessage?.data){
      const deserData = JSON.parse(lastMessage?.data);
      if (deserData?.action == "STATUS_UPDATE"){
        setAutoTempControl(deserData.status.autoTempControl);
      }
    }
  }, [lastMessage, targetTempFetched]);

  useEffect(() => {
    if (targetTempFetched){
      sendJsonMessage({
        "action": "SET_TARGETTEMP",
        "data": targetTemp
      });
    }
  }, [targetTemp, sendJsonMessage, targetTempFetched]);

  return (
    <>
      <Typography variant="h6">
        Target temperature: {
        autoTempControl ?
        `${targetTemp} °C` :
        "auto control disabled"
        } 
      </Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Target Temperature"
          defaultValue={22}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={1}
          step={1}
          marks
          min={17}
          max={26}
          value={targetTemp}
          onChange={(_, value) => {
            if (typeof value == "number" && value > 16 && value < 27)
              setTargetTemp(value);
          }}
          disabled={!autoTempControl}
        />
      </Box>
    </>
  );
}

export { TargetTemperatureControl };
