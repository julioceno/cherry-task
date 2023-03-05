import { Box, Divider, Grid, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Spacer, TextFieldDocument } from '../../components';
import { CheckboxDocument } from '../../components/Base/Checkbox';
import { SnackbarSaveDocument } from './components';
import { events } from './events';
import { useStyles } from './styles';

export const Task = observer(() => {
  const theme = useTheme();
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: 'Título',
      description: '',
      steps: [],
    },

    onSubmit: (values) => {
      /*     setOpenSnackbar(true);

      setTimeout(() => {
        setOpenSnackbar(false);
      }, 2000); */
    },
  });

  useEffect(() => {
    events.handleOnFocusInLastCreated();
  }, [events.tasks]);

  useEffect(() => {
    return () => {
      formik.handleSubmit();
    };
  }, []);

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item>
        <Spacer y={30} />
      </Grid>
      <Grid item xs={12}>
        <TextFieldDocument
          placeholder='Insira o título da tarefa'
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
          styles={{
            fontSize: theme.spacing(12),
            fontWeight: 'bold',
          }}
        />
        <Grid item>
          <Spacer y={2} />
        </Grid>
        <Grid item>
          <Spacer y={1.5} />
        </Grid>
        <TextFieldDocument
          placeholder='Descrição...'
          name='description'
          styles={{ fontSize: theme.spacing(5) }}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider variant='fullWidth' />
      </Grid>
      <Grid item xs={12} spacing={2} component={Box}>
        {events.tasks.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CheckboxDocument
              task={item}
              createStep={() => events.createStep(item.id)}
              deleteStep={() => events.deleteStep(item.id)}
              toggleCheckbox={() => events.toggleCheckbox(item.id)}
              handleOnChange={(value) => events.handleOnChange(item.id, value)}
              handleOnKeyUp={(event) => events.handleOnKeyUp(item.id, event)}
            />
          </Grid>
        ))}
      </Grid>
      <SnackbarSaveDocument open={openSnackbar} />
    </Grid>
  );
});
