import React from 'react';
import { Typography, Button, Paper, ThemeProvider } from '@mui/material';
import { appTheme } from '../helpers/themeProviderHelper';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import {LinearProgress} from '@mui/material';

function PreparingProcess({ mode }) {
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
          <Typography variant="title1">We are preparing a {mode} for you!</Typography>
        </Grid>
      </ThemeProvider>
    );
  };
  
export default PreparingProcess;