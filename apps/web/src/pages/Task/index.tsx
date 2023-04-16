import { Box, Divider, Grid, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useParams } from 'react-router-dom';
import {
  CheckboxDocument,
  Spacer,
  TextFieldDocument,
  handleStateErrorsToRender,
} from '../../components';
import { snackbarStore, trpc } from '../../utils';
import { StatusChange } from './components';
import { eventsStore } from './eventsStore';
import { useStyles } from './styles';
import { timer } from './timer';

export const TaskForm = observer(() => {
  const theme = useTheme();
  const classes = useStyles();
  const [hasChange, setHasChange] = useState<Nullable<boolean>>(null);

  const { id } = useParams<{ id: string }>();

  const task = trpc.privateRouter.tasksRouter.findOne.useQuery(id!);
  const utils = trpc.useContext();

  const updateTask = trpc.privateRouter.tasksRouter.update.useMutation();
  const formik = useFormik({
    initialValues: {
      name: task.data?.name ?? '',
      description: task.data?.description ?? '',
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
          steps: eventsStore.steps.map(({ focus, ...step }) => {
            return {
              ...step,
              label: step.label ?? undefined,
            };
          }),
        },
        {
          async onSuccess(data) {
            utils.privateRouter.tasksRouter.findOne.refetch();
          },
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

  function handleChangeField(e: React.ChangeEvent<HTMLTextAreaElement>) {
    handleChangeForm();
    formik.handleChange(e);
  }

  function handleChangeForm() {
    setHasChange(true);

    timer.setReset();
    timer.setResume();
  }

  useBeforeunload((event) => {
    if (hasChange) {
      event.preventDefault();
    }
  });

  useEffect(() => {
    if (task.isSuccess) {
      eventsStore.populateSteps(
        task.data?.steps ?? [eventsStore.createStepItem()]
      );

      formik.setValues({
        name: task.data.name ?? '',
        description: task.data.description ?? '',
      });
    }
  }, [task.isLoading]);

  useEffect(() => {
    eventsStore.handleOnFocusInLastCreated();
  }, [eventsStore.steps]);

  /*   useEffect(() => {
    return () => {
      timer.setReset();
    };
  }, []); */

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
            fontWeight: 'bold',
            fontSize: theme.spacing(12),
            lineHeight: theme.spacing(9),
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
      <Grid item>
        <Spacer y={1} />
        <Box display='flex' justifyItems='center' ml={2}>
          <StatusChange hasChange={hasChange} />
        </Box>
      </Grid>
      <Grid item xs={12} spacing={2} component={Box}>
        {eventsStore.steps.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CheckboxDocument
              task={item}
              createStep={() => {
                handleChangeForm();
                eventsStore.createStep(item.indice);
              }}
              deleteStep={() => {
                handleChangeForm();
                eventsStore.deleteStep(item.indice);
              }}
              toggleCheckbox={() => {
                handleChangeForm();
                eventsStore.toggleCheckbox(item.indice);
              }}
              handleOnChange={(value) => {
                handleChangeForm();
                eventsStore.handleOnChange(item.indice, value);
              }}
              handleOnKeyUp={(event) => {
                handleChangeForm();
                eventsStore.handleOnKeyUp(item.indice, event);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
});

export const TaskMasterDetail = () => {
  const { id } = useParams<{ id: string }>();

  const task = trpc.privateRouter.tasksRouter.findOne.useQuery(id!, {
    retry: 0,
  });

  return handleStateErrorsToRender<unknown>(task, <TaskForm />);
};
