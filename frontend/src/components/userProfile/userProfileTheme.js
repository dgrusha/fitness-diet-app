import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    typography: {
      fontFamily: [
        'Plus Jakarta Sans', 'Helvetica'
      ].join(','),
      subtitle1: {
        fontWeight: 400,
        color: "#7D8386",
        fontSize: 16
      },
      title1: {
        fontWeight: 800,
        color: "#9CD91B",
        fontSize: 36
      }
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            height: '40%',
            width: '40%',
            "& .MuiInputLabel-root": { color: "#7D8386" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#9CD91B", borderWidth: 1 },
              "&:hover fieldset": { borderColor: "#6D9712" },
              "&.Mui-focused fieldset": { borderColor: "#6D9712"},
            },
            "& .MuiInputLabel-outlined.Mui-focused": { color: "#6D9712" },
          },
          disabled: { // Override styles for disabled state
            "& .MuiInputLabel-root": { color: "#7D8386" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#9CD91B", borderWidth: 1 },
              "&:hover fieldset": { borderColor: "#6D9712" },
              "&.Mui-focused fieldset": { borderColor: "#6D9712"},
            },
            "& .MuiInputLabel-outlined.Mui-focused": { color: "#6D9712" },
          },
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
            backgroundColor: "#9CD91B",
            "&:hover": {
              backgroundColor: "#6D9712",
            },
            "&:disabled": {
              backgroundColor: "#E1F3BA",
            },
          }
        }
      },
      MuiAvatar:{
        styleOverrides: {
            root:{
                marginTop: '5%',
                height: '15%',
                width: '15%'
            }
        }
      }
    }
  });

  export default defaultTheme;