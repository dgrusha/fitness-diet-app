import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Box, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup,
	 TextField, Typography} from '@mui/material';
import { getAllergies } from '../apiCalls/obligatoryForm/formObligatoryAllergies';
import { addObligatoryForm } from '../apiCalls/obligatoryForm/formObligatoryPost';
import { ButtonComponent } from "../components/atoms/Button";
import InputFieldWithMetric from '../components/atoms/InputFieldWithMetric';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';
import { handleFormResponse } from '../helpers/formVerification';
import { handleNumericInputChange } from '../helpers/inputChanges';
import { isFormValid } from '../helpers/isFormValid';
import image_required_form from "../img/required_form.png";
import { validateObligatoryFormFields } from '../validators/formObligatoryValidator';
import { useAppContext } from '../AppContext';

function FormObligatory() {
	const navigate = useNavigate();
	const { setHasForm } = useAppContext();
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [years, setYears] = useState('');
	const [gender, setGender] = useState('');
	const [allergies, setAllergies] = useState([]);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [formErrors, setFormErrors] = useState({ weight: "", height: "", years: "", gender: "", general: "" });
	const setters = {
		"weight": setWeight,
		"height": setHeight,
		"years": setYears,
		"gender": setGender
	}

	const handleChange = event => {
		const { name, value } = event.target;
		handleNumericInputChange(event, setters[name]);
		let errVal = validateObligatoryFormFields(name, value);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}))
	}

	const handleChangeMultiple = (event, value) => {
		setSelectedOptions(value);
	};

	const handleChangeRadio = (event, value) => {
		setGender(value);
	};

	useEffect(() => {
		getAllergies().then((data) => setAllergies(data));
	}, []);

	const handleSendButtonClick = async () => {
		try {
			const response = await addObligatoryForm({ weight: weight, height: height, years: years, gender: gender, allergies: selectedOptions });
			const [status, message] = [response.status, await response.text()];
			if (status === 200) {
				setHasForm(true);
			}
			handleFormResponse(status, message, setFormErrors, navigate, '/');
		} catch (error) {
			console.error(error.message);
		}
	};


	return (
		<TwoSidesTemplate
			title={<Typography variant="title1">REQUIRED FORM</Typography>}
			body={
				<>
					<InputFieldWithMetric
						label="Weight"
						id="weight-field"
						name="weight"
						inputProps={<InputAdornment position="end">kg</InputAdornment>}
						value={weight}
						onChange={handleChange}
						error={formErrors["weight"] !== ""}
						helperText={formErrors["weight"]}
					/>
					<InputFieldWithMetric
						label="Height"
						id="height-field"
						name="height"
						inputProps={<InputAdornment position="end">cm</InputAdornment>}
						value={height}
						onChange={handleChange}
						error={formErrors["height"] !== ""}
						helperText={formErrors["height"]}
					/>
					<InputFieldWithMetric
						label="Years"
						id="years-field"
						name="years"
						inputProps={<InputAdornment position="end">y.o.</InputAdornment>}
						value={years}
						onChange={handleChange}
						error={formErrors["years"] !== ""}
						helperText={formErrors["years"]}
					/>
					<Autocomplete
						multiple
						id="alergies-choice"
						name="allergies"
						options={allergies}
						getOptionLabel={(option) => option}
						onChange={handleChangeMultiple}
						renderOption={(props, option) => (
							<Box component="li" {...props}
							sx={{
									backgroundColor: 
										selectedOptions.includes(option)? "#E1F3BA !important" : '#ffffff',
									'&:hover': {
										backgroundColor:
										selectedOptions.includes(option)
												? "#CADAA7 !important"
												: "#F6FBEA !important"
									},
								}
							}
							>
								{option}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Allergies"
								margin='normal'
							/>
						)}
					/>
					<FormControl component="fieldset" sx={{ mt: 2 }}>
						<FormLabel component="legend">Gender</FormLabel>
						<RadioGroup row aria-label="gender" name="gender" value={gender} onChange={handleChangeRadio}>
							<FormControlLabel value="male" control={<Radio  color="success"/>} label="Male" />
							<FormControlLabel value="female" control={<Radio  color="success"/>} label="Female" />
						</RadioGroup>
					</FormControl>
					<Typography variant="server_error" textAlign="center">{formErrors["general"]}</Typography>
					<ButtonComponent disabled={!isFormValid(formErrors, [weight, height, years, gender])} onClick={handleSendButtonClick} title="Send" />
				</>}
			img={image_required_form}
		/>
	);
}

export default FormObligatory;