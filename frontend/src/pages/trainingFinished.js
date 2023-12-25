import * as React from 'react';

import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Calendar from "../components/atoms/Calendar.js";
import { CardComponent } from "../components/moleculas/card.js";
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate.js';
import image_edit_questionnary from "../img/edit_questionnary.png";
import image_stretching from '../img/streching.svg';

function TrainingFinished() {

	return (
		<InfoAndCalendarTemplate
			title={<Typography gutterBottom variant="title1">Training for today</Typography>}
			bodyItems={
					<CardComponent title="Warmup" subtitle="Stretching and massage" image={image_stretching} />

			}
			footerBody={<CardComponent title="Health questionnaires" button={
				<Button>Edit</Button>
			} image={image_edit_questionnary}/> }
			leftUpperPart={<Calendar></Calendar>}
			leftLowerPart={<Button sx={{padding: '3vh 15vh', marginBottom: '20px'}}>DOWNLOAD</Button>}
		/>
	);
}

export default TrainingFinished;
