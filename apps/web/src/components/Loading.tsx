import { Box, CircularProgress, Typography } from '@mui/material';
import { Spacer } from './Spacer';

function Loading() {
  return (
    <Box
      height='100vh'
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <CircularProgress color='blackButton' />
      <Spacer y={3} />
      <Typography>Carregando...</Typography>
    </Box>
  );
}

export { Loading };
