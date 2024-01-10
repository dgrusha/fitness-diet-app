import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import left_button from '../../img/left_button.svg';

export const CardComponentWithAction = (props) => (
	<Card sx={{ display: 'flex', borderRadius: '10px', marginBottom: '12px', height: '15vh', border: "1px solid #EEEEF1" }} onClick={() => props.onClickFun(props.title)}>
		<CardContent sx={{ flex: 1, alignSelf: 'center', justifySelf: 'center' }}>
			<Typography gutterBottom variant="title2" component="div">
				{props.title}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{props.subtitle}
			</Typography>
			{props.button}
		</CardContent>
		<CardMedia
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				backgroundColor: '#9CD91B',
				height: '100%',
			}}
			image={props.image}
		>
			<Typography component="div" variant="img_caption" sx={{ marginLeft: '20px' }}>{props.imageLabel}</Typography>
			<img src={left_button} alt="left button" style={{ display: 'block', marginRight: '20px'}} />
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
