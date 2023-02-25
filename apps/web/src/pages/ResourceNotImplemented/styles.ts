import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: theme.spacing(100),
    marginRight: theme.spacing(10),
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(60),
    },
  },
}));

export { useStyles };
