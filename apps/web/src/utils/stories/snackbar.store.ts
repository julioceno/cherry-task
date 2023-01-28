import { AlertColor, SnackbarOrigin } from '@mui/material';
import { makeAutoObservable } from 'mobx';

class SnackbarStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true }); // TODO: entender melhor sobre o autobind
  }

  message = '';
  setMessage(message: string) {
    this.message = message;
  }

  handleClose() {
    this.message = '';
  }

  anchorOrigin: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };
  setAnchorOrigin(anchorOrigin: SnackbarOrigin) {
    this.anchorOrigin = anchorOrigin;
  }

  severity?: AlertColor;
  setSeverity(severity?: AlertColor) {
    this.severity = severity;
  }
}

const snackbarStore = new SnackbarStore();

export { snackbarStore };
