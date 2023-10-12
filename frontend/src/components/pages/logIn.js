import * as React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import { handleFormResponse } from  '../../helpers/formVerification';
import { login } from '../../apiCalls/login';
import { validateLoginFormFields } from '../../validators/loginValidator';
import { isFormValid } from '../../helpers/isFormValid';
import image_login from "../../img/sign_up_img.png"; 
import { appTheme } from '../../helpers/themeProviderHelper';

function LogIn(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState({ firstName:"", lastName:"", email:"", password: ""});

  const handleChange = event => {
    const {name, value} = event.target;
    let errVal = validateLoginFormFields(name,value);
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
        const response = await login({ email: user.email, password: user.password});
        const [status, message] = [response.status, await response.json()];
        if(status === 200){
          props.loginHandle(true);
      }else{
          props.loginHandle(false);
      }
        handleFormResponse(status, message, setFormErrors, navigate, '/' );
    } catch (error) {
      console.error(error.message);
      setFormErrors(prevState => ({
        ...prevState,
        general: "Invalid email address or password"
      }));
    }
  }

  return (
    <ThemeProvider theme={ appTheme }>
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
              <Typography variant="server_error" textAlign="center">{formErrors["general"]}</Typography>
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
