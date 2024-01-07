import PropTypes from "prop-types";
import React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../../helpers/themeProviderHelper';


const TwoSidesTemplate = (props) => {
	return (
		<ThemeProvider theme={appTheme}>
			<Grid container component="main" sx={{ height: '100%', padding: '15px', backgroundColor: '#F8F8FA'}}>
				<Grid item xs={12} sm={12} md={6} component={Paper} style={{ height: '100%', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px 0px 0px 8px' }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							width: '50%'
						}}
					>
						{props.title}
						{props.prebodyitem}
						<Box sx = {{width: '100%'}}>
							{props.body}
						</Box>
						{props.submitting}
						{props.additional_links}
					</Box>
				</Grid>
				<Grid item xs={-1} sm={-1} md={6} component={Paper}
					sx={{
						height: '100%',
						backgroundImage: `url(${props.img})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						borderRadius: '0px 8px 8px 0px'
					}}
				/>
			</Grid>
		</ThemeProvider>
	);
};

TwoSidesTemplate.propTypes = {
	title: PropTypes.element.isRequired,
	prebodyitem: PropTypes.element,
	body: PropTypes.element.isRequired,
	additional_links: PropTypes.element,
	submitting: PropTypes.element,
	img: PropTypes.string.isRequired
};

TwoSidesTemplate.defaultProps = {};

export default TwoSidesTemplate;