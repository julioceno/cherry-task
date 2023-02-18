import {
  useTheme,
  Divider,
  Grid,
  Box,
  Typography,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';
import { Spacer, TextFieldDocument } from '../../components';
import { CheckboxDocument } from '../../components/Base/Checkbox';
import { useStyles } from './styles';
import { v4 as uuidv4 } from 'uuid';

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

  const createStep = (id: string) => {
    const index = tasks.findIndex((task) => task.id == id);
    const tempTasks = tasks.map((task) => ({
      ...task,
      focus: false,
    }));

    tempTasks.splice(index + 1, 0, createTask());

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
  };

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item>
        <Spacer y={30} />
      </Grid>
      <Grid item xs={12}>
        <TextFieldDocument
          placeholder='Insira o título da tarefa'
          name='taskName'
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
          name='about'
          styles={{ fontSize: theme.spacing(5) }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider variant='fullWidth' />
      </Grid>
      <Grid item xs={12} spacing={2} component={Box}>
        {tasks.map((item) => (
          <Grid item xs={12}>
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
    </Grid>
  );
}
