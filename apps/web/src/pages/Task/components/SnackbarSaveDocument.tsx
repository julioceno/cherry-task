import {
  CircularProgress,
  Snackbar,
  Typography,
  Box,
  Slide,
  SlideProps,
} from '@mui/material';
import { Spacer } from '../../../components';

interface Props {
  open: boolean;
}

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction='up' />;
}

function SnackbarSaveDocument({ open }: Props) {
  return (
    <Snackbar
      autoHideDuration={null}
      open={open}
      TransitionComponent={TransitionUp}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Box display='flex' justifyContent='space-between'>
        <CircularProgress size={20} color='blackButton' />
        <Spacer x={3} />
        <Typography>Salvando informações...</Typography>
      </Box>
    </Snackbar>
  );
}

export { SnackbarSaveDocument };
