import { Box, Divider, Grid, useTheme } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Spacer, TextFieldDocument } from '../../components';
import { CheckboxDocument } from '../../components/Base/Checkbox';
import { SnackbarSaveDocument } from './components';
import { useStyles } from './styles';
import { Timer } from './timer';

const timer = new Timer(() => console.log('maoe'), 2000);

const createTask = () => ({
  id: uuidv4(),
  label: '',
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
      setOpenSnackbar(true);

      setTimeout(() => {
        setOpenSnackbar(false);
      }, 2000);
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

  const handleOnChange = (id: string, value: string) => {
    const index = tasks.findIndex((task) => task.id == id);

    const tempTasks = Array.from(tasks);
    tempTasks[index].label = value;
    setTasks(tempTasks);
    handleOnFocus(id);
  };

  const handleOnFocus = (id: string) => {
    document.getElementById(id)?.focus();
  };

  timer.setExecute(() => formik.handleSubmit());

  useEffect(() => {
    if (lastCreated) {
      handleOnFocus(lastCreated);
      setLastCreated(null);
    }

    formik.setFieldValue('steps', tasks);
  }, [tasks]);

  useEffect(() => {
    timer.setReset();
    timer.setResume();
  }, [formik.values]);

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
            />
          </Grid>
        ))}
      </Grid>
      <SnackbarSaveDocument open={openSnackbar} />
    </Grid>
  );
}
