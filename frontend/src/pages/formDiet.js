import { InputLabel, MenuItem, Select, Typography} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDietForm } from '../apiCalls/diet/dietFormPost';
import { updateDietForm } from '../apiCalls/diet/dietFormUpdate';
import { getDietFormOptions } from '../apiCalls/diet/getDietFormOptions';
import { getDietFormWithUserChoicesOptions } from '../apiCalls/diet/getDietFormUserOptions';
import { ButtonComponent } from "../components/atoms/Button";
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';
import { isFormValid } from '../helpers/isFormValid';
import image_diet_form from "../img/diet_form.png";
import { validateDietFormFields } from '../validators/dietFormValidator';

function FormDiet({ setUserStatuses, mode }) {
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [activityModes, setActivityModes] = useState([]);
	const [activityMode, setActivityMode] = React.useState('');
	const [dietModes, setDietModes] = useState([]);
	const [dietMode, setDietMode] = React.useState('');
	const [cookingRanges, setCookingRanges] = useState([]);
	const [cookingRange, setCookingRange] = React.useState('');
	const [formErrors, setFormErrors] = useState({ activityMode: "", dietMode: "", cookingRange: "", general: "" });
	const setters = {
		"activityMode": setActivityMode,
		"dietMode": setDietMode,
		"cookingRange": setCookingRange
	}

	const handleChange = event => {
		const { name, value } = event.target;
		setters[name](value);
		let errVal = validateDietFormFields(name, value, activityModes, dietModes, cookingRanges);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}))
	}

	useEffect(() => {
		if (mode === 0) {
			getDietFormOptions().then((data) => {
				if (data.errorCode === 200) {
					setData(data);
					setActivityModes(data.data.activityModes);
					setDietModes(data.data.dietModes);
					setCookingRanges(data.data.cookingRanges)
				} else {
					setFormErrors(prevState => ({
						...prevState,
						["general"]: data.errors[0],
					}))
				}
			});
		}
		else if (mode === 1) {
			getDietFormWithUserChoicesOptions().then((data) => {
				if (data.errorCode === 200) {
					setData(data);
					setActivityModes(data.data.activityModes);
					setDietModes(data.data.dietModes);
					setCookingRanges(data.data.cookingRanges)

					setActivityMode(data.data.activityMode.id);
					setDietMode(data.data.dietMode.id);
					setCookingRange(data.data.cookingRange.id);
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
				const response = await addDietForm({ activityMode: activityMode, dietMode: dietMode, cookingRange: cookingRange });
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
				const response = await updateDietForm({ activityMode: activityMode, dietMode: dietMode, cookingRange: cookingRange });
				const [data] = [await response];
				if (data.errorCode === 200) {
					navigate("/diet");
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
		navigate('/diet')
	};

	return (
		<TwoSidesTemplate
			title={<Typography variant="title1" sx={{ mb: '20px' }}>GENERATING DIET</Typography>}
			body={
				<>
					<InputLabel id="activitylabel">Activity mode</InputLabel>
					<Select
						fullWidth
						labelId="activitylabel"
						id="activityMode"
						name="activityMode"
						value={activityMode}
						onChange={handleChange}
						error={formErrors["activityMode"] !== ""}
						color="success"
						sx={{ marginBottom: "20px" }}
					>
						{activityModes.map((mode) => (
							<MenuItem key={mode.id} value={mode.id}>
								{mode.name}
							</MenuItem>
						))}
					</Select>
					<InputLabel id="dietlabel">Diet mode</InputLabel>
					<Select
						fullWidth
						labelId="dietlabel"
						id="dietMode"
						name="dietMode"
						value={dietMode}
						onChange={handleChange}
						error={formErrors["dietMode"] !== ""}
						color="success"
						sx={{ marginBottom: "20px" }}
					>
						{dietModes.map((mode) => (
							<MenuItem key={mode.id} value={mode.id}>
								{mode.name}
							</MenuItem>
						))}
					</Select>

					<InputLabel id="cookingrangelabel">How long you can cook?</InputLabel>
					<Select
						fullWidth
						labelId="cookingrangelabel"
						id="cookingRange"
						name="cookingRange"
						value={cookingRange}
						onChange={handleChange}
						error={formErrors["cookingRange"] !== ""}
						color="success"
						sx={{ marginBottom: "20px" }}
					>
						{cookingRanges.map((range) => (
							<MenuItem key={range.id} value={range.id}>
								{range.name}
							</MenuItem>
						))}
					</Select>
					<Typography variant="server_error" textAlign="center">
						{formErrors["general"]}
					</Typography>
					<ButtonComponent
						disabled={!isFormValid(formErrors, [activityMode, dietMode, cookingRange])}
						title="Generate"
						onClick={handleSendButtonClick}
					/>
					{mode === 1 ? (
						<ButtonComponent
							variant="change"
							title="Go to diet"
							disabled={false}
							onClick={handleBackButtonClick}
						/>
					) : null}
				</>
			}
			img={image_diet_form}
		/>
	);
}

export default FormDiet;