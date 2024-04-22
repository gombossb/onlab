import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const DemoPaper = styled(Paper)(({ theme }) => ({
  // width: 120,
  // height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  // textAlign: 'center',
}));

export const CarChargingDisplay = ({value}: {value: number}) => {
  const watt = Math.max((value - 100)/12, 0);
  const displayLimit = 50;
  return (
    <DemoPaper square={false} elevation={24}>
      <Stack>
        <Typography variant='h4'>Car Charging</Typography>
        <Typography
          variant='body1'
          style={{
            color: (watt > displayLimit) ? "green" : "inherit"
          }}
        >
          {watt > displayLimit ? watt.toFixed(2) : 0} W
        </Typography>
      </Stack>
    </DemoPaper>
  )
}
