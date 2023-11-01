import React from 'react';
import { Typography, Container, Box, Paper, ThemeProvider } from '@mui/material';
import { mainPageTheme } from './mainPageTheme';

import { useState } from 'react';

function MainPage() {
    const [photo, setPhoto] = useState(process.env.PUBLIC_URL + '/photo/main_page_illustration.jpg');

    return (
      <ThemeProvider theme={mainPageTheme}>
        <Container component="main" className="main-page-container">
          <Paper elevation={3}>
            
            <Box mt={3}>
              <img style={{height:"40%", width:"40%"}} className="photoPage" src={photo} alt="Main page photo" />
              <Typography variant="h6">Main page</Typography>
              <Typography variant="subtitle1">We hope you like using our app :)</Typography>
            </Box>
          </Paper>
        </Container>
      </ThemeProvider>
    );
  };
  
export default MainPage;