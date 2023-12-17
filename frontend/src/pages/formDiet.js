import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

import { getDietFormOptions } from '../apiCalls/getDietFormOptions';
import { ButtonComponent } from "../components/atoms/Button";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';
import { isFormValid } from '../helpers/isFormValid';
import image_diet_form from "../img/diet_form.jpg";
import { validateDietFormFields } from '../validators/dietFormValidator';
import { addDietForm } from '../apiCalls/dietFormPost';

function FormDiet({ setUserStatuses })  {
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
		getDietFormOptions().then((data) => {
			if(data.errorCode === 200){
				setData(data);
				setActivityModes(data.data.activityModes);
				setDietModes(data.data.dietModes);
				setCookingRanges(data.data.cookingRanges)
			}else{
				setFormErrors(prevState => ({
					...prevState,
					["general"]: data.errors[0],
				}))
			}
			
		});
	}, []);

	const handleSendButtonClick = async () => {
		try {
			const response = await addDietForm({ activityMode: activityMode, dietMode: dietMode, cookingRange: cookingRange });
			const [data] = [await response];
			console.log(data);
			if (data.errorCode === 200) {
				setUserStatuses(data.data);
			} else {
				setFormErrors(prevState => ({
					...prevState,
					["general"]: data.errors[0],
				}))
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	//TO DO: Errors show in the form if appears + fix labels
	return (
		<TwoSidesTemplate
		  title={<Typography variant="title1">GENERATING DIET</Typography>}
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
			</>
		  }
		  img={image_diet_form}
		/>
	  );
}

export default FormDiet;