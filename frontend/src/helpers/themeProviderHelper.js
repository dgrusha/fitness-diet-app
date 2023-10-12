import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
    typography: {
      fontFamily: [
        'Plus Jakarta Sans',
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
      },
      server_error: {
        fontWeight: 300,
        color: "red",
        fontSize: 14
      }
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": { color: "#7D8386" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#9CD91B", borderWidth: 1 },
              "&:hover fieldset": { borderColor: "#6D9712" },
              "&.Mui-focused fieldset": { borderColor: "#6D9712"},
            },
            "& .MuiInputLabel-outlined.Mui-focused": { color: "#6D9712" },
          }
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
      }
    }
  });