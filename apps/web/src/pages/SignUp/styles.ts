import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100vh',
  },
  sideBar: {
    background: theme.palette.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
  subtitle: {
    opacity: 0.9,
  },
}));

export { useStyles };
