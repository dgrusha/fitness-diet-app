import React, { useState, useEffect  } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import './formObligatory.css';
import { getAllergies } from '../../apiCalls/formObligatoryAllergies';
import { addObligatoryForm } from '../../apiCalls/formObligatoryPost';
import { handleNumericInputChange } from '../../helpers/inputChanges';
import DividedOnTwo from '../structures/dividedOnTwo';

function FormObligatory() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [allergies, setAllergies] = useState([]);
    const formPhoto = '/photo/obligatory_form_jpg_photo_2.jpg';

    const handleInputChangeW = (event) => {
        handleNumericInputChange(event, setWeight);
    };

    const handleInputChangeH = (event) => {
        handleNumericInputChange(event, setHeight);
    };

    useEffect(() => {
        getAllergies().then((data) => setAllergies(data));
    }, []);  

    const handleSendButtonClick = async () => {
        try {
          const responseData = await addObligatoryForm({ weight, height, allergies });
          console.log('Form submitted successfully:', responseData);
        } catch (error) {
          console.error(error.message);
        }
      };
    
    
    return (
        <DividedOnTwo photo={formPhoto} photoDesc={"Gym training guy"}>
            <>
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
                    id="height-field"
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
                <Button className= "button-send" id="button-send-obligatory-form" variant="outlined" onClick={handleSendButtonClick}>Send</Button>
            </>
        </DividedOnTwo>
    );
}

export default FormObligatory;