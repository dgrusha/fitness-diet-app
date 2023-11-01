import * as React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import image_sign_up from "../../img/login_sign_up.png"; 
import { handleFormResponse } from  '../../helpers/formVerification';
import { register } from '../../apiCalls/register';
import { validateSignUpFormFields} from '../../validators/signUpValidator'
import { isFormValid } from '../../helpers/isFormValid';
import {ButtonComponent} from "../atoms/Button";
import InputField from '../atoms/InputField';
import TwoSidesTemplate from '../templates/ContainerAndPhotoTemplate';


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
          handleFormResponse(status, message, setFormErrors, navigate, '/login' );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <TwoSidesTemplate
      title={<>
        <Typography variant="title1">SIGN IN</Typography>
        <Typography variant="subtitle1">To get started please enter your details.</Typography>
        </>}
      body={<>
        <InputField label="Name" id="firstName" name="firstName" autoComplete="firstName" required value={user.firstName} onChange={handleChange} 
          error={formErrors["firstName"] !== ""} helperText={formErrors["firstName"]} 
        />
        <InputField label = "Surname" name="lastName" id="lastName" autoComplete="lastName" required value={user.lastName}
          onChange={handleChange} error={formErrors["lastName"] !== ""} helperText={formErrors["lastName"]}
        />                
        <InputField label="Email" id="email" name="email" autoComplete="email" required value={user.email} onChange={handleChange} 
          error={formErrors["email"] !== ""} helperText={formErrors["email"]}
        />
        <InputField label = "Password" name="password" type="password" id="password" autoComplete="current-password" required value={user.password}
          onChange={handleChange} error={formErrors["password"] !== ""} helperText={formErrors["password"]}
        />
        <Typography variant="server_error">{formErrors["general"]}</Typography>
        <ButtonComponent title="Sign In" onClick={handleSubmit} disabled={!isFormValid(formErrors, [user.firstName, user.lastName, user.email, user.password])}/>
        </>}
      img={image_sign_up}
    />
  );
}

export default SignUpClient;