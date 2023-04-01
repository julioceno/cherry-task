import CloudDoneIcon from '@mui/icons-material/CloudDone';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spacer, TextFieldDocument } from '../../components';
import { CheckboxDocument } from '../../components/Base/Checkbox';
import { snackbarStore, trpc } from '../../utils';
import { SnackbarSaveDocument } from './components';
import { events } from './events';
import { useStyles } from './styles';
import { timer } from './timer';
import { ITask } from './types';

interface Props {
  name: string;
  description: string;
  tasks: ITask[];
}

function StatusChange({
  hasChange,
  loading,
}: {
  hasChange: Nullable<boolean>;
  loading: boolean;
}) {
  if (loading) {
    return (
      <React.Fragment>
        <CircularProgress size={20} color='blackButton' />
        <Spacer x={1} />
        <Spacer x={2} />
        <Typography fontStyle='italic'>Salvando...</Typography>
      </React.Fragment>
    );
  }

  if (hasChange) {
    return (
      <React.Fragment>
        <ReplayIcon />
        <Spacer x={1} />
        <Typography fontStyle='italic'>Alterações pendentes</Typography>
      </React.Fragment>
    );
  }

  if (hasChange === false) {
    return (
      <React.Fragment>
        <CloudDoneIcon />
        <Spacer x={1} />
        <Typography fontStyle='italic'>
          Documento Sem alterações pendentes
        </Typography>
      </React.Fragment>
    );
  }

  return null;
}

const saveTaskLocalStorage = ({ name, description, tasks }: Props) => {
  const obj = {
    name,
    description,
    tasks,
  };

  localStorage.setItem('task', JSON.stringify(obj));
};

export const Task = observer(() => {
  const theme = useTheme();
  const classes = useStyles();
  const [openSnackbar] = useState(false);
  const [hasChange, setHasChange] = useState<Nullable<boolean>>(null);

  const { id } = useParams<{ id: string }>();

  const task = trpc.privateRouter.tasksRouter.findOne.useQuery(id!);

  const updateTask = trpc.privateRouter.tasksRouter.update.useMutation();
  const formik = useFormik({
    initialValues: {
      name: task.data?.name ?? '',
      description: task.data?.description ?? '',
      steps: task.data?.steps,
    },

    onSubmit: (values) => {
      if (!id) {
        snackbarStore.setMessage('Houve um problema.');
        setHasChange(false);
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
      setHasChange(false);
    },
  });
  const { values } = formik;

  timer.setExecute(() => formik.handleSubmit());

  function handleChangeField(e: React.ChangeEvent<HTMLInputElement>) {
    handleChangeForm();
    formik.handleChange(e);
  }

  function handleChangeForm() {
    saveTaskLocalStorage({
      name: values.name,
      description: values.description,
      tasks: events.tasks,
    });

    setHasChange(true);

    timer.setReset();
    timer.setResume();
  }

  useEffect(() => {
    events.handleOnFocusInLastCreated();
  }, [events.tasks]);

  useEffect(() => {
    return () => {
      formik.handleSubmit();

      localStorage.removeItem('task');
      events.clear();
    };
  }, []);

  if (!id) {
    // Redirecionar o usuario para uma rota de erro
  }

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item>
        <Spacer y={30} />
      </Grid>
      <Grid item xs={12}>
        <TextFieldDocument
          placeholder='Insira o título da tarefa'
          name='name'
          value={values.name}
          onChange={handleChangeField}
          onBlur={formik.handleBlur}
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
          onChange={handleChangeField}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider variant='fullWidth' />
      </Grid>
      <Box
        display='flex'
        justifyItems='center'
        ml={2}
        mt={hasChange !== null ? 3 : undefined}
      >
        <StatusChange hasChange={hasChange} loading={updateTask.isLoading} />
      </Box>
      <Grid item xs={12} spacing={2} component={Box}>
        {events.tasks.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CheckboxDocument
              task={item}
              createStep={() => {
                events.createStep(item.id);
              }}
              deleteStep={() => {
                events.deleteStep(item.id);
              }}
              toggleCheckbox={() => {
                handleChangeForm();
                events.toggleCheckbox(item.id);
              }}
              handleOnChange={(value) => {
                handleChangeForm();
                events.handleOnChange(item.id, value);
              }}
              handleOnKeyUp={(event) => {
                handleChangeForm();
                events.handleOnKeyUp(item.id, event);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid>
        {/*   <FormikProvider value={formik}>
          <FieldArray
            name='steps'
            render={() => (
              <div>
                {formik.values.steps.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <CheckboxDocument
                      task={item}
                      createStep={() => events.createStep(item.id)}
                      deleteStep={() => events.deleteStep(item.id)}
                      toggleCheckbox={() => events.toggleCheckbox(item.id)}
                      handleOnChange={(value) =>
                        events.handleOnChange(item.id, value)
                      }
                      handleOnKeyUp={(event) =>
                        events.handleOnKeyUp(item.id, event)
                      }
                    />
                  </Grid>
                ))}
              </div>
            )}
          />
        </FormikProvider> */}
      </Grid>

      <SnackbarSaveDocument open={openSnackbar} />
    </Grid>
  );
});
