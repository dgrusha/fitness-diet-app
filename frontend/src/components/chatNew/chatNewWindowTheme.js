import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    table: {
      minWidth: 650,
    },
    chatSection: {
      width: '100%',
      height: '100vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
      height: '70vh',
      overflowY: 'auto'
    }
  });

  export default defaultTheme;