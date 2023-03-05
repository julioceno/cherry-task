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
import { Card } from './components';
import { useStyles } from './styles';

const cards = [
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text ever
    since the 1500s, when an unknown printer took a galley of type and
    scrambled it to make a type specimen book. It has survived not only five
    centuries, but also the leap into electronic typesetting, remaining
    essentially unchanged. It was popularised in the 1960s with the release
    of Letraset sheets containing Lorem Ipsum passages, and more recently
    with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
  {
    title: 'Título',
    type: 'Trabalho',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
    industry.`,
  },
];

function Tasks() {
  const theme = useTheme();
  const classes = useStyles();

  const createTaskMutation = trpc.privateRouter.createTask.useMutation();

  function createTask() {
    createTaskMutation.mutate(
      {},
      {
        onSuccess: () => {
          console.log('criou');
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
        {cards.map((card) => (
          <Card
            title={card.title}
            type={card.type}
            description={card.description}
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
          onClick={createTask}
        >
          <AddIcon color='secondary' />
        </Fab>
      </Tooltip>
    </Grid>
  );
}

export { Tasks };
