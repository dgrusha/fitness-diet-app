import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    info: {
      main: '#2196F3',
    },
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    backgroundColor: 'white',
  },
  header: {
    padding: 2,
    borderBottom: '1px solid grey',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  messageBox: {
    marginBottom: 8,
    width: '50%',
    borderRadius: 8,
    padding: 1,
  },
  iconHelp: {
    marginRight: 2,
    color:'#9cd91b',
  },
  inputSection: {
    display: 'flex',
    alignItems: 'center',
    padding: 2,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#9cd91b',
      },
    },
    '& label.Mui-focused': {
      color: '#9cd91b',
    },
    '& label': {
      color: '#000000',
    },
  },
  autocomplete: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#9cd91b',
      },
    },
    '& label.Mui-focused': {
      color: '#9cd91b', 
    },
    '& label': {
      color: '#000000', 
    },
  },
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					color: "#FFFFFF",
					backgroundColor: "#9CD91B",
					"&:hover": {
						backgroundColor: "#6D9712",
					},
					"&.Mui-disabled": {
						backgroundColor: "#E1F3BA",
					},
				}
			}
		}
	}
});