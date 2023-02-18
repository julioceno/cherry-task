import { Divider, Grid, Typography } from '@mui/material';
import { useStyles } from './styles';
import { Spacer } from '../../components';
import { Image } from '@mui/icons-material';
import img from '../../assets/outer_space.png';

function ResourceNotImplemented() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={2}
      className={classes.container}
      justifyContent='center'
      alignItems='center'
    >
      <Spacer y={3} />
      <img
        src={`${img}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        loading='lazy'
      />
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

export { ResourceNotImplemented };
