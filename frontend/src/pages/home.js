import React from 'react';
import { Typography, Button, Paper, Grid, ThemeProvider, Box} from '@mui/material';
import { appTheme } from '../helpers/themeProviderHelper';
import { useAppContext } from '../AppContext';
import main_photo from '../img/main_page.svg';
import training from '../img/training_landing.png';
import diet from '../img/diet_landing.png';
import coach from '../img/coach_landing.png';
import background from '../img/landing_background.png';

function HomePage() {
		const {user} = useAppContext();
		if (user) {
			return (
				<ThemeProvider theme={appTheme}>
					<Grid container component={Paper} 
						sx={{ height: '100vh', 
									border: '15px solid #F8F8FA',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',}}>
						<img style={{display: 'block', height:"60%", width:"60%"}} className="photoPage" src={main_photo} alt="Main page photo" />
						{ !user?.hasObligatoryForm && !user?.isCoach ? (
							<>
								<Typography variant="title1">READY TO START?</Typography>
								<Typography variant="subtitle1">Let's start with completing a straightforward form. This will give us valuable insights into your goals.</Typography>
								<Button href="/get_started" sx={{mt: '20px', width: '15%'}}>Fill the form</Button>
							</>) :  (
							<>
								<Typography variant="title1">WE HOPE YOU ARE ENJOYING OUR APP</Typography>
								<Typography variant="subtitle1">Let us know if anything is wrong. This will help us to become better.</Typography>
								<Button href="/feedback" sx={{mt: '20px', width: '15%'}}>Leave feedback</Button>
							</>)
						}
					</Grid>
				</ThemeProvider>
			);}
		else {
			return(
				<ThemeProvider theme={appTheme}>
					<Grid container component={Paper} style={{ display: 'flex', height: '100%', overflow: 'auto', width: '100%', border: '15px solid #F8F8FA', borderRadius: '0px'}}>
						<Grid container
							sx={{ 
								height: '100%', 
								display: 'flex',
								flexDirection: { xs: 'column', sm: 'column', md: 'row' },
								alignItems: 'center',
								justifyContent: 'space-around'
							}}
						>
							<img style={{ display: 'block', width: '30%'}} className="photoPage" src={training} alt="Main page photo" />
							<Box sx={{width: '50%'}}>
								<Typography variant="title1">PERSONALIZED TRAINING PLANS</Typography>
								<Typography variant="subtitle1" sx={{padding: "30px 0px"}}>Achieve your fitness goals with customized training plans tailored to your individual strength levels and preferred training frequency. Whether you're a beginner or an experienced athlete, our platform adapts to your needs.</Typography>
								<Button href="/login" sx={{width: '15%' }}>Start</Button>
							</Box>
						</Grid>
						<Grid container
							sx={{ 
								height: '100%', 
								display: 'flex',
								flexDirection: { xs: 'column', sm: 'column', md: 'row' },
								alignItems: 'center',
								justifyContent: 'space-around',
								background: "url(" + background + ")",
								backgroundSize: 'cover'
							}}
						>
							<Box sx={{width: '50%', textAlign: 'right'}}>
								<Typography variant="title1">PERSONALIZED DIET PLANS</Typography>
								<Typography variant="subtitle1" sx={{padding: "30px 0px"}}>Fuel your body with nutrition that aligns with your lifestyle. Our platform creates personalized diet plans based on your activity mode, preferred cooking time, and overall weight goal—whether it's gaining, losing, or maintaining weight.</Typography>
								<Button href="/login" sx={{ width: '15%' }}>Join</Button>
							</Box>
							<img style={{ display: 'block', width: '30%'}} className="photoPage" src={diet} alt="Main page photo" />
						</Grid>
						<Grid container
							sx={{ 
								height: '100%', 
								display: 'flex',
								flexDirection: { xs: 'column', sm: 'column', md: 'row' },
								alignItems: 'center',
								justifyContent: 'space-around'
							}}
						>
							<img style={{ display: 'block', width: '30%'}} className="photoPage" src={coach} alt="Main page photo" />
							<Box sx={{width: '50%'}}>
								<Typography variant="title1">COACH SUBSCRIPTION</Typography>
								<Typography variant="subtitle1" sx={{padding: "30px 0px"}}>Take your fitness journey to the next level with our personal coaching subscription. Subscribe to certified and verified coaches who provide real-time chat support. Receive comments  your exercises and meals, and access individualized training files prepared just for you.</Typography>
								<Button href="/login" sx={{ width: '15%' }}>Try now</Button>
							</Box>
						</Grid>
					</Grid>
				</ThemeProvider>
			)
		}
  };
  
export default HomePage;