import { createTheme } from '@mui/material/styles';

export const mainPageTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 3,
          width: '70%',
          height: '70%',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90%',
          width: '90%',
          margin: 'auto',
        },
      },
    },
    MuiImg: {
      styleOverrides: {
        root: {
          width: '100%',
          height: '100%',
          borderRadius: '50%',
        },
      },
    },
  },
});
