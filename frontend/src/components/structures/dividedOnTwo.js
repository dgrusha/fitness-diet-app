import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import './structures.css';

const DividedOnTwo = ({ children, photo, photoDesc }) => {
  return (
    <Box className="container">
        <Box className="box">
            <Grid className="grid-outside" container spacing={2}>
                <Grid className="grid-inside" item xs={7}>
                    <Stack className="stack-inside" spacing={2}>
                    {children}
                    </Stack>
                </Grid>
                <Grid className="grid-inside" item xs={5}>
                    {photo && <img className="photo" src={photo} alt={photoDesc} />}
                </Grid>
            </Grid>
        </Box>      
    </Box>
  );
};

export default DividedOnTwo;