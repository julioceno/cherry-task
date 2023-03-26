import { Box, Divider, Grid, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spacer, TextFieldDocument } from '../../components';
import { CheckboxDocument } from '../../components/Base/Checkbox';
import { snackbarStore, trpc } from '../../utils';
import { SnackbarSaveDocument } from './components';
import { events } from './events';
import { useStyles } from './styles';
import { ITask } from './types';

interface Props {
  name: string;
  description: string;
  tasks: ITask[];
}

const format = ({ name, description, tasks }: Props) => {
  const obj = {
    name,
    description,
    tasks,
  };

  return JSON.stringify(obj);
};

export const Task = observer(() => {
  const theme = useTheme();
  const classes = useStyles();
  const [openSnackbar] = useState(false);
  const { id } = useParams<{ id: string }>();

  const updateTask = trpc.privateRouter.tasksRouter.update.useMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      steps: [],
    },

    onSubmit: (values) => {
      if (!id) {
        snackbarStore.setMessage('Houve um problema.');
        return;
      }

      updateTask.mutate(
        {
          id,
          name: values.name ?? undefined,
          description: values.description ?? undefined,
          steps: events.tasks.map(({ focus, ...step }) => ({
            ...step,
            label: step.label ?? undefined,
          })),
        },
        {
          onError: () => {
            snackbarStore.setMessage('Houve um problema');
          },
        }
      );
    },
  });
  const { values } = formik;

  useEffect(() => {
    events.handleOnFocusInLastCreated();
  }, [events.tasks]);

  useEffect(() => {
    localStorage.setItem(
      'task',
      format({
        name: values.name,
        description: values.description,
        tasks: events.tasks,
      })
    );
  }, [events.tasks, values.name, values.description]);

  useEffect(() => {
    console.log('entrou');

    return () => {
      formik.handleSubmit();

      localStorage.removeItem('task');
      events.clear();
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
          value={values.name}
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
          value={values.description}
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
