import { Autocomplete, Avatar, Box, Button, Card, CardHeader, FormControlLabel,
				Grid, LinearProgress, Modal, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { subscribe } from '../apiCalls/subscription/addSubscription';
import { cancelSubscription } from '../apiCalls/subscription/cancelSubscription';
import { getAllVerifiedCoaches } from '../apiCalls/subscription/getAllVerifiedCoaches'
import { updateCoachSubscription } from '../apiCalls/subscription/updateCoachSubscription';
import BasicSubscription from '../img/basic_subscription.svg';
import PremiumSubscription from '../img/premium_subscription.svg';
import { validatePaymentDetails } from '../validators/subscriptionValidator';
import MonoTemplate from '../components/templates/MonoTemplate';
import { VerticalCard } from '../components/moleculas/verticalCard';
import { useAppContext } from '../AppContext';


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
	const {user} = useAppContext();
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

	useEffect(() => {
		getAllVerifiedCoaches().then((data) => setAllUsers(data));
		// getCoach().then((data) => {
		// 	setCoach(data);
		// 	console.log(data)
		// });
		console.log(user)
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
		<MonoTemplate
			title="CHOOSE YOUR SUBSCRIPTION PLAN"
			body={
			<Grid container sx={{ height: '85%',
				backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between'
			}}>
				<VerticalCard
					title="BASIC PLAN" imgPath={BasicSubscription} subtitle="Access to diet and training" total="Free"
					buttons={
						<Button variant="contained" disabled={true}>
							Subscribed
						</Button>
					}
				/>
				<VerticalCard
					title="PREMIUM PLAN" imgPath={PremiumSubscription} subtitle="Access to diet and training, ability to chat with trainer" total="$4.99/month"
					buttons={
						<Box sx={{ display: 'flex', flexDirection: { xs: "column", sm: "column", md: "row" }, justifyContent: 'space-between', width: '75%' }}>
							<Button variant="contained" onClick={handleOpen} sx={{ mb: { xs: "10px", sm: "10px", md: '0px' }}} disabled={!user?.hasSubscription === true}>
								Subscribe
							</Button>
							<Button variant="change" onClick={handleOpenCoach} sx={{ mb: { xs: "10px", sm: "10px", md: "0px" }}} disabled={!user?.hasSubscription !== true}>
								Change Coach
							</Button>
							<Button variant="cancel" onClick={handleCancel} disabled={!user?.hasSubscription !== true}>
								Cancel
							</Button>
						</Box>
					}
				/>
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
							<Box sx={{ display: "flex", alignItems: "center", mt: '10px' }}>
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
								<Typography variant='subtitle1'> Number of months</Typography>
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
							maxHeight: '80vh',
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
									<Button variant="contained" color="primary" href={user.CVFileName} download={"cv"}>
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
			}
		/>
	);
};

export default SubscriptionPage;