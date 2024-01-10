import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Typography, Box, Alert, LinearProgress } from "@mui/material";
import { CalendarControlled } from '../components/atoms/CalendarControlled.js';
import { CardComponent } from "../components/moleculas/card.js";
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate.js';
import image_edit_questionnary from "../img/edit_questionnary.png";
import legs from '../img/legs_train.png';
import back from '../img/back_train.png';
import shoulder from '../img/shoulder_train.png';
import chest from '../img/chest_train.png';
import arms from '../img/arms_train.png';
import dayjs from 'dayjs';
import { getTrainingData } from '../apiCalls/training/getTrainingData.js';
import { CardComponentWithAction } from '../components/moleculas/cardWithAction.js';
import { requestGenerateFile } from '../apiCalls/training/requestGenerateFileTraining.js';
import image_no_training from '../img/no_training.svg';


function TrainingFinished() {
	const [date, setDate] = React.useState(dayjs());
	const [userTrainingData, setUserTrainingData] = useState({});
	const [userTrainingDataPerDay, setUserTrainingDataPerDay] = useState(null);
	const [communicationFileGeneration, setCommunicationFileGeneration] = useState("");
	const [selectedPart, setSelectedPart] = useState(null);
	const [loading, setLoading] = useState(false);
	const imageMap = {
		"legs": legs,
		"back": back,
		"shoulder": shoulder,
		"chest": chest,
		"arms": arms
	};

	useEffect(() => {
		getTrainingData().then((data) => {
			if (data.errorCode === 200) {
				setUserTrainingData(data.data);
				setUserTrainingDataPerDay(data.data[date.day().toString()]);
			} else {
				setUserTrainingData({});
				setUserTrainingDataPerDay(null);
			}
		});
	}, [date]);

	const handleCardClick = (partType) => {
		setCommunicationFileGeneration('');
		setSelectedPart(partType.split(" ")[0].toLowerCase());
	};

	const handleDate = (value) => {
		setSelectedPart(null);
		setCommunicationFileGeneration('');
		setDate(value);
		if (userTrainingData) {
			setUserTrainingDataPerDay(userTrainingData[value.day().toString()]);
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { day: 'numeric', month: 'long' };
		return date.toLocaleDateString('en-US', options);
	};

	const handleSendButtonClick = async () => {
		setLoading(true);
		try {
			setCommunicationFileGeneration('');
			const response = await requestGenerateFile();
			const [status, message] = [response.status, await response.text()];
			if (status === 200) {
				setCommunicationFileGeneration(message);
			} else {
				setCommunicationFileGeneration(message);
			}
			setLoading(false);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
			<InfoAndCalendarTemplate
				title={selectedPart ? (<><Button onClick={() => setSelectedPart(null)}>Back</Button></>)
					: (<Typography gutterBottom variant="title1">{`TRAINING FOR ${formatDate(date).toUpperCase()}`}</Typography>)}
				bodyItems={
					selectedPart ? (
						<>
							<Typography variant="title1" sx={{ margin: "20px 0px" }}>{`TRAINING DETAILS FOR ${selectedPart.toUpperCase()}`}</Typography>
							{userTrainingDataPerDay[selectedPart] && userTrainingDataPerDay[selectedPart].map((training, index) => (
								<Box key={index} sx={{ marginBottom: "25px" }}>
									<Typography variant="exercise">{`${index + 1}. ${training.name}`}</Typography>
									<Typography variant="muscule">{`Muscle: ${training.muscle}`}</Typography>
									<Typography variant="body1">{training.instructions}</Typography>
									<Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px" }}>
										{training.comment !== null ?
											<Box>
												<Typography sx={{ mb: "10px" }} variant='subtitle1'>Coach comment:</Typography>
												<Typography variant="comment">{training.comment}</Typography>
											</Box> :
											<Typography variant="subtitle1" sx={{mt: '10px'}}>No coach's comments yet</Typography>}
										{training.fileName ? (
											<Button href={training.fileName}>Coach file open</Button>
										) : null}
									</Box>
								</Box>
							))}
						</>
					) :
					
					(userTrainingDataPerDay ? (
					
						Object.keys(userTrainingDataPerDay).map((key) => (
								<CardComponentWithAction
									key={key}
									title={key.toUpperCase() + " TRAINING"}
									image={imageMap[key]}
									onClickFun={handleCardClick}
								/>
							))
						) : (
							<Box sx={{ marginTop: "40px" }}>
								<img style={{ height: "50%", width: "30%", display: "block", margin: "10px auto" }} src={image_no_training} alt="No training photo" />
								<Typography gutterBottom variant="subtitle1" sx={{ textAlign: "center" }}>Today you have some chill time ;) </Typography>
							</Box>
						)
					)
				}
				footerBody={
					selectedPart ? (null ) : (<CardComponent title="TRAIN QUESTIONNAIRE" button={
							<Button variant="edit" href="/training_change">Edit</Button>} image={image_edit_questionnary} />)
				}
				leftUpperPart={<CalendarControlled value={date} changeFunction={handleDate} />}
				leftLowerPart={
					<>
						{communicationFileGeneration ? (<Alert severity="warning" >{`${communicationFileGeneration}`}</Alert>) : null}
						{loading === true ? <LinearProgress color="success" />: <></>}
						<Button sx={{ padding: '2vh 8vh', marginBottom: '20px', width: '80%'}} onClick={handleSendButtonClick}>GENERATE TRAIN FILE</Button>
					</>
				}
			/>
	);
}

export default TrainingFinished;
