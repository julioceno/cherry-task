import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { PrimaryButton, Spacer, TextInput } from '../../../../components';
import { useStyles } from './styles';
import { CreateTaskSchema } from './validation';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const initialValues = {
  name: '',
  type: '',
  dataFinalizar: '',
};

function ModalCreateTask({ open, handleClose }: Props) {
  const handleSubmit = () => {
    alert('aa');
  };

  return (
    <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
      <DialogTitle textAlign='center' fontSize='1.5rem' fontWeight='bold'>
        Criar Tarefa
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={toFormikValidationSchema(CreateTaskSchema)}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <TextInput label='Nome' name='name' fullWidth />
                  </Grid>
                </Grid>
                <Grid container item spacing={2}>
                  <Grid item md={6} xs={12}>
                    <TextInput label='Tipo' name='type' fullWidth />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextInput
                      label='Data de finalização (Opcional)'
                      name='dataFinalizar'
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item justifyContent='center' xs={12}>
                  <Grid item xs={2.5}>
                    <Spacer y={5} />
                    <PrimaryButton
                      fullWidth
                      type='submit'
                      variant='contained'
                      color='blackButton'
                    >
                      Criar
                    </PrimaryButton>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export { ModalCreateTask };
