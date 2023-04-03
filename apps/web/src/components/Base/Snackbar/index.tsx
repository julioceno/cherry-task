import { AlertColor } from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  Alert,
  IconButton,
  Snackbar,
  SnackbarProps,
  Theme,
} from '@mui/material';
import { ReactNode } from 'react';
import { withStyles } from '@mui/styles';

interface Props extends SnackbarProps {
  message: string;
  actions?: ReactNode[];
  severity?: AlertColor;
  onClose: () => void;
}

const SnackbarCustomer = ({
  message,
  onClose,
  actions,
  severity,
  ...rest
}: Props) => {
  return (
    <Snackbar
      autoHideDuration={6000}
      open={!!message}
      message={message}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          onClick={onClose}
        >
          <Close />
        </IconButton>,
      ]}
      {...rest}
    >
      {severity && (
        <Alert severity={severity} variant='standard'>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};

export { SnackbarCustomer };
