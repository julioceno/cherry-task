import { Divider, Grid, Typography } from '@mui/material';
import { useStyles } from './styles';
import { Spacer } from '../../components';

function Tasks() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.container}>
      <Spacer y={3} />
      <Grid item xs={12}>
        <Typography variant='h4' fontWeight='500'>
          Organize suas tarefas
        </Typography>
        <Divider />
      </Grid>
    </Grid>
  );
}

export { Tasks };
