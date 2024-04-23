import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

export const FanDisplay = ({roomName, value}: {roomName: string, value: number}) => {
  return (
    <DemoPaper square={false} elevation={24}>
      <Stack>
        <Typography variant='h4'>{roomName}</Typography>
        <Typography variant='body1'>{(value / 4096.0 * 100).toFixed(2).toString()} %</Typography>
      </Stack>
    </DemoPaper>
  )
}
