import { Box, Divider, Grid, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { KeyboardEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Spacer, TextFieldDocument } from '../../components';
import { CheckboxDocument, ITask } from '../../components/Base/Checkbox';
import { KeysEnum } from '../../enums';
import { SnackbarSaveDocument } from './components';
import { useStyles } from './styles';
import { Timer } from './timer';

const timer = new Timer();

const createTask = (): ITask => ({
  id: uuidv4(),
  label: null,
  checked: false,
  focus: true,
});

export function Task() {
  const theme = useTheme();
  const classes = useStyles();
  const [tasks, setTasks] = useState([createTask()]);
  const [lastCreated, setLastCreated] = useState<Nullable<string>>(null);
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

  const createStep = (id: string) => {
    const index = tasks.findIndex((task) => task.id == id);
    const tempTasks = tasks.map((task) => ({
      ...task,
      focus: false,
    }));

    const newElement = createTask();
    tempTasks.splice(index + 1, 0, newElement);
    setLastCreated(newElement.id);
    setTasks(tempTasks);
  };

  const toggleCheckbox = (id: string) => {
    const index = tasks.findIndex((task) => task.id == id);
    const tempTasks = Array.from(tasks);
    tempTasks[index].checked = !tempTasks[index].checked;
    setTasks(tempTasks);
  };

  const deleteStep = (id: string) => {
    if (tasks.length === 1) return setTasks([createTask()]);

    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleOnChange = (id: string, value: Nullable<string>) => {
    const index = tasks.findIndex((task) => task.id === id);

    const tempTasks = Array.from(tasks);
    tempTasks[index].label = value;
    setTasks(tempTasks);
    handleOnFocus(id);
  };

  const handleOnKeyUp = (
    id: string,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === KeysEnum.ENTER) {
      createStep(id);
      return;
    }

    if (event.key === KeysEnum.BACKSPACE) {
      const index = tasks.findIndex((task) => task.id === id);
      const element = tasks[index] as ITask;

      if (!element.label?.length && element.label !== null)
        return handleOnChange(id, null);

      if (element.label === null) {
        deleteStep(id);

        if (!index) return;

        const getLastId = tasks[index - 1].id;
        handleOnFocus(getLastId);
      }
    }
  };

  const handleOnFocus = (id: string) => {
    document.getElementById(id)?.focus();
  };

  useEffect(() => {
    if (lastCreated) {
      handleOnFocus(lastCreated);
      setLastCreated(null);
    }

    formik.setFieldValue('steps', tasks);
  }, [tasks]);

  /*   timer.setProps(() => formik.handleSubmit(), 3000);
  useEffect(() => {
    timer.setReset();
    timer.setResume();
  }, [formik.values]); */

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
        {tasks.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CheckboxDocument
              task={item}
              createStep={() => createStep(item.id)}
              deleteStep={() => deleteStep(item.id)}
              toggleCheckbox={() => toggleCheckbox(item.id)}
              handleOnChange={(value) => handleOnChange(item.id, value)}
              handleOnKeyUp={(event) => handleOnKeyUp(item.id, event)}
            />
          </Grid>
        ))}
      </Grid>
      <SnackbarSaveDocument open={openSnackbar} />
    </Grid>
  );
}
