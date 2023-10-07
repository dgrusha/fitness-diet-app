import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

import './formObligatory.css';
import { getAllergies } from '../../apiCalls/formObligatoryAllergies';
import { addObligatoryForm } from '../../apiCalls/formObligatoryPost';
import { handleNumericInputChange } from '../../helpers/inputChanges';
import { isFormValid } from '../../helpers/isFormValid';
import { handleFormResponse } from  '../../helpers/formVerification' 
import {validateObligatoryFormFields} from '../../validators/formObligatoryValidator'
import DividedOnTwo from '../structures/dividedOnTwo';

function FormObligatory() {
    const navigate = useNavigate();
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [allergies, setAllergies] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [formErrors, setFormErrors] = useState({ weight:"", height:"", general:""});
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
            [name]: errVal,
            ["general"]: "",
        }))
    }

    const handleChangeMultiple = (event, value) => {
        setSelectedOptions(value);
    };

    useEffect(() => {
        getAllergies().then((data) => setAllergies(data));
    }, []);  

    const handleSendButtonClick = async () => {
        try {
            const response = await addObligatoryForm({ weight: weight, height: height, allergies: selectedOptions});
            const [status, message] = [response.status, await response.text()];
            handleFormResponse(status, message, setFormErrors, navigate, '/' );
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
                    className="text-field custom-focused-textfield"
                    name="allergies"
                    options={allergies}
                    getOptionLabel={(option) => option}
                    onChange={handleChangeMultiple}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Allergies"
                            className="text-field custom-focused-textfield"
                        />
                    )}
                />
                <Button disabled={!isFormValid(formErrors, [weight, height])} className="button-send" id="button-send-obligatory-form" variant="outlined" onClick={handleSendButtonClick}>Send</Button>
                <p>{formErrors["general"]}</p>
            </>
        </DividedOnTwo>
    );
}

export default FormObligatory;