import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { handleFormResponse } from  '../../helpers/formVerification';
import { login } from '../../apiCalls/login';
import { validateLoginFormFields } from '../../validators/loginValidator';
import { isFormValid } from '../../helpers/isFormValid';
import image_login from "../../img/login_sign_up.png";
import { appTheme } from '../../helpers/themeProviderHelper';
import { ButtonComponent } from "../atoms/Button";
import InputField from '../atoms/InputField';
import TwoSidesTemplate from '../templates/ContainerAndPhotoTemplate';
import LinearProgressWithLabel from '../atoms/LinearProgress'

function LogIn(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = event => {
    const { name, value } = event.target;
    let errVal = validateLoginFormFields(name, value);
    setFormErrors(prevState => ({
      ...prevState,
      [name]: errVal,
      ["general"]: "",
    }));
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
        const response = await login({ email: user.email, password: user.password});
        const [status, message] = [response.status, await response.json()];
        if(status === 200){
          props.handleLogin(message);
          props.hasFormHandle(message.hasObligatoryForm);
        }
        handleFormResponse(status, message, setFormErrors, navigate, '/' );
    } catch (error) {
      console.error(error.message);
      setFormErrors(prevState => ({
        ...prevState,
        general: "Invalid email address or password"
      }));
    }
  };

  return (
    <TwoSidesTemplate
      title={
        <>
          <Typography variant="title1">LOGIN</Typography>
          <Typography variant="subtitle1">To get started please enter your details.</Typography>
        </>
      }
      body={
        <>
          <InputField
            label="Email"
            id="email"
            name="email"
            autoComplete="email"
						required
            value={user.email}
            onChange={handleChange}
            error={formErrors["email"] !== ""}
            helperText={formErrors["email"]}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
						required
            value={user.password}
            onChange={handleChange}
            error={formErrors["password"] !== ""}
            helperText={formErrors["password"]}
          />
          <Typography variant="server_error" textAlign="center">{formErrors["general"]}</Typography>
          <ButtonComponent
            title="Login"
            onClick={handleSubmit}
            disabled={!isFormValid(formErrors, [user.email, user.password])}
          />
        </>
      }
			// submitting={<LinearProgressWithLabel value={isSubmitting}/>}
      additional_links={
        <Grid container sx={{ width: '80%' }}>
          <Grid item xs>
            <Link href="#" variant="link_a">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="link_a">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      }
      img={image_login}
    />
  );
}

export default LogIn;
