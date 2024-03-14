import { createTheme } from '@mui/material/styles';

let theme = createTheme({});
theme = createTheme({
  typography: {
    fontFamily: [
      'Basis Grotesque Pro',
      'San-Serif'
    ].join(',')
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {}
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthXs: {
          [theme.breakpoints.up('xs')]: {
            maxWidth: '448px'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        h3: {
          fontSize: '30px',
          lineHeight: '38px',
          fontWeight: 700
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#316FEA'
    }
  }
});

export default theme;
