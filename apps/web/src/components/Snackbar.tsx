import { observer } from 'mobx-react-lite';
import { snackbarStore } from '../utils';
import { SnackbarCustomer } from './Base/Snackbar';

const Snackbar = observer(() => {
  return (
    <SnackbarCustomer
      message={snackbarStore.message}
      onClose={snackbarStore.handleClose}
      anchorOrigin={snackbarStore.anchorOrigin}
      severity={snackbarStore.severity}
    />
  );
});

export { Snackbar };
