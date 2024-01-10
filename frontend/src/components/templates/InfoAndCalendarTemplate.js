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
			<Grid container component="main" sx={{ height: '100%', padding: '15px', overflow: 'auto', backgroundColor: '#F8F8FA'}}>
				<Grid item sm={9} md={9} lg={8.5} component={Paper} sx={{ marginRight: 2, padding: '30px 50px', height: '100%', borderRadius: '8px'}}>
					<Box sx={{overflow: 'auto', height: '100%',  display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
						<Box>
							{props.title}
							{props.bodyItems}
						</Box>
						<Box>
							{props.footerBody}
						</Box>
					</Box>
				</Grid>
				<Grid item sm={0} md={0} lg={3.2} component={Paper}
					sx={{backgroundColor: "#fff", display: 'flex', flexDirection: 'column', maxWidth: '85%',
					justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '20px 10px', borderRadius: '8px'}}>
					{props.leftUpperPart}
					{props.leftLowerPart}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};

InfoAndCalendarTemplate.propTypes = {
  title: PropTypes.element.isRequired,
  bodyItems: PropTypes.node,
  footerBody: PropTypes.element,
  leftUpperPart: PropTypes.element.isRequired,
  leftLowerPart: PropTypes.element.isRequired
};

export default InfoAndCalendarTemplate;