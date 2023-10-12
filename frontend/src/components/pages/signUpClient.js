import * as React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import image_login from "../../img/sign_up_img.png"; 
import { handleFormResponse } from  '../../helpers/formVerification';
import { register } from '../../apiCalls/register';
import { validateSignUpFormFields} from '../../validators/signUpValidator'
import { isFormValid } from '../../helpers/isFormValid';
import { appTheme } from '../../helpers/themeProviderHelper';



function SignUpClient(props) {
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
    let errVal = validateSignUpFormFields(name,value);
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

  const handleSubmit =async () => {
    try {
        const response = await register({ firstName: user.firstName, lastName: user.lastName, 
          email: user.email, password: user.password});
        const [status, message] = [response.status, await response.text()];
        if(status === 200){
            props.registerHandle(true);
        }else{
            props.registerHandle(false);
        }
        handleFormResponse(status, message, setFormErrors, navigate, '/auth/login' );
    } catch (error) {
      console.error(error.message);
      setFormErrors(prevState => ({
        ...prevState,
        general: "Account with provided email address already exists"
      }));
    }
  };

    return (
      <ThemeProvider theme={appTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
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
                  error = {formErrors["firstName"] !== ""}
                  helperText={formErrors["firstName"]}
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
                <Typography variant="server_error">{formErrors["general"]}</Typography>
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