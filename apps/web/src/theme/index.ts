import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#12AFCB',
      dark: '#1AA2BA',
    },
    secondary: {
      main: '#F4F4F2',
      dark: '#484848',
    },
    blackButton: {
      main: '#484848',
      contrastText: '#F4F4F2',
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

declare module '@mui/material/styles' {
  interface Palette {
    blackButton: Palette['primary'];
  }

  interface PaletteOptions {
    blackButton: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    blackButton: true;
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    blackButton: true;
  }
}

export { theme };
