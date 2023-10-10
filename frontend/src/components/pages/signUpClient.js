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

import image_login from "../../img/sign_up_img.png"; 
import { handleFormResponse } from  '../../helpers/formVerification' 
import { handleEmailInputChange, handleTextInputChange } from '../../helpers/inputChanges';
import { register } from '../../apiCalls/register';
import {checkEmail, checkTextLengthRange, checkRequired, checkContainsDigits, checkContainsCapitalLetter, checkContainsSpecialSign} from '../../helpers/validationCommon'
import { isFormValid } from '../../helpers/isFormValid';
import './styleLoginAndRegister.css';

import { red } from '@mui/material/colors';


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
  // components: {
  //   TextField: {
  //       borderRadius: 60,
  //       sx: {border: '8px', border: "1px solid #9CD91B", outline: '0'}
  //       // style: {
  //       //   textTransform: 'none',          
  //       //   borderRadius: '8px',
  //       //   border: "10px solid #9CD91B", 
  //       //   outline: '0'}
  //       },
  //     },
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

function SignUpClient() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
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
    if (name === 'firstName') {
        if (!checkRequired(value)) {
            errorMessage = "Entry is required"
        } else if (!checkTextLengthRange(value, 2, 30)) {
            errorMessage = "Entry should contain 2-30 characters"
        }
    }
    if (name === 'lastName') {
        if (!checkRequired(value)) {
            errorMessage = "Entry is required"
        } else if (!checkTextLengthRange(value, 2, 30)) {
            errorMessage = "Entry should contain 2-30 characters"
        }
    }
    if (name === 'email') {
        if (!checkRequired(value)) {
          errorMessage = "Entry is required"
      } else if (!checkEmail(value)){
          errorMessage = "Email should match name@dom.com"
      }
    }

    if (name === 'password') {
        if (!checkRequired(value)) {
            errorMessage = "Entry is required"
        }
        else if (!checkTextLengthRange(value, 6, 14)){
            errorMessage = "Entry should contain 6-14 characters"
        }
        else if (!checkContainsDigits(value)){
            errorMessage = "Entry should contain digit"
        }
        else if (!checkContainsCapitalLetter(value)){
            errorMessage = "Entry should contain capital letter"
        }
        else if (!checkContainsSpecialSign(value)){
            errorMessage = "Entry should contain special character"
        }
    }
    return errorMessage;
}

  const handleSubmit =async () => {
    try {
        const response = await register({ firstName: user.firstName, lastName: user.lastName, 
          email: user.email, password: user.password});
        const [status, message] = [response.status, await response.json()];
        handleFormResponse(status, message, setFormErrors, navigate, '/login' );

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
                SIGN IN
              </Typography>
              <Typography variant="subtitle1">To get started please enter your details.</Typography>
              <Box sx={{ mt: 1 }}>
              <TextField
                  label="Name"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  autoComplete="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  sx= {{borderBlockColor: red}}
                  error = {formErrors["firstName"] !== ""}
                  helperText={formErrors["firstName"]}
                  // sx = {{borderRadius: '8px', border: "1px solid #9CD91B", outline: '0'}}
                />
                <TextField
                  label="Surname"
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  name="lastName"
                  autoComplete="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  error = {formErrors["lastName"] !== ""}
                  helperText = {formErrors["lastName"]}
                  // sx = {{borderRadius: '8px', border: "1px solid #9CD91B", outline: '0'}}
                />
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
                  // error = {/^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/.test(email)}
                  // helperText={formErrors["email"]=== "" ? 'Please enter a value!' : ' '}
                  // sx = {{borderRadius: '8px', border: "1px solid #9CD91B", outline: '0'}}
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
                  // sx = {{borderRadius: '8px', border: "1px solid #9CD91B", outline: '0'}}
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
                  onClick={handleSubmit}
                  disabled={!isFormValid(formErrors, [user.firstName, user.lastName, user.email, user.password])}
                >
                  Sign In
                </Button>
                <p>{formErrors["general"]}</p>
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

export default SignUpClient;