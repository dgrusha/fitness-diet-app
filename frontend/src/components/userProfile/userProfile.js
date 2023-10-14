import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultTheme from './userProfileTheme';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import image_profile from "../../img/user_profile_page.png"; 
import {getUser} from '../../apiCalls/userProfileGetInfo'
import { handleTextInputChange } from '../../helpers/inputChanges';
import {validateUserProfileFields} from '../../validators/userProfileValidator'
import { isFormValid } from '../../helpers/isFormValid';
import { updateUserProfile } from '../../apiCalls/userProfileUpdateInfo';

function UserProfile() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [formErrors, setFormErrors] = useState({ name:"", surname:"", general:""});
  const [userData, setUserData] = useState({});
  const setters = {
    "name": setName,
    "surname": setSurname
  }

  const handleChange = event => {
      const {name, value} = event.target;
      handleTextInputChange(event, setters[name]);
      let errVal = validateUserProfileFields(name,value);
      setFormErrors(prevState => ({
          ...prevState,
          [name]: errVal,
          ["general"]: "",
      }))
  }

  useEffect(() => {
    getUser().then((data) => {
        setUserData(data);
        setName(data.firstName);
        setSurname(data.lastName);
    });
  }, []); 

  const handleSendButtonClick = async () => {
      try {
          const response = await updateUserProfile({ name: name, surname: surname});
          const [status, message] = [response.status, await response.text()];
          if(status === 200){
              setStatus(message);
          }else{
              setStatus(message);
          }
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
                Account Settings
              </Typography>
                <Avatar alt="The avatar" src={process.env.PUBLIC_URL + '/photo/animal_workout.jpg'} />
                <TextField
                InputLabelProps={{ shrink: true }}
                label="Name"
                margin="normal"
                required
                id="name"
                name="name"
                helperText={formErrors["name"]}
                onChange={handleChange}
                value={name}
                />
                <TextField
                InputLabelProps={{ shrink: true }}
                label="Surname"
                margin="normal"
                required
                id="surname"
                name="surname"
                helperText={formErrors["surname"]}
                onChange={handleChange}
                value={surname}
                />
                <TextField
                InputLabelProps={{ shrink: true }}
                label="Email"
                margin="normal"
                id="email"
                name="email"
                value={userData.email}
                InputProps={{ readOnly: true }}
                />
                <FormGroup>
                  <FormControlLabel 
                  control={<Checkbox color="success" checked={userData.hasObligatoryForm === true}  />} 
                  labelPlacement="start" 
                  label="Have you passed obligatory form?" />
                </FormGroup>
                <Button
                disabled={!isFormValid(formErrors, [name, surname]) 
                || (name === userData.firstName && surname === userData.lastName)}
                type="submit"
                variant="contained"
                onClick={handleSendButtonClick}
                sx={{ mt: 3, mb: 2, backgroundColor: "#9CD91B",  }}
                >
                Save changes
              </Button>
              <p>{formErrors["general"]}</p>
              <p>{status}</p>
            </Box>
          </Grid>
          <Grid item xs={false} sm={4} md={6}
            sx={{
              backgroundImage: `url(${image_profile})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
      </ThemeProvider>
    );
}

export default UserProfile;