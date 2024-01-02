import PropTypes from "prop-types";
import React, { useState } from 'react';
import { Box, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../../helpers/themeProviderHelper';
import TabPanel from "../moleculas/TabPanel";

const TabPage = (props) => {
	const [tabValue, setTabValue] = useState(0);

	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};

	return (
		<ThemeProvider theme={appTheme}>
			<Grid container component="main" sx={{ height: '100%', padding: '15px', overflow: 'auto', backgroundColor: '#F8F8FA' }}>
				<Box component={Paper} sx={{ backgroundColor: 'white', padding: '30px 50px', borderRadius: '8px',  flexGrow: 1, flexDirection: 'column', display: 'flex', overflow: 'auto', gap: '10px' }}>
					<Typography variant="title1" sx={{ mb: "10px" }}>{props.title}</Typography>
					<Tabs value={tabValue} TabIndicatorProps={{ sx: { backgroundColor: "#9CD91B", mb: '10px' } }} onChange={handleChange}>
						{props.body.map((tab, index) => (
							<Tab key={index} label={tab.name} />
						))}
					</Tabs>
					{props.body.map((tab, index) => (
						<TabPanel key={index} value={tabValue} index={index}>
							{tab.content}
						</TabPanel>
					))}
				</Box>
			</Grid>
		</ThemeProvider>
	);
};

TabPage.propTypes = {
	title: PropTypes.element.isRequired,
	body: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			content: PropTypes.element.isRequired,
		})
	).isRequired,
};

TabPage.defaultProps = {};

export default TabPage;
