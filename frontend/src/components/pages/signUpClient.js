import * as React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  InputAdornment,
} from '@mui/material';

import image_sign_up from "../../img/login_sign_up.png"; 
import { handleFormResponse } from  '../../helpers/formVerification';
import { register } from '../../apiCalls/register';
import { registerCoach } from '../../apiCalls/registerCoach';
import {checkEmail, checkTextLengthRange, checkRequired, checkContainsDigits, checkContainsCapitalLetter, checkContainsSpecialSign} from '../../helpers/validationCommon'
import { isFormValid } from '../../helpers/isFormValid';
import {ButtonComponent} from "../atoms/Button";
import InputField from '../atoms/InputField';
import TwoSidesTemplate from '../templates/ContainerAndPhotoTemplate';


function SignUpClient(props) {
  const navigate = useNavigate();
  const [isCoach, setIsCoach] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    yourMessage: ''
  })
  const [formErrors, setFormErrors] = useState({ firstName:"", lastName:"", email:"", password: "", yourMessage: ""});

  // Hidden file input
  const [selectedFile, setSelectedFile] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState('Put your recomendation');
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file){
      setSelectedFile(file);
      setTextFieldValue(file.name);
    }
  };

  const handleTextFieldClick = () => {
    document.getElementById('hidden-file-input').click();
  };

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

  const handleCoachChange = event => {
    if(!event.target.checked){
        setFormErrors(prevState => ({
          ...prevState,
          ["yourMessage"]: ""
      }));
    }
    setIsCoach(event.target.checked)
  }

  function isButtonDisabled(){
    if(!isCoach){
      return !isFormValid(formErrors, [user.firstName, user.lastName, user.email, user.password]);
    }else{
      return !isFormValid(formErrors, [user.firstName, user.lastName, user.email, user.password, user.yourMessage]) || !selectedFile;
    }
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

    if(name === 'yourMessage'){
      if (!checkRequired(value)) {
        errorMessage = "Entry is required"
      }
    }

    return errorMessage;
}

  const handleSubmit =async () => {
    setIsSubmitting(true);
    try {
        if(!isCoach){
          const response = await register({ firstName: user.firstName, lastName: user.lastName, 
            email: user.email, password: user.password});
          const [status, message] = [response.status, await response.json()];
          handleFormResponse(status, message, setFormErrors, navigate, '/login' );
        }else{
          const response = await registerCoach({ firstName: user.firstName, lastName: user.lastName, 
            email: user.email, password: user.password,text:textFieldValue, file: selectedFile});
          const [status, message] = [response.status, await response.json()];
          handleFormResponse(status, message, setFormErrors, navigate, '/login' );
        }
    } catch (error) {
      setIsSubmitting(false);
      console.error(error.message);
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
                <FormGroup>
                  <FormControlLabel 
                  control={<Checkbox color="success" value={isCoach} onChange={handleCoachChange} />} 
                  labelPlacement="start" 
                  label="Are you a coach?" />
                </FormGroup>
                {isCoach && 
                <div>
                  <TextField
                    multiline
                    required
                    name="yourMessage"
                    type="yourMessage"
                    id="yourMessage"
                    minRows={3}
                    fullWidth
                    label="Your message"
                    value = {user.yourMessage}
                    onChange={handleChange}
                    error = {formErrors["yourMessage"] !== ""}
                    helperText={formErrors["yourMessage"]}
                  />
                  
                  <input
                    type="file"
                    id="hidden-file-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <TextField
                    id="file-textfield"
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="outlined"
                    value={textFieldValue}
                    onClick={handleTextFieldClick}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            component="label"
                            htmlFor="hidden-file-input"
                            onMouseOver={() => setIsHovered(true)}
                            onMouseOut={() => setIsHovered(false)}
                          >
                            Browse
                          </Button>
                        </InputAdornment>
                      ),
                      style: { cursor: 'pointer',
                               textAlign: 'center'},
                    }}
                  />
                </div>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#9CD91B",  }}
                  onClick={handleSubmit}
                  disabled={isButtonDisabled()}
                >
                  Sign In
                </Button>
                {isSubmitting && <><LinearProgress color="success" /></>}
                <p>{formErrors["general"]}</p>
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