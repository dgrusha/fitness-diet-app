import * as React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { handleFormResponse } from  '../../helpers/formVerification';
import { login } from '../../apiCalls/login';
import { checkRequired } from '../../helpers/validationCommon'
import { isFormValid } from '../../helpers/isFormValid';
import image_login from "../../img/sign_up_img.png"; 
import './styleLoginAndRegister.css';

const defaultTheme = createTheme({
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

function LogIn(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState({ firstName:"", lastName:"", email:"", password: ""});

  const handleChange = event => {
    const {name, value} = event.target;
    let errVal = validateField(name,value);
    setFormErrors(prevState => ({
        ...prevState,
        [name]: errVal,
        ["general"]: "",
    }),
    setUser({
        ...user,
        [name]:value
    }))
  }

  function validateField(name, value) {
    let errorMessage = ''
    if (name === 'email') {
        if (!checkRequired(value)) {
          errorMessage = "Entry is required"
      }
    }
    if (name === 'password') {
        if (!checkRequired(value)) {
            errorMessage = "Entry is required"
        }
    }
    return errorMessage;
  }

  const handleSubmit =async () => {
    try {
        const response = await login({ email: user.email, password: user.password});
        const [status, message] = [response.status, await response.json()];
        console.log(status);
        if(status === 200){
            props.handleLogin(message);
            props.hasFormHandle(message.hasObligatoryForm);
        }
        handleFormResponse(status, message, setFormErrors, navigate, '/' );
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="title1">
              LOGIN
            </Typography>
            <Typography variant="subtitle1">To get started please enter your details.</Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                label="Email"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={handleChange}
                error = {formErrors["email"] !== ""}
                helperText = {formErrors["email"]}
              />
              <TextField
                label="Password"
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={handleChange}
                error = {formErrors["password"] !== ""}
                helperText = {formErrors["password"]}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2, backgroundColor: "#9CD91B",  }}
                disabled={!isFormValid(formErrors, [user.email, user.password])}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={6}
          sx={{
            backgroundImage: `url(${image_login})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

export default LogIn;
