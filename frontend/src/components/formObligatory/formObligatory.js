import React, { useState, useEffect  } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import './formObligatory.css';
import { getAllergies } from '../../apiCalls/formObligatoryAllergies';

function FormObligatory() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [allergies, setAllergies] = useState([]);

    const handleInputChangeW = (event) => {
      const numericValue = event.target.value.replace(/[^0-9]/g, '');
  
      setWeight(numericValue);
    };

    const handleInputChangeH = (event) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
    
        setHeight(numericValue);
      };

    useEffect(() => {
        getAllergies().then((data) => setAllergies(data));
    }, []);  
    
    
    return (
        <Box className="container">
            <Box className="box">
            <Grid className="grid-outside" container spacing={2}>
                <Grid className="grid-inside" item xs={7}>
                    <Stack className="stack-inside" spacing={2}>
                            <h2>REQUIRED FORM</h2>
                            <TextField
                                label="Weight*"
                                id="weight-field"
                                className= "text-field custom-focused-textfield"
                                InputProps={{
                                startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                }}
                                variant="standard"
                                value={weight}
                                onChange={handleInputChangeW}
                            />
                            <TextField
                                label="Height*"
                                id="weight-field"
                                className= "text-field custom-focused-textfield"
                                InputProps={{
                                startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                }}
                                variant="standard"
                                value={height}
                                onChange={handleInputChangeH}
                            />
                            <Autocomplete
                                multiple
                                id="alergies-choice"
                                className= "text-field custom-focused-textfield"
                                options={allergies} 
                                getOptionLabel={(option) => option.Name}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Allergies"
                                    className= "text-field custom-focused-textfield"
                                />
                                )}
                            />
                            <Button className= "button-send" id="button-send-obligatory-form" variant="outlined">Outlined</Button>
                    </Stack>
                </Grid>
                <Grid className="grid-inside" item xs={5}>
                    <img className = "photo" src="/photo/obligatory_form_jpg_photo_2.jpg" alt="gym photo of man" />
                </Grid>
            </Grid>
                
            </Box>      
        </Box>
        
    );
}

//const testAllergies = [
//    { name: 'Mandarin', val: 1994 },
//    { name: 'Abrozia', val: 1972 },
//    { name: 'HZHZ', val: 1974 },
//]

export default FormObligatory;