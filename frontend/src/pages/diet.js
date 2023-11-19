import * as React from 'react';
import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Calendar from "../components/atoms/Calendar.js";
import { CardComponent } from "../components/moleculas/card.js";
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate';
import image_breakfast from '../img/breakfast.png';
import image_dinner from '../img/dinner.png';
import image_edit_questionnary from "../img/edit_questionnary.png";
import image_lunch from '../img/lunch.png';

function Diet() {

	return (
		<InfoAndCalendarTemplate
			title={<Typography gutterBottom variant="title1">Ration for today</Typography>}
			bodyItems={
				<>
					<CardComponent title="Breakfast" subtitle="Greek Yogurt Parfait with Berries and Nuts" image={image_breakfast} imageLabel="350 kCal"/>
					<CardComponent title="Lunch" subtitle="Grilled Chicken Salad" image={image_lunch} imageLabel="503 kCal"/>
					<CardComponent title="Dinner" subtitle="Baked Salmon with Quinoa and Roasted Vegetables" image={image_dinner} imageLabel="760 kCal"/>
				</>
			}
			footerBody={<CardComponent title="Health questionnaires" button={
				<Button>Edit</Button>
			} image={image_edit_questionnary}/> }
			leftUpperPart={<Calendar></Calendar>}
			leftLowerPart={<Button sx={{padding: '3vh 15vh', marginBottom: '20px'}}>DOWNLOAD</Button>}
		/>
	);
}

export default Diet;
