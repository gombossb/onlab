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

export const HeatingDisplay = ({percent}: {percent: string}) => {
  return (
    <DemoPaper square={false} elevation={24}>
      <Stack>
        <Typography variant='h4'>Heating</Typography>
        <Typography variant='body1'>{percent} %</Typography>
      </Stack>
    </DemoPaper>
  )
}
