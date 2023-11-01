import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Grid,
  Paper,
  Button,
  Typography,
  CssBaseline,
  Avatar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  LinearProgress,
} from '@mui/material';

import defaultTheme from './userProfileTheme';
import image_profile_setting from '../../img/user_profile_page.png';
import { getUser } from '../../apiCalls/userProfileGetInfo';
import { handleTextInputChange } from '../../helpers/inputChanges';
import { resizeAndSetPhoto } from '../../helpers/photoHelper';
import { validateUserProfileFields } from '../../validators/userProfileValidator';
import { isFormValid } from '../../helpers/isFormValid';
import { updateUserProfile } from '../../apiCalls/userProfileUpdateInfo';
import { appTheme } from '../../helpers/themeProviderHelper';
import {ButtonComponent} from "../atoms/Button";
import InputField from '../atoms/InputField';
import TwoSidesTemplate from '../templates/ContainerAndPhotoTemplate';

function UserProfile() {
  const [status, setStatus] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({ firstName:"", lastName:"", general:""});
  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState(process.env.PUBLIC_URL + '/photo/animal_workout.jpg');
  const [photoFile, setPhotoFile] = useState(undefined);
  const setters = {
    "firstName": setFirstName,
    "lastName": setLastName
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
    setIsSubmitting(true);
    getUser().then((data) => {
        setUserData(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        if(data.avatarFileName !== undefined && data.avatarFileName !==''){
          setAvatar(data.avatarFileName);
        }     
    });
    setIsSubmitting(false);
  }, []); 

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      resizeAndSetPhoto(reader, setAvatar, 200, 200);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => {
    document.getElementById('photo-upload').click();
  };

  const handleSendButtonClick = async () => {
      try {
          setIsSubmitting(true);
          const response = await updateUserProfile({ firstName: firstName, lastName: lastName, photo: photoFile});
          const [status, message] = [response.status, await response.text()];
          if(status === 200){
              setStatus(message);
          }else{
              setStatus(message);
          }
          
      } catch (error) {
        console.error(error.message);
      }finally{
        setIsSubmitting(false);
      }
    };

    return (
      //   <ThemeProvider theme={defaultTheme}>
      //   <Grid container component="main" sx={{ height: '100vh' }}>
      //     <CssBaseline />
  
      //     <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
      //       <Box
      //         sx={{
      //           my: 8,
      //           mx: 4,
      //           display: 'flex',
      //           flexDirection: 'column',
      //           alignItems: 'center',
      //         }}
      //       >
      //         <Typography variant="title1">
      //           Account Settings
      //         </Typography>
      //           <Avatar alt="The avatar" src={avatar} onClick={handleAvatarClick} />
      //           <input
      //             accept="image/*"
      //             style={{ display: 'none' }}
      //             id="photo-upload"
      //             type="file"
      //             onChange={handleFileChange}
      //           />
      //           <TextField
      //           InputLabelProps={{ shrink: true }}
      //           label="Name"
      //           margin="normal"
      //           required
      //           id="name"
      //           name="name"
      //           helperText={formErrors["name"]}
      //           onChange={handleChange}
      //           value={firstName}
      //           />
      //           <TextField
      //           InputLabelProps={{ shrink: true }}
      //           label="Surname"
      //           margin="normal"
      //           required
      //           id="surname"
      //           name="surname"
      //           helperText={formErrors["surname"]}
      //           onChange={handleChange}
      //           value={lastName}
      //           />
      //           <TextField
      //           InputLabelProps={{ shrink: true }}
      //           label="Email"
      //           margin="normal"
      //           id="email"
      //           name="email"
      //           value={userData.email}
      //           InputProps={{ readOnly: true }}
      //           />
      //           <FormGroup>
      //             <FormControlLabel 
      //             control={<Checkbox color="success" checked={userData.hasObligatoryForm === true}  />} 
      //             labelPlacement="start" 
      //             label="Have you passed obligatory form?" />
      //           </FormGroup>
      //           <Button
      //           disabled={!isFormValid(formErrors, [firstName, lastName]) 
      //           || (firstName === userData.firstName && lastName === userData.lastName)}
      //           type="submit"
      //           variant="contained"
      //           onClick={handleSendButtonClick}
      //           sx={{ mt: 3, mb: 2, backgroundColor: "#9CD91B",  }}
      //           >
      //           Save changes
      //         </Button>
      //         {isSubmitting && <LinearProgress color="success" />}
      //         <p>{formErrors["general"]}</p>
      //         <p>{status}</p>
      //       </Box>
      //     </Grid>
      //     <Grid item xs={false} sm={4} md={6}
      //       sx={{
      //         backgroundImage: `url(${image_profile_setting})`,
      //         backgroundRepeat: 'no-repeat',
      //         backgroundSize: 'cover',
      //         backgroundPosition: 'center',
      //       }}
      //     />
      //   </Grid>
      // </ThemeProvider>

			<TwoSidesTemplate
				title={<Typography variant="title1">Account settings</Typography>}
				body={<>
						<Avatar alt="The avatar" src={avatar} onClick={handleAvatarClick} />
						<input
								accept="image/*"
								style={{ display: 'none' }}
								id='photo-upload'
								type="file"
								onChange={handleFileChange}
						/>
	
					<InputField label="Name" id="firstName" name="firstName" autoComplete="firstName" value={firstName} onChange={handleChange} 
						error={formErrors["firstName"] !== ""} helperText={formErrors["firstName"]} 
					/>
					<InputField label = "Surname" name="lastName" id="lastName" autoComplete="lastName" value={lastName}
						onChange={handleChange} error={formErrors["lastName"] !== ""} helperText={formErrors["lastName"]}
					/>                
					<InputField disabled label="Email" id="email" name="email" autoComplete="email" value={userData.email}
						InputLabelProps={{ shrink: true }}
					/>
					<FormGroup>
            <FormControlLabel 
              control={<Checkbox color="success" checked={userData.hasObligatoryForm === true}  />} 
              labelPlacement="start" 
              label="Have you passed obligatory form?" />
          </FormGroup>
					<Typography variant="server_error">{formErrors["general"]}</Typography>
					<ButtonComponent title="SAVE CHANGES" onClick={handleSendButtonClick} disabled={!isFormValid(formErrors, [firstName, lastName])
					|| (firstName === userData.firstName && lastName === userData.lastName)}/>
					<p>{status}</p>
					</>}
				img={image_profile_setting}
			/>
    );
}

export default UserProfile;