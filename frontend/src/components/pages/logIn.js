import * as React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { handleTextInputChange } from '../../helpers/inputChanges';
import {validateObligatoryFormFields} from '../../validators/formObligatoryValidator';
import { handleFormResponse } from  '../../helpers/formVerification';
import { login } from '../../apiCalls/login';
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
    TextField: {
        borderRadius: 60,
        style: {
          textTransform: 'none',          
          borderRadius: '8px',
          border: "1px solid #9CD91B", 
          outline: '0'}
        },
      },
    // MuiButton: {
    //   variants: [
    //     // {
    //     //   props: { variant: 'dashed' },
    //     //   style: {
    //     //     textTransform: 'none',
    //     //     border: `2px dashed ${blue[500]}`,
    //     //   },
    //     // },
    //     {
    //       props: { variant: 'dashed', color: 'secondary' },
    //       style: {
    //         border: `4px dashed ${red[500]}`,
    //       },
    //     },
    //   ],
    // },
  }
);

// export default function SignInSide() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({ firstName:"", lastName:"", email:"", password: ""});
  const setters = {
      "email": setEmail,
      "password": setPassword
  }

  const handleChange = event => {
    const {name, value} = event.target;
    handleTextInputChange(event, setters[name]);
    let errVal = validateObligatoryFormFields(name,value);
    setFormErrors(prevState => ({
        ...prevState,
        [name]: errVal,
        ["general"]: "",
    }))
}

  const handleSubmit =async () => {
    try {
        const response = await login({ email: email, password: password});
        const [status, message] = [response.status, await response.text()];
        handleFormResponse(status, message, setFormErrors, navigate, '/' );
    } catch (error) {
      console.error(error.message);
    }
  };

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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                label="Email"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                sx = {{borderRadius: '8px', border: "1px solid #9CD91B", outline: '0'}}
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
                value={password}
                onChange={handleChange}
                sx = {{borderRadius: '8px', border: "1px solid #9CD91B", outline: '0'}}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#9CD91B",  }}
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
                  <Link href="#" variant="body2">
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