import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) => ({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
}));

export { useStyles };
