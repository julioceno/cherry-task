import {
  useTheme,
  Divider,
  Grid,
  Box,
  Typography,
  Checkbox,
} from '@mui/material';
import { Spacer, TextFieldDocument } from '../../components';
import { CheckboxDocument } from '../../components/Base/Checkbox';
import { useStyles } from './styles';

const tasks = [
  {
    label: 'label 1',
  },
  {
    label: 'label 1',
  },
  {
    label: 'label 1',
  },
  {
    label: 'label 1',
  },
  {
    label: 'label 1',
  },
  {
    label: 'label 1',
  },
  {
    label: 'label 1',
  },
];

export function Task() {
  const theme = useTheme();
  const classes = useStyles();

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
          styles={{
            fontSize: theme.spacing(5),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider variant='fullWidth' />
      </Grid>
      <Grid item xs={12} spacing={2}>
        {tasks.map((item) => (
          <Grid item xs={12}>
            <CheckboxDocument checked label={item.label} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
