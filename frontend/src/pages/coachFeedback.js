import { Alert, Autocomplete, Box, Button, InputAdornment, ThemeProvider, LinearProgress, TextField, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCoachesUsers } from '../apiCalls/coach/getAllUsersOfCoach.js';
import { getDataByCoach } from '../apiCalls/coach/getDataByCoach.js';
import { updateDietDataByCoach } from '../apiCalls/diet/updateDietDataByCoach.js';
import { updateTrainingDataByCoach } from '../apiCalls/training/updateTrainingDataByCoach.js';
import { CalendarControlled } from '../components/atoms/CalendarControlled.js';
import { LabelAndDescription } from '../components/atoms/LabelAndDescription.js';
import { CardComponentWithAction } from '../components/moleculas/cardWithAction.js';
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate';
import { MealsEnum } from '../helpers/processStatuses.js';
import arms from '../img/arms_train.png';
import back from '../img/back_train.png';
import image_breakfast from '../img/breakfast.png';
import chest from '../img/chest_train.png';
import image_dinner from '../img/dinner.png';
import legs from '../img/legs_train.png';
import image_lunch from '../img/lunch.png';
import image_no_diet from '../img/no_diet.svg';
import image_no_training from '../img/no_training.svg';
import shoulder from '../img/shoulder_train.png';
import { validateCoachFeedbackFormFields } from '../validators/coachFeedbackValidator.js';
import { appTheme } from '../helpers/themeProviderHelper';
import { fileNameFromUrl } from '../helpers/photoHelper.js';
const imageMap = {
	"legs": legs,
	"back": back,
	"shoulder": shoulder,
	"chest": chest,
	"arms": arms
};

function CoachesFeedback() {
	const navigate = useNavigate();
	const [date, setDate] = React.useState(dayjs());
	const [dataType, setDataType] = React.useState('diet');
	const [selectedInstance, setSelectedInstance] = useState(null);
	const [selectedMealId, setSelectedMealId] = useState(0);
	const [userData, setUserData] = useState({});
	const [fileTextFieldValues, setFileTextFieldValues] = useState({});
	const [fileValues, setFileValues] = useState({});
	const [userDataPerDay, setUserDataPerDay] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState({});
	const [commentDiet, setCommentDiet] = useState('');
	const [selectedUser, setSelectedUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [formErrors, setFormErrors] = useState({ users: "", dataType: "", general: "" });
	const setters = {
		"dataType": setDataType
	}

	const handleDate = (value) => {
		setFileValues({});
		setFileTextFieldValues({});
		setSelectedInstance(null);
		setDate(value);
		if (userData) {
			if (dataType === 'training' && userData) {
				setUserDataPerDay(userData[value.day().toString()]);
			} else if (dataType === 'diet' && userData["recipes"]) {
				setUserDataPerDay(userData["recipes"][value.day().toString()]);
			}

		}
	};

	useEffect(() => {
		getAllCoachesUsers().then((data) => {
			if (data.errorCode === 200) {
				setAllUsers(data.data);
			} else if (data.errorCode === 424) {
				navigate('/');
			} else {
				setAllUsers({});
			}
		});
	}, []);

	const isOptionEqualToValue = (option, value) => {
		return option.Mail === value.Mail;
	};

	const handleChange = event => {
		setFileValues({});
		setFileTextFieldValues({});
		setSelectedInstance(null);
		const { name, value } = event.target;
		setters[name](value);
		let errVal = validateCoachFeedbackFormFields(name, value, allUsers);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}))
		if (selectedUser && value) {
			getDataByCoach({ userId: selectedUser.id, dataType: value }).then((data) => {
				if (data.errorCode === 200) {
					setUserData(data.data);
					if (value === "diet") {
						setUserDataPerDay(data.data.recipes[date.day().toString()]);
					} else if (value === "training") {
						setUserDataPerDay(data.data[date.day().toString()]);
					}
				} else if (data.errorCode === 424) {
					navigate('/');
				} else {
					setUserData({});
					setUserDataPerDay(null);
					setFormErrors(prevState => ({
						...prevState,
						["general"]: data.errors[0],
					}))
				}
			});
		}
	};

	const handleChangeUser = (event, newValue) => {
		setFileValues({});
		setFileTextFieldValues({});
		setSelectedInstance(null);
		let errVal = validateCoachFeedbackFormFields("users", newValue, allUsers);
		setFormErrors(prevState => ({
			...prevState,
			["users"]: errVal,
			["general"]: "",
		}))
		setSelectedUser(newValue);
		if (newValue && dataType) {
			getDataByCoach({ userId: newValue.id, dataType: dataType }).then((data) => {
				if (data.errorCode === 200) {
					setUserData(data.data);
					if (dataType === "diet") {
						setUserDataPerDay(data.data.recipes[date.day().toString()]);
					} else if (dataType === "training") {
						setUserDataPerDay(data.data[date.day().toString()]);
					}
				} else if (data.errorCode === 424) {
					navigate('/');
				} else {
					setUserData({});
					setUserDataPerDay(null);
					setFormErrors(prevState => ({
						...prevState,
						["general"]: data.errors[0],
					}))
				}
			});
		}
	};

	const handleCardClickTraining = (partType) => {
		setSelectedInstance(partType.split(" ")[0].toLowerCase());
	};

	const handleCardClickDiet = (mealType) => {
		setSelectedMealId(MealsEnum[mealType]);
		setSelectedInstance(mealType);
	};

	const updateSelectedMeal = async () => {
		setIsSubmitting((prevLoadingStatus) => ({
			...prevLoadingStatus,
			["meal"]: true,
		}));
		setUserDataPerDay({
			...userDataPerDay,
			[selectedMealId]: {
				...userDataPerDay[selectedMealId]
			},
		});
		const response = await updateDietDataByCoach({ recipeId: userDataPerDay[selectedMealId].id, userId: selectedUser.id, text: userDataPerDay[selectedMealId].comment });
		const [status, message] = [response.status, await response.text()];
		setIsSubmitting((prevLoadingStatus) => ({
			...prevLoadingStatus,
			["meal"]: false,
		}));
		console.log(message);
	};

	const handleCommentChange = (instance, index, value) => {
		const updatedUserDataPerDay = { ...userDataPerDay };
		updatedUserDataPerDay[instance][index].comment = value;
		setUserDataPerDay(updatedUserDataPerDay);
	};

	const handleCommentDietChange = ( index, value) => {
		const updatedUserDataPerDay = { ...userDataPerDay };
		updatedUserDataPerDay[index].comment = value;
		setUserDataPerDay(updatedUserDataPerDay);
	};

	const handleTrainingCommentUpdate = async (instance, index) => {
		setIsSubmitting((prevLoadingStatus) => ({
			...prevLoadingStatus,
			[index]: true,
		}));
		const updatedUserDataPerDay = { ...userDataPerDay };
		try {
			const response = await updateTrainingDataByCoach({
				exerciseId: updatedUserDataPerDay[instance][index].id,
				userId: selectedUser.id,
				text: updatedUserDataPerDay[instance][index].comment,
				file: fileValues[index],
			});
			const message = await response.text();
			console.log(message);
		} catch (error) {
			console.error('Error updating training data:', error);
		} finally {
			setIsSubmitting((prevLoadingStatus) => ({
				...prevLoadingStatus,
				[index]: false,
			}));
		}
	};

	const handleTextFieldClick = (index) => {
		document.getElementById(`hidden-file-input${index}`).click();
	};

	const handleFileChange = (instance, event, index) => {
		const file = event.target.files[0];
		if (file) {
			setFileValues({ ...fileValues, [index]: file });
			setFileTextFieldValues({ ...fileTextFieldValues, [index]: file.name });
			const updatedUserDataPerDay = { ...userDataPerDay };
			updatedUserDataPerDay[instance][index].fileName = file.name;
			setUserDataPerDay(updatedUserDataPerDay);
		}
	};

	const renderBodyContent = ({ dataType }) => {
		if (dataType === 'training') {
			if (selectedInstance) {
				return (
					<>
						<Typography variant="title1" sx={{ margin: "20px 0px" }}>{`${dataType.toUpperCase()} DETAILS FOR ${selectedInstance.toUpperCase()}`}</Typography>
						{userDataPerDay[selectedInstance] && userDataPerDay[selectedInstance].map((training, index) => (
							<div key={training.name} sx={{ display: 'block', mb: "50px" }}>
								<Typography variant="exercise">{`${index + 1}. ${training.name}`}</Typography>
								<Typography variant="muscule">{`Muscle: ${training.muscle}`}</Typography>
								<Typography variant="body1">{training.instructions}</Typography>
								<TextField
									label="Coaches Comment"
									variant="outlined"
									fullWidth
									multiline
									style={{ marginTop: '16px' }}
									value={training.comment !== 'null' && training.comment !== 'undefined' && training.comment !== null ? training.comment : ''}
									onChange={(e) => handleCommentChange(selectedInstance, index, e.target.value)}
								/>
								<input
									type="file"
									id={`hidden-file-input${index}`}
									style={{ display: 'none' }}
									onChange={(e) => handleFileChange(selectedInstance, e, index)}
								/>
								<TextField
									id={`file-textfield${index}`}
									fullWidth
									sx={{ mt: 2 }}
									variant="outlined"
									label="Exercise plan for client"
									value={fileTextFieldValues[index] ? fileTextFieldValues[index] : fileNameFromUrl(training.fileName)}
									onClick={() => handleTextFieldClick(index)}
									InputLabelProps={{
										shrink:  fileTextFieldValues[index] ? fileTextFieldValues[index] : fileNameFromUrl(training.fileName),
									}}
									InputProps={{
										readOnly: true,
										endAdornment: (
											<InputAdornment position="end">
												<Button>Browse</Button>
											</InputAdornment>
										),
										style: {
											cursor: 'pointer',
											textAlign: 'center'
										},
									}}
								/>
								{isSubmitting[index] && <LinearProgress color="success" sx={{mt: "10px"}}/>}
								<Button
									variant="contained"
									onClick={() => handleTrainingCommentUpdate(selectedInstance, index)}
									style={{ marginTop: '16px', marginBottom: '16px' }}>
									Save changes
								</Button>
								<br />
							</div>
						))}
					</>
				);
			} else {
				return (
					userDataPerDay ? (
						Object.keys(userDataPerDay).map((key) => (
							<CardComponentWithAction
								key={key}
								title={key.toUpperCase() + " " + dataType.toUpperCase()}
								image={imageMap[key]}
								onClickFun={handleCardClickTraining}
							/>
						))
					) : (
						<Box sx={{ marginTop: "160px" }}>
							<img style={{ height: "50%", width: "30%", display: "block", margin: "10px auto" }} src={image_no_training} alt="No training photo" />
							<Typography gutterBottom variant="subtitle1" sx={{ textAlign: "center" }}>There is no training today ;) </Typography>
						</Box>
					)
				);
			}
		} else if (dataType === 'diet') {
			if (selectedInstance) {
				if (userDataPerDay) {
					const selectedMeal = userDataPerDay[selectedMealId];
					return selectedMeal ? (
						<>
							<Typography variant="title1" sx={{ margin: "20px 0px" }}>{`DETAILS FOR ${selectedInstance.toUpperCase()}`}</Typography>
							<LabelAndDescription label="Name:         " description={selectedMeal.name}/>
							<LabelAndDescription label="Description:  " description={selectedMeal.description}/>
							<LabelAndDescription label="Calories:     " description={selectedMeal.calories}/>
							<LabelAndDescription label="Carbohydrate: " description={selectedMeal.carbohydrate}/>
							<LabelAndDescription label="Fat:          " description={selectedMeal.fat}/>
							<LabelAndDescription label="Protein:      " description={selectedMeal.protein}/>
							<LabelAndDescription label="Ingredients:  " description={selectedMeal.ingredientsStr}/>
							<TextField
								label="Coach's Comment"
								variant="outlined"
								fullWidth
								style={{ marginTop: '16px' }}
								multiline
								value={selectedMeal.comment}
								onChange={(e) => handleCommentDietChange(selectedMealId, e.target.value)}
							/>
							{isSubmitting["meal"] && <LinearProgress color="success" sx={{mt: "10px"}}/>}
							<Button variant="contained" disabled={selectedMeal.comment === commentDiet} style={{ marginTop: '16px' }} onClick={updateSelectedMeal}>
								Save Comment
							</Button>
						</>
					) : null;
				} 
			} else {
				return (userDataPerDay && userDataPerDay[0] ? (<>
					<CardComponentWithAction
						title="BREAKFAST"
						subtitle={userDataPerDay[0].name}
						image={image_breakfast}
						imageLabel={userDataPerDay[0].calories + " Cal"}
						onClickFun={handleCardClickDiet}
					/>
					<CardComponentWithAction
						title="LUNCH"
						subtitle={userDataPerDay[2].name}
						image={image_lunch}
						imageLabel={userDataPerDay[2].calories + " Cal"}
						onClickFun={handleCardClickDiet}
					/>
					<CardComponentWithAction
						title="DINNER"
						subtitle={userDataPerDay[1].name}
						image={image_dinner}
						imageLabel={userDataPerDay[1].calories + " Cal"}
						onClickFun={handleCardClickDiet}
					/>
				</>) : (
						<Box sx={{ marginTop: "160px" }}>
							<img style={{ height: "50%", width: "30%", display: "block", margin: "10px auto" }} src={image_no_diet} alt="No diet photo" />
							<Typography gutterBottom variant="subtitle1" sx={{ textAlign: "center" }}>There is no diet yet ;) </Typography>
						</Box>));
			}
		}
	};

	return (
		<ThemeProvider theme={appTheme}>
		<InfoAndCalendarTemplate
			title={selectedInstance ? (<><Button onClick={() => { setSelectedInstance(null); setSelectedMealId(0); setCommentDiet(''); }}>Back</Button></>)
				: (<Typography gutterBottom variant="title1">CLIENT MANAGEMENT</Typography>)}
			bodyItems={
				renderBodyContent({ dataType: dataType })
			}
			footerBody={formErrors["general"] !== "" ? <Alert severity='warning'>{formErrors["general"]}</Alert> : <></>}
			leftUpperPart={
				<>
					<Autocomplete
						options={allUsers}
						name="users"
						getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
						value={selectedUser}
						isOptionEqualToValue={isOptionEqualToValue}
						onChange={handleChangeUser}
						sx={{width: "80%", mt: "20px", background: 'white'}}
						renderOption={(props, option) => (
							<Box component="li"  {...props}>
								{option.firstName + " " + option.lastName}
							</Box>
						)}
						renderInput={(params) => (
							<TextField
								{...params}
								name="users"
								label="Search client"
								variant="outlined"
								sx={appTheme.autocomplete}
							/>
						)}
						disableClearable
					/>
					<CalendarControlled value={date} changeFunction={handleDate} />
				</>}
			leftLowerPart={
				<ToggleButtonGroup
					value={dataType}
					exclusive
					fullWidth
					onChange={handleChange}
					name="dataType"
					aria-label="Data type"
					sx={{width: "80%", mb: "20px"}}
				>
					<ToggleButton name="dataType" value="diet">Diet</ToggleButton>
					<ToggleButton name="dataType" value="training">Training</ToggleButton>
				</ToggleButtonGroup>
			}
		/>
	</ThemeProvider>
	);
}

export default CoachesFeedback;