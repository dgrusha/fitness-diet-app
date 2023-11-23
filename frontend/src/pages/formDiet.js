import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { getAllergies } from '../apiCalls/formObligatoryAllergies';
import { addObligatoryForm } from '../apiCalls/formObligatoryPost';
import { ButtonComponent } from "../components/atoms/Button";
import InputFieldWithMetric from '../components/atoms/InputFieldWithMetric';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';
import { handleFormResponse } from '../helpers/formVerification';
import { handleNumericInputChange } from '../helpers/inputChanges';
import { isFormValid } from '../helpers/isFormValid';
import image_required_form from "../img/required_form.jpg";
import { validateObligatoryFormFields } from '../validators/formObligatoryValidator';
import { useAppContext } from '../AppContext';

function FormDiet() {
	const navigate = useNavigate();
	const { hasFormHandle } = useAppContext();
	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [years, setYears] = useState('');
	const [allergies, setAllergies] = useState([]);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [formErrors, setFormErrors] = useState({ weight: "", height: "", years: "", general: "" });
	const setters = {
		"weight": setWeight,
		"height": setHeight,
		"years": setYears
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

	useEffect(() => {
		getAllergies().then((data) => setAllergies(data));
	}, []);

	const handleSendButtonClick = async () => {
		try {
			const response = await addObligatoryForm({ weight: weight, height: height, years: years, allergies: selectedOptions });
			const [status, message] = [response.status, await response.text()];
			if (status === 200) {
				hasFormHandle(true);
			} else {
				hasFormHandle(false);
			}
			handleFormResponse(status, message, setFormErrors, navigate, '/');
		} catch (error) {
			console.error(error.message);
		}
	};


	return (
		<TwoSidesTemplate
			title={<Typography variant="title1">GENERATING DIET</Typography>}
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
						inputProps={<InputAdornment position="end">y.o</InputAdornment>}
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
						renderInput={(params) => (
							<TextField
								{...params}
								label="Allergies"
								margin='normal'
							/>
						)}
					/>
					<Typography variant="server_error" textAlign="center">{formErrors["general"]}</Typography>
					<ButtonComponent disabled={!isFormValid(formErrors, [weight, height])} onClick={handleSendButtonClick} title="Send" />
				</>}
			img={image_required_form}
		/>
	);
}

export default FormObligatory;