import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material";
import dayjs from 'dayjs';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getDietData } from '../apiCalls/diet/getDietData.js';
import { requestGenerateFile } from '../apiCalls/diet/requestGenerateFileDiet.js';
import { CalendarControlled } from '../components/atoms/CalendarControlled.js';
import { LabelAndDescription } from '../components/atoms/LabelAndDescription.js';
import { CardComponent } from "../components/moleculas/card.js";
import { CardComponentWithAction } from '../components/moleculas/cardWithAction.js';
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate';
import { MealsEnum } from '../helpers/processStatuses.js';
import image_breakfast from '../img/breakfast.png';
import image_dinner from '../img/dinner.png';
import image_edit_questionnary from "../img/edit_questionnary.png";
import image_lunch from '../img/lunch.png';

function DietFinished() {
	const [userDietData, setUserDietData] = useState({});
	const [userDietDataPerDay, setUserDietDataPerDay] = useState(null);
	const [communicationFileGeneration, setCommunicationFileGeneration] = useState("");
	const [date, setDate] = React.useState(dayjs());
	const [selectedMeal, setSelectedMeal] = useState(null);
	const [selectedMealId, setSelectedMealId] = useState(0);

	useEffect(() => {
		getDietData().then((data) => {
			if (data.errorCode === 200) {
				setUserDietData(data.data);
				setUserDietDataPerDay(data.data.recipes[date.day().toString()]);
			} else {
				setUserDietData({});
				setUserDietDataPerDay(null);
			}
		});
	}, []);

	const handleDate = (value) => {
		setSelectedMeal(null);
		setCommunicationFileGeneration('');
		setDate(value);
		if (userDietData) {
			setUserDietDataPerDay(userDietData.recipes[value.day().toString()]);
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { day: 'numeric', month: 'long' };
		return date.toLocaleDateString('en-US', options);
	};

	const handleCardClick = (mealType) => {
		setCommunicationFileGeneration('');
		setSelectedMealId(MealsEnum[mealType]);
		setSelectedMeal(mealType);
	};

	const handleSendButtonClick = async () => {
		try {
			setCommunicationFileGeneration('');
			const response = await requestGenerateFile();
			const [status, message] = [response.status, await response.text()];
			if (status === 200) {
				setCommunicationFileGeneration(message);
			} else {
				setCommunicationFileGeneration(message);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			{userDietDataPerDay ? (
				<InfoAndCalendarTemplate
					title={selectedMeal ? (<><Button onClick={() => setSelectedMeal(null)}>Back</Button></>)
						: (<Typography gutterBottom variant="title1">{`RATION FOR ${formatDate(date).toUpperCase()}`}</Typography>)}
					bodyItems={
						selectedMeal ? (
							<>
								<Typography variant="title1" sx={{ margin: "20px 0px" }}>{`DETAILS FOR ${selectedMeal}`}</Typography>
								<LabelAndDescription label="Name:" description={userDietDataPerDay[selectedMealId].name}/>
								<LabelAndDescription label="Description:" description={userDietDataPerDay[selectedMealId].description}/>
								<LabelAndDescription label="Calories:" description={userDietDataPerDay[selectedMealId].calories}/>
								<LabelAndDescription label="Carbohydrate:" description={userDietDataPerDay[selectedMealId].carbohydrate}/>
								<LabelAndDescription label="Fat:" description={userDietDataPerDay[selectedMealId].fat}/>
								<LabelAndDescription label="Protein:" description={userDietDataPerDay[selectedMealId].protein}/>
								<LabelAndDescription label="Ingredients:" description={userDietDataPerDay[selectedMealId].ingredientsStr}/>
								{userDietDataPerDay[selectedMealId].comment !== null ?
									<Box>
										<Typography sx={{ mb: "10px" }} variant='subtitle1'>Coach comment:</Typography>
										<Typography variant="comment">{userDietDataPerDay[selectedMealId].comment}</Typography>
									</Box>  :
								<Typography variant="subtitle1" sx={{mt: '30px'}}>No coach's comments yet</Typography>
								}
							</>
						)
							: (
								<>
									<CardComponentWithAction
										title="BREAKFAST"
										subtitle={userDietDataPerDay[0].name}
										image={image_breakfast}
										imageLabel={userDietDataPerDay[0].calories + " Cal"}
										onClickFun={handleCardClick}
									/>
									<CardComponentWithAction
										title="LUNCH"
										subtitle={userDietDataPerDay[2].name}
										image={image_lunch}
										imageLabel={userDietDataPerDay[2].calories + " Cal"}
										onClickFun={handleCardClick}
									/>
									<CardComponentWithAction
										title="DINNER"
										subtitle={userDietDataPerDay[1].name}
										image={image_dinner}
										imageLabel={userDietDataPerDay[1].calories + " Cal"}
										onClickFun={handleCardClick}
									/>
								</>
							)
					}
					footerBody={
						selectedMeal ? (null) : (<CardComponent title="DIET QUESTIONNAIRE" button={
							<Button variant="edit" href="/diet_change">Edit</Button>} image={image_edit_questionnary} />)
					}
					leftUpperPart={<CalendarControlled value={date} changeFunction={handleDate} />}
					leftLowerPart={
						<>
							{communicationFileGeneration ? (<Alert severity="info" >{`${communicationFileGeneration}`}</Alert>) : null}
							<Button sx={{ padding: '2vh 8vh', marginBottom: '20px', maxWidth: '80%'}} onClick={handleSendButtonClick}>GENERATE RECIPE INSTRUCTIONS</Button>
						</>
					}
				/>
			) : <LinearProgress color="success" />}
		</>
	);
}

export default DietFinished;
