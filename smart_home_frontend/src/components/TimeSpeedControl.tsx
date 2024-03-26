// https://mui.com/material-ui/react-slider/

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

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
    value: 3600,
    label: 'Fast',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function TimeSpeedControl() {
  return (
    <>
      <Typography variant="h6">
        Time speed:
      </Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={900}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          // valueLabelDisplay="off"
          marks={marks}
          min={450}
          max={3600}
        />
      </Box>
    </>
  );
}
