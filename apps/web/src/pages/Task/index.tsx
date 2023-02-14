import { useTheme, Divider, Grid, TextField, Typography } from '@mui/material';
import { Spacer, TextFieldDocument } from '../../components';
import { useStyles } from './styles';

export function Task() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Grid container classes={classes.container} spacing={2}>
      <Grid item>
        <Spacer y={30} />
      </Grid>
      <Grid item xs={12}>
        <TextFieldDocument
          label='Insira o título da tarefa'
          name='taskName'
          styles={{
            fontSize: theme.spacing(12),
            bold: true,
          }}
        />
        <Grid item>
          <Spacer y={2} />
        </Grid>

        <Grid item>
          <Spacer y={1.5} />
        </Grid>
        <TextFieldDocument
          label='Descrição...'
          name='about'
          styles={{
            fontSize: theme.spacing(5),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider variant='fullWidth' />
      </Grid>
    </Grid>
  );
}
