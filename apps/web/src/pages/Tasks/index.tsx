import { Grid } from '@mui/material';
import { DrawerCustomer } from '../../components';
import { useStyles } from './styles';

function Tasks() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <DrawerCustomer />
    </Grid>
  );
}

export { Tasks };
