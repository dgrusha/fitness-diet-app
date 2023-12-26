import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Box, LinearProgress } from '@mui/material';
import {
	Autocomplete,
	TextField,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../helpers/themeProviderHelper';
import { subscribe } from '../apiCalls/addSubscription';
import { getAllUsers } from '../apiCalls/chatGetUsers';
import Modal from '@mui/material/Modal';
import { validatePaymentDetails } from '../validators/subscriptionValidator';
import { cancelSubscription } from '../apiCalls/cancelSubscription';
import { getCurrentUser, hasPassedObligatoryForm } from '../helpers/authHelper';
import { useAppContext } from '../AppContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { getCoach } from '../apiCalls/getUserCoach';


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
	const user = useAppContext();
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


	const handlePaymentOptionChange = (event) => {
		setPaymentOption(event.target.value);
	};

	const handleSubmit = async () => {
		setIsSubmitting(true)
		try {
			await subscribe({ subcriptionType: 1, coachEmail: selectedUser.Mail, duration: value });
			handleClose();
		} catch (error) {
			console.error(error.message);
		}
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

	const handleOpenCoachChange = async () => {
		try {
			await cancelSubscription();
			handleClose();
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		getAllUsers().then((data) => setAllUsers(data));
		getCoach().then((data) => {setCoach(data);
		console.log(data)});
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

	return (
		<ThemeProvider theme={appTheme}>
			<Box component={Paper} elevation={3} sx={{ height: '100%', width: "100%", backgroundColor: '#fff', padding: '30px 50px', margin: "15px", }}>
				<Typography variant="title1">Choose Your Subscription Plan</Typography>
				<Grid container sx={{
					backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-around'
				}}>
					<Grid item xs={12} sm={12} md={5.85} sx={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
						<Typography variant="h6">Basic Plan</Typography>
						<Typography variant="body1">Access to diet and training</Typography>
						<Typography variant="h5">Free</Typography>
						<Button variant="contained" disabled={true}>
							Subscribed
						</Button>
					</Grid>
					<Grid item xs={12} sm={12} md={5.85} sx={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
						<Typography variant="h6">Premium Plan</Typography>
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
							onClose={handleCloseCoach}>
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
									<Card sx ={{mb: '15px'}}>
										<CardHeader
											// avatar={<Avatar>{selectedCoach.avatar}</Avatar>}
											// title={selectedCoach.name}
											// subheader={selectedCoach.message}
											avatar={<Avatar>{ }</Avatar>}
											title={user.FirstName + " " + user.LastName}
											subheader={user.RecomendationText}
										/>
										<Button variant="contained" color="primary" download>
											Download Resume
										</Button>
									</Card>
								))}
							</Box>
						</Modal>
					</Grid>
				</Grid>
			</Box>
		</ThemeProvider>
	);
};

export default SubscriptionPage;