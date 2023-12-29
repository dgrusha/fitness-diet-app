import { Autocomplete, Avatar, Box, Button, Card, CardHeader, FormControlLabel,
	Grid, LinearProgress, Modal, Paper, Radio, RadioGroup, Snackbar, TextField, Typography
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { subscribe } from '../apiCalls/addSubscription';
import { cancelSubscription } from '../apiCalls/cancelSubscription';
import { getAllUsers } from '../apiCalls/chatGetUsers';
import { getCoach } from '../apiCalls/getUserCoach';
import { updateCoachSubscription } from '../apiCalls/updateCoachSubscription';
import { appTheme } from '../helpers/themeProviderHelper';
import BasicSubscription from '../img/basic_subscription2.svg';
import PremiumSubscription from '../img/premium_subscription.svg';
import { validatePaymentDetails } from '../validators/subscriptionValidator';


const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'clamp(40%, 60%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	borderRadius: 2,
	p: 5,
	overflow: 'auto',
	overflowY: 'scroll',
};

const SubscriptionPage = () => {
	const [coach, setCoach] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [openCoach, setOpenCoach] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleOpenCoach = () => setOpenCoach(true);
	const handleCloseCoach = () => setOpenCoach(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
	const [paymentOption, setPaymentOption] = useState('blik'); // Default payment option
	const [paymentDetails, setPaymentDetails] = useState({
		blik: '',
		cardNumber: '',
		expirationDate: '',
		CVV: ''
	})
	const [formErrors, setFormErrors] = useState({ blik: "", cardNumber: "", expirationDate: "", CVV: "" });
	const [value, setValue] = useState(1);
	const [selectedCoach, setSelectedCoach] = useState(null);
	// const [confirmationCoachOpen, setConfirmationCoachOpen] = useState(false);
	const handleCoachSelect = (coach) => {
		setSelectedCoach(coach);
	};

	const handleSubmitCoachChoice = () => {
		if (selectedCoach) {
			console.log('Selected user:', selectedCoach);
			try {
				updateCoachSubscription({ email: selectedCoach.Mail })
				handleClose();
				// setConfirmationCoachOpen(true);
			} catch (error) {
				console.error(error.message);
			}
		}
	};


	const handlePaymentOptionChange = (event) => {
		setPaymentOption(event.target.value);
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			await subscribe({ subcriptionType: 1, coachEmail: selectedUser.Mail, duration: value });
			handleClose();
		} catch (error) {
			console.error(error.message);
		}
		setIsSubmitting(false);
	};

	const handleCancel = async () => {
		setIsSubmitting(true)
		try {
			await cancelSubscription();
			handleClose();
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getAllUsers().then((data) =>{
			setAllUsers(data);
			console.log(data);
		} );
		getCoach().then((data) => {
			setCoach(data);
			console.log(data)
		});
		console.log(coach)
	}, []);

	const handleChangeChat = (event, newValue) => {
		setSelectedUser(newValue);
	};

	function isButtonDisabled() {
		if (paymentOption === "blik") {
			return formErrors["blik"] !== "" || !selectedUser || paymentDetails.blik === "";
		} else {
			return formErrors["cardNumber"] !== "" || formErrors["expirationDate"] !== "" || formErrors["CVV"] !== "" || !selectedUser || paymentDetails.cardNumber === "" ||
				paymentDetails.expirationDate === "" || paymentDetails.CVV === "";
		}
	}

	const handleChangePaymentDetails = event => {
		const { name, value } = event.target;
		let errVal = validatePaymentDetails(name, value, paymentOption);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}),
			setPaymentDetails({
				...paymentDetails,
				[name]: value
			}))
	}

	const handleIncrement = () => {
		if (value < 6) {
			setValue(value + 1);
		}
	};

	const handleDecrement = () => {
		if (value > 1) {
			setValue(value - 1);
		}
	};

	const handleChange = (event) => {
		const inputValue = parseInt(event.target.value, 10);
		if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 6) {
			setValue(inputValue);
		}
	}

	// const handleCloseConfirmation = () => {
	// 	setConfirmationCoachOpen(false);
	// };

	return (
		<ThemeProvider theme={appTheme}>
			<Grid container component="main" sx={{ height: '100%', padding: '15px', overflow: 'auto' }}>
				<Box component={Paper} elevation={3} sx={{ width: '100%', backgroundColor: '#fff', padding: '30px 50px', }}>
					<Typography variant="title1">CHOOSE YOUR SUBSCRIPTION PLAN</Typography>
					<Grid container sx={{
						backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around'
					}}>
						<Grid item xs={12} sm={12} md={5.85} sx={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
							<Typography variant="h6">Basic Plan</Typography>
							<img src={BasicSubscription}></img>
							<Typography variant="body1">Access to diet and training</Typography>
							<Typography variant="h5">Free</Typography>
							<Button variant="contained" disabled={true}>
								Subscribed
							</Button>
						</Grid>
						<Grid item xs={12} sm={12} md={5.85} sx={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
							<Typography variant="h6">Premium Plan</Typography>
							<img src={PremiumSubscription}></img>
							<Typography variant="body1">Access to diet and training</Typography>
							<Typography variant="body1">Ability to chat with trainer</Typography>
							<Typography variant="h5">$4.99/month</Typography>
							<Button variant="contained" onClick={handleOpen}>
								Subscribe
							</Button>
							<Button variant="contained" onClick={handleOpenCoach}>
								Change Coach
							</Button>
							<Button variant="contained" onClick={handleCancel}>
								Cancel
							</Button>
							<Modal
								open={open}
								onClose={handleClose}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description"
							>
								<Box sx={style}>
									<Typography variant="title1" sx={{ textAlign: "center", display: "block", mb: "20px" }}>
										Subcription details
									</Typography>
									<Autocomplete
										options={allUsers}
										getOptionLabel={(option) => option.FirstName + ' ' + option.LastName}
										value={selectedUser}
										onChange={handleChangeChat}
										fullWidth
										renderInput={(params) => (
											<TextField {...params} label="Choose coach" variant="outlined" fullWidth />
										)}
									/>
									<Box display="flex" alignItems="center">
										<Button onClick={handleDecrement} variant="outlined" size="small">
											-
										</Button>
										<TextField
											variant="outlined"
											value={value}
											onChange={handleChange}
											inputProps={{ min: 1, max: 6 }}
											style={{ width: '50px', margin: '0 8px' }}
										/>
										<Button onClick={handleIncrement} variant="outlined" size="small">
											+
										</Button>
									</Box>
									<RadioGroup aria-label="paymentOption" name="paymentOption" value={paymentOption} onChange={handlePaymentOptionChange} sx={{ mt: 2 }}>
										<FormControlLabel value="blik" control={<Radio />} label="Blik" />
										<FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
									</RadioGroup>
									{paymentOption === 'blik' && (
										<TextField
											label="Blik Field"
											name="blik"
											variant="outlined"
											value={paymentDetails.blik}
											onChange={handleChangePaymentDetails}
											fullWidth
											error={formErrors["blik"] !== ""} helperText={formErrors["blik"]}
											sx={{ mt: 2 }}
										/>
									)}
									{paymentOption === 'creditCard' && (
										<>
											<TextField
												label="Credit Card Number"
												name="cardNumber"
												variant="outlined"
												fullWidth
												value={paymentDetails.cardNumber}
												onChange={handleChangePaymentDetails}
												error={formErrors["cardNumber"] !== ""} helperText={formErrors["cardNumber"]}
												sx={{ mt: 2 }}
											/>
											<Grid container spacing={2} sx={{ mt: '10px' }}>
												<Grid item xs={6}>
													<TextField
														label="Expiration Date"
														name="expirationDate"
														variant="outlined"
														placeholder='MM/YY'
														fullWidth
														value={paymentDetails.expirationDate}
														onChange={handleChangePaymentDetails}
														error={formErrors["expirationDate"] !== ""} helperText={formErrors["expirationDate"]}
													/>
												</Grid>
												<Grid item xs={6}>
													<TextField
														label="CVV"
														name="CVV"
														variant="outlined"
														fullWidth
														value={paymentDetails.CVV}
														onChange={handleChangePaymentDetails}
														error={formErrors["CVV"] !== ""} helperText={formErrors["CVV"]}
													/>
												</Grid>
											</Grid>
										</>
									)}
									{isSubmitting && <LinearProgress color="success" sx={{ mt: '10px' }} />}
									<Button fullWidth sx={{ mt: '20px' }} disabled={isButtonDisabled()} onClick={handleSubmit}>Confirm</Button>
								</Box>
							</Modal>
							<Modal
								open={openCoach}
								onClose={handleCloseCoach}
							>
								<Box sx={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									width: '60%',
									bgcolor: 'background.paper',
									boxShadow: 24,
									borderRadius: 2,
									p: 5,
									maxHeight: '80vh', // Set the maximum height
									overflow: 'auto',
									overflowY: 'scroll'
								}}>
									{allUsers.map((user, index) => (
										<Card
											key={index}
											sx={{ mb: '15px', cursor: 'pointer', backgroundColor: selectedCoach === user ? '#f0f0f0' : 'inherit' }}
											onClick={() => handleCoachSelect(user)}
										>
											<CardHeader
												avatar={<Avatar src={user.AvatarFileName}>{ }</Avatar>}
												title={user.FirstName + " " + user.LastName}
												subheader={user.RecomendationText}
											/>
											<Button variant="contained" color="primary" download>
												Download Resume
											</Button>
										</Card>
									))}
									<Button variant="contained" color="primary" onClick={handleSubmitCoachChoice}>
										Submit
									</Button>
								</Box>
								{/* <Snackbar
									open={confirmationCoachOpen}
									autoHideDuration={6000}
									onClose={handleCloseConfirmation}
									message="Your choice has been submitted!"
								/> */}
							</Modal>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</ThemeProvider>
	);
};

export default SubscriptionPage;