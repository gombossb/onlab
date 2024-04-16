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

export const FanDisplay = ({roomName, percent}: {roomName: string, percent: string}) => {
  return (
    <DemoPaper square={false} elevation={24}>
      <Stack>
        <Typography variant='h3'>{roomName}</Typography>
        <Typography variant='body1'>{percent} %</Typography>
      </Stack>
    </DemoPaper>
  )
}