import React from 'react';
import { Typography, Button, Paper, ThemeProvider } from '@mui/material';
import { appTheme } from '../helpers/themeProviderHelper';
import Grid from '@mui/material/Grid';

import { getCurrentUser} from '../helpers/authHelper';

function NotFound() {
	const isAuthenticatedParam = getCurrentUser();
    return (
      <ThemeProvider theme={appTheme}>
				<Grid container component={Paper} 
					sx={{ height: '100vh', 
								border: '15px solid #F8F8FA',
								display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',}}>
          <Typography variant="title1">PAGE NOT FOUND</Typography>
          <Typography variant="subtitle1">{isAuthenticatedParam ? "Such page doesn't exist. Please follow tabs in sidebar" : "Get start with our application with login in"}</Typography>
					<Button href={isAuthenticatedParam ? "/" : "/login" }sx={{mt: '20px', width: '15%'}}>{isAuthenticatedParam ? "Go to main page": "Login"}</Button>
        </Grid>
      </ThemeProvider>
    );
  };
  
export default NotFound;