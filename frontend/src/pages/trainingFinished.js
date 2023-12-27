import * as React from 'react';

import { useEffect, useState }  from 'react';
import { Button, Modal } from "@mui/material";
import Typography from '@mui/material/Typography';
import { CalendarControlled } from '../components/atoms/CalendarControlled.js';
import { CardComponent } from "../components/moleculas/card.js";
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate.js';
import image_edit_questionnary from "../img/edit_questionnary.png";
import image_stretching from '../img/streching.svg';
import dayjs from 'dayjs';
import { getTrainingData } from '../apiCalls/getTrainingData.js';
import LinearProgress from '@mui/material/LinearProgress';
import { CardComponentWithAction } from '../components/moleculas/cardWithAction.js';


function TrainingFinished() {
	const [date, setDate] = React.useState(dayjs());
	const [userTrainingData, setUserTrainingData] = useState({});
    const [userTrainingDataPerDay, setUserTrainingDataPerDay] = useState(null);
	const [communicationFileGeneration, setCommunicationFileGeneration] = useState("");
	const [selectedPart, setSelectedPart] = useState(null);

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
	}, []);

	const handleCardClick = (partType) => {
        setCommunicationFileGeneration('');
        setSelectedPart(partType.split(" ")[0].toLowerCase());
    };

	const handleCloseModal = () => {
        setCommunicationFileGeneration('');
        setSelectedPart(null);
    };

	const handleDate = (value) => {
        setCommunicationFileGeneration('');
        setDate(value);
        if(userTrainingData){
            setUserTrainingDataPerDay(userTrainingData[value.day().toString()]);
        }
	};

	return (
		<>
			<InfoAndCalendarTemplate
				title={<Typography gutterBottom variant="title1">Training for today</Typography>}
				bodyItems={
					userTrainingDataPerDay ? (
					Object.keys(userTrainingDataPerDay).map((key) => (
						<CardComponentWithAction
							key={key}
							title={key.charAt(0).toUpperCase() + key.slice(1) + " Training"}
							image={image_stretching}
							onClickFun= {handleCardClick}
						/>
					))
				) : (
					<Typography gutterBottom variant="subtitle1">Today you have some chill time ;) </Typography>
				)

				}
				footerBody={<CardComponent title="Training questionnaires" button={
					<Button href="/training_change">Edit</Button>
				} image={image_edit_questionnary}/> }
				leftUpperPart={<CalendarControlled value={date} changeFunction={handleDate} />}
				leftLowerPart={<Button sx={{padding: '3vh 15vh', marginBottom: '20px'}}>GENERATE TRAINING PLAN</Button>}
			/>
			{userTrainingDataPerDay ? (
                <Modal
                    open={selectedPart !== null}
                    onClose={handleCloseModal}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#FAFAFA',
                            padding: '20px',
                            border: '2px solid #6D9712',
                            borderRadius: '10px',
                            width: '50%',
                            height: '50%',
							overflowY: 'auto',
                        }}
                    >
                        <Typography variant="h5">{`Training details for ${selectedPart}`}</Typography>

						{userTrainingDataPerDay[selectedPart] && userTrainingDataPerDay[selectedPart].map((training, index) => (
							<div key={training.name}>
								<Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">{`${index + 1}. ${training.name}`}</Typography>
								<Typography variant="body1">{`Muscle: ${training.muscle}`}</Typography>
								<Typography variant="body1">{`Coaches comment: ${training.comment !== null 
                        		? training.comment : 'No comments'}`}</Typography>
								<Typography variant="body1">{training.instructions}</Typography>
							</div>
						))}
                    </div>
                </Modal>
            ) : <LinearProgress color="success" />}
		</>
	);
}

export default TrainingFinished;
