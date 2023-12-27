import * as React from 'react';
import { useEffect, useState }  from 'react';
import { Button, Modal } from "@mui/material";
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { CalendarControlled } from '../components/atoms/CalendarControlled.js';
import { CardComponent } from "../components/moleculas/card.js";
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate';
import image_breakfast from '../img/breakfast.png';
import image_dinner from '../img/dinner.png';
import image_edit_questionnary from "../img/edit_questionnary.png";
import image_lunch from '../img/lunch.png';
import { getDietData } from '../apiCalls/getDietData.js';
import { CardComponentWithAction } from '../components/moleculas/cardWithAction.js';
import { requestGenerateFile } from '../apiCalls/requestGenerateFile.js';
import dayjs from 'dayjs';

function DietFinished() {
	const [userDietData, setUserDietData] = useState({});
    const [userDietDataPerDay, setUserDietDataPerDay] = useState(null);
    const [communicationFileGeneration, setCommunicationFileGeneration] = useState("");
    const [date, setDate] = React.useState(dayjs());
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [selectedMealId, setSelectedMealId] = useState(0);

    const MealsEnum = {
        "Breakfast": 0,
        "Lunch": 2,
        "Dinner": 1
    };

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
        setCommunicationFileGeneration('');
        setDate(value);
        if(userDietData){
            setUserDietDataPerDay(userDietData.recipes[value.day().toString()]);
        }
	};

    const handleCardClick = (mealType) => {
        setCommunicationFileGeneration('');
        setSelectedMealId(MealsEnum[mealType]);
        setSelectedMeal(mealType);
    };

    const handleCloseModal = () => {
        setCommunicationFileGeneration('');
        setSelectedMeal(null);
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
                title={<Typography gutterBottom variant="title1">Ration for today</Typography>}
                bodyItems={
                    <>
                        <CardComponentWithAction 
                            title="Breakfast"
                            subtitle={userDietDataPerDay[0].name}
                            image={image_breakfast} 
                            imageLabel={userDietDataPerDay[0].calories + " Cal"} 
                            onClickFun= {handleCardClick}
                        />
                        <CardComponentWithAction 
                            title="Lunch" 
                            subtitle={userDietDataPerDay[2].name} 
                            image={image_lunch} 
                            imageLabel={userDietDataPerDay[2].calories + " Cal"} 
                            onClickFun= {handleCardClick}
                        />
                        <CardComponentWithAction 
                            title="Dinner" 
                            subtitle={userDietDataPerDay[1].name} 
                            image={image_dinner} 
                            imageLabel={userDietDataPerDay[1].calories + " Cal"} 
                            onClickFun= {handleCardClick}
                        />
                    </>
                }
                footerBody={ 
                    <>
                        <CardComponent title="Health questionnaires" button={<Button href="/diet_change">Edit</Button>} image={image_edit_questionnary}/>
                    </>
                }
                leftUpperPart={<CalendarControlled value={date} changeFunction={handleDate} />}
                leftLowerPart={
                    <>
                        <Typography >{`${communicationFileGeneration}`}</Typography>
                        <Button sx={{padding: '3vh 15vh', marginBottom: '20px'}} onClick={handleSendButtonClick}>GENERATE RECIPE INSTRUCTIONS</Button>
                    </>
                }
            />
            ) : <LinearProgress color="success" />}
            {userDietDataPerDay ? (
                <Modal
                    open={selectedMeal !== null}
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
                        }}
                    >
                        <Typography variant="h5">{`Details for ${selectedMeal}`}</Typography>
                        <Typography >{`Name: ${userDietDataPerDay[selectedMealId].name}`}</Typography>
                        <Typography >{`Description: ${userDietDataPerDay[selectedMealId].description}`}</Typography>
                        <Typography >{`Calories: ${userDietDataPerDay[selectedMealId].calories}`}</Typography>
                        <Typography >{`Carbohydrate: ${userDietDataPerDay[selectedMealId].carbohydrate}`}</Typography>
                        <Typography >{`Fat: ${userDietDataPerDay[selectedMealId].fat}`}</Typography>
                        <Typography >{`Protein: ${userDietDataPerDay[selectedMealId].protein}`}</Typography>
                        <Typography >{`Ingredients: ${userDietDataPerDay[selectedMealId].ingredientsStr}`}</Typography>
                        <Typography>{`Coaches comment: ${userDietDataPerDay[selectedMealId].comment !== null 
                        ? userDietDataPerDay[selectedMealId].comment : 'No comments'}`}</Typography>
                    </div>
                </Modal>
            ) : <LinearProgress color="success" />}
		</>
	);
}

export default DietFinished;
