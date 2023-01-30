import { Grid } from '@mui/material';
import { AppWrap } from '../../components';
import { useStyles } from './styles';

function TasksComponent() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      bla bla
    </Grid>
  );
}

export { TasksComponent };
