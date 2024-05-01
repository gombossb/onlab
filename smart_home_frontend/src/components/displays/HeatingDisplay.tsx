import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

export const HeatingDisplay = ({value}: {value: number}) => {
  return (
    <DemoPaper square={false} elevation={24}>
      <Stack>
        <Typography variant='h4'>Heating</Typography>
        <Typography variant='body1'>{(value / 4095.0 * 100).toFixed(1).toString()} %</Typography>
      </Stack>
    </DemoPaper>
  )
}
