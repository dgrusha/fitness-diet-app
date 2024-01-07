import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const VerticalCard = (props) => (
		<Grid item xs={12} sm={12} md={5.85} sx={{ padding: '30px', border: '1px solid #ddd', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', mb: {xs: '20px', sm: '20px', md: '0px'} }}>
		<Typography variant="title2">{props.title}</Typography>
		<img src={props.imgPath} alt="subscription plan"></img>
		<Typography variant="subtitle1" sx={{ mt: '10px' }}>{props.subtitle}</Typography>
		<Typography variant="price" sx={{ mb: '10px' }}>{props.total}</Typography>
		{props.buttons}
	</Grid>
);

VerticalCard.propTypes = {
	title: PropTypes.string.isRequired,
	imgPath: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	total: PropTypes.string.isRequired,
	buttons: PropTypes.element.isRequired
};