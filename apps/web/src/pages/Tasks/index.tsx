import AddIcon from '@mui/icons-material/Add';
import {
  Divider,
  Fab,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spacer } from '../../components';
import { trpc } from '../../utils';
import { Card } from './components';
import { useStyles } from './styles';

function Tasks() {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();

  const createTask = trpc.privateRouter.tasksRouter.create.useMutation();
  const tasks = trpc.privateRouter.tasksRouter.findAll.useQuery(undefined, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  function handleCreateTask() {
    createTask.mutate(
      {},
      {
        onSuccess: (value) => {
          navigate(`/task/${value.id}`);
        },
        onError: () => {
          console.log('error');
        },
      }
    );
  }

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item>
        <Spacer y={40} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight='600'>
          Organize suas tarefas
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Divider variant='fullWidth' />
      </Grid>
      <Grid container item xs={12}>
        {tasks.data?.map((card) => (
          <Card
            id={card.id}
            title={card.name || 'Sem título'}
            description={card.description || 'Sem descrição'}
          />
        ))}
      </Grid>
      <Tooltip title='Criar nova tarefa' placement='top'>
        <Fab
          color='primary'
          aria-label='add'
          style={{
            position: 'fixed',
            right: theme.spacing(10),
            bottom: theme.spacing(10),
          }}
          onClick={handleCreateTask}
        >
          <AddIcon color='secondary' />
        </Fab>
      </Tooltip>
    </Grid>
  );
}

export { Tasks };
