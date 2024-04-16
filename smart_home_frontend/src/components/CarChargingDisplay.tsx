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

export const CarChargingDisplay = ({percent}: {percent: number}) => {
  return (
    <DemoPaper square={false} elevation={24}>
      <Stack>
        <Typography variant='h3'>Car Charging</Typography>
        <Typography
          variant='body1'
          style={{
            color: (percent > 10) ? "green" : "initial"
          }}
        >
          {percent} %
        </Typography>
      </Stack>
    </DemoPaper>
  )
}
