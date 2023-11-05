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
        fontSize: 36,
        marginBottom: 20
      }
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            height: '45%',
            width: '45%',
            marginTop:10,
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
            width: '45%',
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
      MuiAvatar: {
        styleOverrides: {
          root: {
            marginTop: '5%',
            height: '150px', 
            width: '150px',  
            position: 'relative',
            cursor: 'pointer',
            "&:hover": {
              "&::before": {
                content: '"Upload"',
                color: 'white',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              },
              "& p": {
                color: '#FFFFFF',
              },
            },
          },
          img: {
            objectFit: 'cover', 
            width: '100%',      
            height: '100%',     
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            marginTop: '2%',
            width: '45%',
          }
        }
      },
    }
  });

  export default defaultTheme;