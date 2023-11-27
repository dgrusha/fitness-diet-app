import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../helpers/themeProviderHelper';

const SubscriptionPage = () => {
	return (
		<ThemeProvider theme={appTheme}>
				<Box component={Paper} elevation={3} sx={{ height: "100%",backgroundColor: '#fff', padding: '30px 50px', margin: "15px",}}>
					<Typography variant="title1">Choose Your Subscription Plan</Typography>
					<Grid container sx={{
						backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'stretch'
					}}>
						<Grid item xs={12} sm={6} md={6}>
							<div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
								<Typography variant="h6">Basic Plan</Typography>
								<Typography variant="body1">Access to diet and training</Typography>
								<Typography variant="h5">Free</Typography>
								<Button variant="contained">
									Subscribe
								</Button>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} md={6}>
							<div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
								<Typography variant="h6">Premium Plan</Typography>
								<Typography variant="body1">Access to diet and training</Typography>
								<Typography variant="body1">Ability to chat with trainer</Typography>
								<Typography variant="h5">$4.99/month</Typography>
								<Button variant="contained">
									Subscribe
								</Button>
							</div>
						</Grid>
					</Grid>
				</Box>
		</ThemeProvider>
	);
};

export default SubscriptionPage;