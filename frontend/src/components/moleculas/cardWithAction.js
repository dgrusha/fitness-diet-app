import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';


export const CardComponentWithAction = (props) => (
	<Card sx={{ display: 'flex', borderRadius: '10px', marginBottom: '12px', height: '15vh' }} elevation={3} onClick={() => props.onClickFun(props.title)}>
		<CardContent sx={{ flex: 1, alignSelf: 'center', justifySelf: 'center' }}>
			<Typography gutterBottom variant="h5" component="div">
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

CardComponentWithAction.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	button: PropTypes.element,
	image: PropTypes.string.isRequired,
	imageLabel: PropTypes.string
};
