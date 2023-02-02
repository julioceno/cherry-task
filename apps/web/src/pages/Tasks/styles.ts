import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    justifyContent: 'flex-start',
    paddingLeft: theme.spacing(10),
  },
}));

export { useStyles };
