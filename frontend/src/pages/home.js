import React from 'react';
import { Typography, Button, Paper, Grid, ThemeProvider } from '@mui/material';
import { appTheme } from '../helpers/themeProviderHelper';
import { useState } from 'react';
import { useAppContext } from '../AppContext';
import  { redirect } from 'react-router-dom'

function HomePage() {
    const [photo, setPhoto] = useState(process.env.PUBLIC_URL + '/photo/main_page_illustration.jpg');
		const {user} = useAppContext();
		if (user) {
			return (
				<ThemeProvider theme={appTheme}>
					<Grid container component={Paper} 
						sx={{ height: '100vh', 
									border: '15px solid #F8F8FA',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',}}>
						<img style={{height:"50%", width:"30%"}} className="photoPage" src={photo} alt="Main page photo" />
						{ !user?.hasObligatoryForm ? (
							<>
								<Typography variant="title1">READY TO START?</Typography>
								<Typography variant="subtitle1">Let's start with completing a straightforward form. This will give us valuable insights into your goals.</Typography>
								<Button href="/get_started" sx={{mt: '20px', width: '15%'}}>Fill the form</Button>
							</>) :  (
							<>
								<Typography variant="title1">WE HOPE YOU ARE ENJOYING OUR APP</Typography>
								<Typography variant="subtitle1">Let us know if anything is wrong. This will help us to become better.</Typography>
								<Button href="/feedback" sx={{mt: '20px', width: '15%'}}>Leave feedback</Button>
							</>)
						}
					</Grid>
				</ThemeProvider>
			);}
		else {
			redirect('/login');
		}
  };
  
export default HomePage;