import * as React from 'react';
import { useEffect, useState }  from 'react';
import { Button } from "@mui/material";
import FormDiet from './formDiet.js';
import Typography from '@mui/material/Typography';
import Calendar from "../components/atoms/Calendar.js";
import { CardComponent } from "../components/moleculas/card.js";
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate';
import image_breakfast from '../img/breakfast.png';
import image_dinner from '../img/dinner.png';
import image_edit_questionnary from "../img/edit_questionnary.png";
import image_lunch from '../img/lunch.png';
import { getUserStatuses } from '../apiCalls/userProfileGetStatuses.js';
import PreparingProcess from './preparingProcess.js';
import { StatusEnum } from '../helpers/processStatuses.js';
import DietFinished from './dietFinished.js';

function Diet() {
	const [userStatuses, setUserStatuses] = useState({});

	useEffect(() => {
		getUserStatuses().then((data) => {
			if (data.errorCode === 200) {
				setUserStatuses(data.data);
			} else {
				setUserStatuses({ dietStatus: -1, trainingStatus: -1 });
			}
		});
	}, []);

	const renderContent = () => {
		switch (userStatuses.dietStatus) {
			case StatusEnum.NotStarted:
				return <FormDiet setUserStatuses={setUserStatuses} mode={0}/>;
			case StatusEnum.InProgress:
				return <PreparingProcess/>;
			case StatusEnum.Finished:
				return (
					<DietFinished />
				);
			case StatusEnum.ToTake:
				return <PreparingProcess/>;
			default:
				return <></>;
		}
	};

	return (
		<>
			{renderContent()}
		</>
	);
}

export default Diet;
