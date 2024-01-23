import React from 'react';
import { Typography, Grid } from '@mui/material';
import MonoTemplate from '../components/templates/MonoTemplate';
import diet from '../img/diet_preparation.svg';
import training from '../img/training_preparation.svg';

function PreparingProcess({ mode }) {
	return (
		<MonoTemplate
			body={<Grid sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%'
			}}>
				<img style={{height: "60%", width: "40%" }} className="photoPage" src={mode === "diet" ? diet : training} alt="Main page photo" />
				<Typography variant="title1">We are preparing a {mode} for you!</Typography>
			</Grid>}
		/>
	);
};

export default PreparingProcess;