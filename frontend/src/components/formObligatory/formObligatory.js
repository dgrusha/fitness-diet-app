import React, { useState, useEffect  } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import './formObligatory.css';
import { getAllergies } from '../../apiCalls/formObligatoryAllergies';
import { addObligatoryForm } from '../../apiCalls/formObligatoryPost';
import { handleNumericInputChange } from '../../helpers/inputChanges';
import { isFormValid } from '../../helpers/isFormValid';
import {validateObligatoryFormFields} from '../../validators/formObligatoryValidator'
import DividedOnTwo from '../structures/dividedOnTwo';

function FormObligatory() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [allergies, setAllergies] = useState([]);
    const [formErrors, setFormErrors] = useState({ weight:"", height:""});
    const formPhoto = '/photo/obligatory_form_jpg_photo_2.jpg';
    const setters = {
        "weight": setWeight,
        "height": setHeight
    }

    const handleChange = event => {
        const {name, value} = event.target;
        handleNumericInputChange(event, setters[name]);
        let errVal = validateObligatoryFormFields(name,value);
        setFormErrors(prevState => ({
            ...prevState,
            [name]: errVal
        }))
    }

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
                    label="Weight"
                    required
                    id="weight-field"
                    className= "text-field custom-focused-textfield"
                    name = "weight"
                    InputProps={{
                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                    }}
                    variant="standard"
                    value={weight}
                    onChange={handleChange}
                />
                <p>{formErrors["weight"]}</p>
                <TextField
                    label="Height"
                    required
                    id="height-field"
                    className= "text-field custom-focused-textfield"
                    name = "height"
                    InputProps={{
                    startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                    }}
                    variant="standard"
                    value={height}
                    onChange={handleChange}
                />
                <p>{formErrors["height"]}</p>
                <Autocomplete
                    multiple
                    id="alergies-choice"
                    className= "text-field custom-focused-textfield"
                    options={allergies} 
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Allergies"
                        className= "text-field custom-focused-textfield"
                    />
                    )}
                />
                <Button disabled={!isFormValid(formErrors)} className="button-send" id="button-send-obligatory-form" variant="outlined" onClick={handleSendButtonClick}>Send</Button>
            </>
        </DividedOnTwo>
    );
}

export default FormObligatory;