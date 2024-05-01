import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

export const TemperatureDisplay = ({roomName, temperature}: {roomName: string, temperature: string}) => {
  return (
    <DemoPaper square={false} elevation={24}>
      <Stack>
        <Typography variant='h4'>{roomName}</Typography>
        <Typography variant='body1'>{temperature} °C</Typography>
      </Stack>
    </DemoPaper>
  )
}
