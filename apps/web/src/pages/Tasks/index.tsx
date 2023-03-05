import AddIcon from '@mui/icons-material/Add';
import {
  Divider,
  Fab,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { Spacer } from '../../components';
import { trpc } from '../../utils';
import { ListCards } from './components';
import { useStyles } from './styles';

function Tasks() {
  const theme = useTheme();
  const classes = useStyles();

  const rotaPrivada = trpc.privateRouter.createTask.useQuery();

  function createTask() {
    rotaPrivada.refetch();
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
        <ListCards />
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
          onClick={createTask}
        >
          <AddIcon color='secondary' />
        </Fab>
      </Tooltip>
    </Grid>
  );
}

export { Tasks };
