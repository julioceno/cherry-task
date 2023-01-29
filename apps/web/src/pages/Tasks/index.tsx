import { Grid } from '@mui/material';
import { AppWrap } from '../../components';
import { useStyles } from './styles';

function Tasks() {
  const classes = useStyles();

  return (
    <AppWrap>
      <Grid container className={classes.container}>
        bla bla
      </Grid>
    </AppWrap>
  );
}

export { Tasks };
