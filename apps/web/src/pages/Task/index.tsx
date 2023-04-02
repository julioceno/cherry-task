import CloudDoneIcon from '@mui/icons-material/CloudDone';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, Divider, Grid, Typography, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useParams } from 'react-router-dom';
import { Spacer, TextFieldDocument } from '../../components';
import { CheckboxDocument } from '../../components/Base/Checkbox';
import { snackbarStore, trpc } from '../../utils';
import { SnackbarSaveDocument } from './components';
import { eventsStore } from './eventsStore';
import { useStyles } from './styles';
import { timer } from './timer';
import { ITask } from './types';

interface Props {
  name: string;
  description: string;
  tasks: ITask[];
}

function StatusChange({ hasChange }: { hasChange: Nullable<boolean> }) {
  if (hasChange) {
    return (
      <React.Fragment>
        <ReplayIcon />
        <Spacer x={1} />
        <Typography fontStyle='italic'>Salvando alterações</Typography>
      </React.Fragment>
    );
  }

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

  const utils = trpc.useContext();

  const { id } = useParams<{ id: string }>();

  const task = trpc.privateRouter.tasksRouter.findOne.useQuery(id!, {
    retryOnMount: true,
    refetchOnMount: true,
  });

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
          steps: eventsStore.tasks.map(({ focus, ...step }) => {
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

  function handleChangeField(e: React.ChangeEvent<HTMLInputElement>) {
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
    // FIXME verificar se ainda é necessário ao fim de projeto
    saveTaskLocalStorage({
      name: values.name,
      description: values.description,
      tasks: eventsStore.tasks,
    });
  }, [values.name, values.description, eventsStore.tasks]);

  useEffect(() => {
    if (task.isSuccess) {
      eventsStore.populateSteps(task.data?.steps ?? [eventsStore.createTask()]);

      formik.setValues({
        name: task.data.name ?? '',
        description: task.data.description ?? '',
      });
    }
  }, [task.isLoading]);

  useEffect(() => {
    eventsStore.handleOnFocusInLastCreated();
  }, [eventsStore.tasks]);

  useEffect(() => {
    return () => {
      /*  formik.handleSubmit();
      const obj = JSON.parse(localStorage.getItem('task')!);

      utils.privateRouter.tasksRouter.findAll.fetch().then((data) => {
        const newArr = data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              name: obj.name,
              description: obj.description,
            };
          }

          return item;
        });

        utils.privateRouter.tasksRouter.findAll.setData(undefined, newArr);
      });

      utils.privateRouter.tasksRouter.findOne.setData('', {
        ...obj,
        name: 'obj.name',
        description: 'obj.description',
      });
      utils.privateRouter.tasksRouter.findAll.refetch();

      localStorage.removeItem('task'); */
      eventsStore.clear();
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
      <Grid item>
        <Spacer y={1} />
        <Box display='flex' justifyItems='center' ml={2}>
          <StatusChange hasChange={hasChange} />
        </Box>
      </Grid>
      <Grid item xs={12} spacing={2} component={Box}>
        {eventsStore.tasks.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CheckboxDocument
              task={item}
              createStep={() => {
                eventsStore.createStep(item.indice);
              }}
              deleteStep={() => {
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
