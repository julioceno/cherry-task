import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#12AFCB',
      dark: '#19B0CB',
    },
    secondary: {
      main: '#F4F4F2',
      dark: '#484848',
    },

    background: {
      default: '#F4F4F2',
    },
    text: {
      primary: '#484848',
      secondary: '#F4F4F2',
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', 'Open Sans'].join(','),
  },
  components: {},
  spacing: (factor: number) => `${0.25 * factor}rem`, // (Bootstrap strategy)
});

export { theme };
