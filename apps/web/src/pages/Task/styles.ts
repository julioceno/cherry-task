import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingRight: theme.spacing(30),
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: theme.spacing(5),
    },
  },
}));

export { useStyles };
