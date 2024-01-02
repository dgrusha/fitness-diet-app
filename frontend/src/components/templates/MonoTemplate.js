import PropTypes from "prop-types";
import React from "react";

import { Box, Grid, Paper, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../../helpers/themeProviderHelper';


const MonoTemplate = (props) => {
	return (
		<ThemeProvider theme={appTheme}>
			<Grid container component="main" sx={{ height: '100%', padding: '15px', overflow: 'auto', backgroundColor: '#F8F8FA' }}>
				<Box component={Paper} sx={{ width: '100%', backgroundColor: '#fff', padding: '30px 50px', borderRadius: '8px' }}>
					<Typography variant="title1" sx={{ mb: '20px' }}>{props.title}</Typography>
					{props.body}
				</Box>
			</Grid>
		</ThemeProvider>
	);
};

MonoTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.element,
};

MonoTemplate.defaultProps = {};

export default MonoTemplate;