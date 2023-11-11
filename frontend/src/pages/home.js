import React from 'react';
import { Typography, Button, Paper, ThemeProvider } from '@mui/material';
import { appTheme } from '../helpers/themeProviderHelper';
import { useState } from 'react';
import Grid from '@mui/material/Grid';

function HomePage() {
    const [photo, setPhoto] = useState(process.env.PUBLIC_URL + '/photo/main_page_illustration.jpg');

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
          <Typography variant="title1">READY TO START?</Typography>
          <Typography variant="subtitle1">Let's start with y completing a straightforward form. This will give us valuable insights into your goals.</Typography>
					<Button href="/get_started" sx={{mt: '20px', width: '15%'}}>Fill the form</Button>
        </Grid>
      </ThemeProvider>
    );
  };
  
export default HomePage;