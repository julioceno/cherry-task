import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import {
  DateInput,
  PrimaryButton,
  SelectInput,
  SelectOption,
  Spacer,
  TextInput,
} from '../../../../components';
import { CreateTaskInput, CreateTaskSchema } from './validation';

interface Props {
  open: boolean;
  handleClose: () => void;
}

const initialValues: CreateTaskInput = {
  name: '',
  type: '',
  dateFinalize: null,
};

function ModalCreateTask({ open, handleClose }: Props) {
  const handleSubmit = () => {
    alert('aa');
  };

  const options: SelectOption[] = [
    {
      label: 'Trabalho',
      value: 'tabalho',
    },
    {
      label: 'Estudo',
      value: 'estudo',
    },
    {
      label: 'Passatempos',
      value: 'Passatempos',
    },
  ];

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
          {({ handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <TextInput label='Nome' name='name' fullWidth />
                  </Grid>
                </Grid>
                <Grid container item spacing={2}>
                  <Grid item md={6} xs={12}>
                    <SelectInput
                      label='Tipo'
                      name='type'
                      color='primary'
                      options={options}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DateInput
                      label='Data de finalização (Opcional)'
                      name='dateFinalize'
                    />
                  </Grid>
                </Grid>
                <Grid container item justifyContent='center' xs={12}>
                  <Grid item md={2.5} sm={4} xs={12}>
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
