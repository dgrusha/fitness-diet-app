import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import PropTypes from "prop-types";
import React from "react";
import { appTheme } from '../../helpers/themeProviderHelper';


const InfoAndCalendarTemplate = (props) => {
	return (
		<ThemeProvider theme={appTheme}>
			<Grid container component="main" sx={{ height: '100%', padding: '15px', backgroundColor: '#FAFAFA', overflow: 'auto'}}>
				<Grid item sm={9} md={9} lg={8.5} component={Paper} elevation={3} sx={{ backgroundColor: '#fff', marginRight: 2, display: 'flex', flexDirection: 'column', 
				justifyContent: 'space-between', padding: '30px 50px', height: '100%'}}>
						<Box>
							{props.title}
							{props.bodyItems}
						</Box>
						{props.footerBody}
				</Grid>
				<Grid item sm={0} md={0} lg={3.2} component={Paper} elevation={3}
					sx={{backgroundColor: "#fff", display: 'flex', flexDirection: 'column', 
					justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '20px 10px'}}>
					{props.leftUpperPart}
					{props.leftLowerPart}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};

InfoAndCalendarTemplate.propTypes = {
  title: PropTypes.element.isRequired,
	bodyItems: PropTypes.element.isRequired,
  footerBody: PropTypes.element.isRequired,
  leftUpperPart: PropTypes.element.isRequired,
  leftLowerPart: PropTypes.element.isRequired
};

export default InfoAndCalendarTemplate;