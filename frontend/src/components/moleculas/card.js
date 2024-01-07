import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const CardComponent = (props) => (
	<Card sx={{ display: 'flex', borderRadius: '10px', marginBottom: '12px', height: '15vh', backgroundColor: "#9CD91B" }} elevation={3}>
		<CardContent sx={{ flex: 1, alignSelf: 'center', justifySelf: 'center' }}>
			<Typography gutterBottom variant="title3" component="div">
				{props.title}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{props.subtitle}
			</Typography>
			{props.button}
		</CardContent>
		<CardMedia
			sx={{ flex: 1, display: 'grid', backgroundColor: '#9CD91B'}}
			image={props.image}>
			<Typography component="div" variant="img_caption" sx={{ alignSelf: 'center', justifySelf: 'center'}}>{props.imageLabel}</Typography>
		</CardMedia>
	</Card>
);

CardComponent.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	button: PropTypes.element,
	image: PropTypes.string.isRequired,
	imageLabel: PropTypes.string
};
