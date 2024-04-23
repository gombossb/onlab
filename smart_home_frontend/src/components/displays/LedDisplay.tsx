import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

export const LedDisplay = ({roomName, value}: {roomName: string, value: string}) => {
  return (
    <DemoPaper square={false} elevation={24}>
      <Stack>
        <Typography variant='h4'>{roomName} LED</Typography>
        <Typography
          variant='body1'
          style={{
            color: (value == "1") ? "green" : "red"
          }}
        >
          {(value == "1") ? "ON" : "OFF"}
        </Typography>
      </Stack>
    </DemoPaper>
  )
}
