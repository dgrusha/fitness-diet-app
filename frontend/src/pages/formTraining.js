import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { ButtonComponent } from "../components/atoms/Button";
import { Button } from '@mui/material';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';
import { isFormValid } from '../helpers/isFormValid';
import image_diet_form from "../img/training_form.png";
import Slider from '@mui/material/Slider';
import { getTrainingFormOptions } from '../apiCalls/getTrainingFormOptions';
import { validateTrainingFormFields } from '../validators/trainingFormValidator';
import { addTrainingForm } from '../apiCalls/trainingFormPost';
import { updateTrainingForm } from '../apiCalls/trainingFormUpdate';
import { getTrainingFormWithUserChoicesOptions } from '../apiCalls/getTrainingFormUserOptions';

function FormTraining({ setUserStatuses, mode }) {
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [trainingModes, setTrainingModes] = useState([]);
	const [trainingMode, setTrainingMode] = React.useState('');
	const [days, setDays] = useState(3);
	const [formErrors, setFormErrors] = useState({ trainingMode: "", days: "", general: "" });
	const setters = {
		"trainingMode": setTrainingMode,
		"days": setDays
	}

	const handleChange = event => {
		const { name, value } = event.target;
		setters[name](value);
		let errVal = validateTrainingFormFields(name, value, trainingModes);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}))
	}

	useEffect(() => {
		if (mode === 0) {
			getTrainingFormOptions().then((data) => {
				if (data.errorCode === 200) {
					setData(data);
					setTrainingModes(data.data.trainingModes);
				} else {
					setFormErrors(prevState => ({
						...prevState,
						["general"]: data.errors[0],
					}))
				}

			});
		}
		else if (mode === 1) {
			getTrainingFormWithUserChoicesOptions().then((data) => {
				if (data.errorCode === 200) {
					setData(data);
					setTrainingModes(data.data.trainingModes);

					setTrainingMode(data.data.trainingMode.id);
					setDays(data.data.days);
				} else if (data.errorCode === 424) {
					console.log(data);
					navigate("/");
				} else {
					setFormErrors(prevState => ({
						...prevState,
						["general"]: data.errors[0],
					}))
				}

			});
		}
	}, []);

	const handleSendButtonClick = async () => {
		try {
			if (mode === 0) {
				const response = await addTrainingForm({ trainingMode: trainingMode, days: days });
				const [data] = [await response];
				if (data.errorCode === 200) {
					setUserStatuses(data.data);
				} else {
					setFormErrors(prevState => ({
						...prevState,
						["general"]: data.errors[0],
					}))
				}
			} else if (mode === 1) {
				const response = await updateTrainingForm({ trainingMode: trainingMode, days: days });
				const [data] = [await response];
				if (data.errorCode === 200) {
					navigate("/training");
				} else {
					setFormErrors(prevState => ({
						...prevState,
						["general"]: data.errors[0],
					}))
				}
			}

		} catch (error) {
			console.error(error.message);
		}
	};

	const handleBackButtonClick = async () => {
		navigate('/training')
	};

	return (
		<TwoSidesTemplate
			title={<Typography variant="title1" sx={{ mb: '20px' }}>GENERATING TRAINING</Typography>}
			body={
				<>
					<InputLabel id="trainingModelabel">Training mode</InputLabel>
					<Select
						fullWidth
						labelId="trainingModelabel"
						label="Training mode"
						id="trainingMode"
						name="trainingMode"
						value={trainingMode}
						onChange={handleChange}
						error={formErrors["trainingMode"] !== ""}
						sx={{ marginBottom: "20px" }}
					>
						{trainingModes.map((mode) => (
							<MenuItem key={mode.id} value={mode.id}>
								{mode.name.charAt(0).toUpperCase() + mode.name.slice(1)}
							</MenuItem>
						))}
					</Select>
					<InputLabel id="dayslabel">Days to train weekly</InputLabel>
					<Slider
						id="days"
						name="days"
						value={days}
						onChange={handleChange}
						aria-labelledby="input-slider"
						valueLabelDisplay="auto"
						step={1}
						marks
						min={1}
						max={5}
					/>
					<Typography variant="server_error" textAlign="center">
						{formErrors["general"]}
					</Typography>
					<ButtonComponent
						disabled={!isFormValid(formErrors, [trainingMode, days])}
						title="Generate"
						onClick={handleSendButtonClick}
					/>
					{mode === 1 ? (
						<Button
							variant="change"
							fullWidth
							disabled={false}
							onClick={handleBackButtonClick}
						>Go to training</Button>
					) : null}
				</>
			}
			img={image_diet_form}
		/>
	);
}

export default FormTraining;