import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

import image_sign_up from "../img/login_sign_up.png";
import { handleFormResponse } from '../helpers/formVerification';
import { register } from '../apiCalls/register';
import { validateSignUpFormFields } from '../validators/signUpValidator'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { InputAdornment } from '@mui/material';
import { registerCoach } from '../apiCalls/registerCoach';
import { isFormValid } from '../helpers/isFormValid';
import { ButtonComponent } from "../components/atoms/Button";
import InputField from '../components/atoms/InputField';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';


function SignUpClient(props) {
	const navigate = useNavigate();
	const [isCoach, setIsCoach] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		yourMessage: ''
	})
	const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "", email: "", password: "", yourMessage: "" });

	// Hidden file input
	const [selectedFile, setSelectedFile] = useState(null);
	const [textFieldValue, setTextFieldValue] = useState('Put your recomendation');
	const [isHovered, setIsHovered] = useState(false);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			setTextFieldValue(file.name);
		}
	};

	const handleTextFieldClick = () => {
		document.getElementById('hidden-file-input').click();
	};

	const handleChange = event => {
		const { name, value } = event.target;
		let errVal = validateSignUpFormFields(name, value);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}),
			setUser({
				...user,
				[name]: value
			}))
	}

	const handleCoachChange = event => {
		if (!event.target.checked) {
			setFormErrors(prevState => ({
				...prevState,
				["general"]: "",
				["yourMessage"]: ""
			}));
		}
		setIsCoach(event.target.checked)
	}

	function isButtonDisabled() {
		if (!isCoach) {
			return !isFormValid(formErrors, [user.firstName, user.lastName, user.email, user.password]);
		} else {
			return !isFormValid(formErrors, [user.firstName, user.lastName, user.email, user.password, user.yourMessage]) || !selectedFile;
		}
	}

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			if (!isCoach) {
				const response = await register({
					firstName: user.firstName, lastName: user.lastName,
					email: user.email, password: user.password
				});
				const [message] = [await response.json()];
				if (message.errorCode === 200) {
					handleFormResponse(message.errorCode, message.data, setFormErrors, navigate, '/');
				} else {
					setFormErrors(prevState => ({
						...prevState,
						["general"]: message.errors[0],
					})
					);
				}
			} else {
				const response = await registerCoach({
					firstName: user.firstName, lastName: user.lastName,
					email: user.email, password: user.password, text: textFieldValue, file: selectedFile
				});
				const [message] = [await response.json()];
				if (message.errorCode === 200) {
					handleFormResponse(message.errorCode, message.data, setFormErrors, navigate, '/');
				} else {
					setFormErrors(prevState => ({
						...prevState,
						["general"]: message.errors[0],
					})
					);
				}
			}
			setIsSubmitting(false);
		} catch (error) {
			setIsSubmitting(false);
			console.error(error.message);
		}
	};

	return (
		<TwoSidesTemplate
			title={<>
				{isCoach ? (
					<Typography variant="title1">BECOME A COACH</Typography>
				) : (
					<Typography variant="title1">SIGN UP</Typography>
				)
				}
				<Typography variant="subtitle1">To get started please enter your details.</Typography>
			</>}
			body={<>
				<InputField label="Name" id="firstName" name="firstName" autoComplete="firstName" required value={user.firstName} onChange={handleChange}
					error={formErrors["firstName"] !== ""} helperText={formErrors["firstName"]}
				/>
				<InputField label="Surname" name="lastName" id="lastName" autoComplete="lastName" required value={user.lastName}
					onChange={handleChange} error={formErrors["lastName"] !== ""} helperText={formErrors["lastName"]}
				/>
				<InputField label="Email" id="email" name="email" autoComplete="email" required value={user.email} onChange={handleChange}
					error={formErrors["email"] !== ""} helperText={formErrors["email"]}
				/>
				<InputField label="Password" name="password" type="password" id="password" autoComplete="current-password" required value={user.password}
					onChange={handleChange} error={formErrors["password"] !== ""} helperText={formErrors["password"]}
				/>
				<Typography variant="server_error">{formErrors["general"]}</Typography>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox color="success" value={isCoach} onChange={handleCoachChange} />}
						labelPlacement="start"
						label="Are you a coach?" />
				</FormGroup>
				{isCoach &&
					<>
						<TextField
							multiline
							required
							name="yourMessage"
							type="yourMessage"
							id="yourMessage"
							minRows={3}
							fullWidth
							label="Your message"
							value={user.yourMessage}
							onChange={handleChange}
							error={formErrors["yourMessage"] !== ""}
							helperText={formErrors["yourMessage"]}
						/>

						<input
							type="file"
							id="hidden-file-input"
							style={{ display: 'none' }}
							onChange={handleFileChange}
						/>
						<TextField
							id="file-textfield"
							fullWidth
							sx={{ mt: 2 }}
							variant="outlined"
							value={textFieldValue}
							onClick={handleTextFieldClick}
							InputProps={{
								readOnly: true,
								endAdornment: (
									<InputAdornment position="end">
										<Button
											variant="contained"
											component="label"
											htmlFor="hidden-file-input"
											onMouseOver={() => setIsHovered(true)}
											onMouseOut={() => setIsHovered(false)}
										>
											Browse
										</Button>
									</InputAdornment>
								),
								style: {
									cursor: 'pointer',
									textAlign: 'center'
								},
							}}
						/>
					</>}
				{formErrors["general"] && <Alert fullWidth severity="warning">{formErrors["general"]}</Alert>}
				{isSubmitting && <><LinearProgress color="success" /></>}
				<ButtonComponent title="Sign In" onClick={handleSubmit} disabled={isButtonDisabled()} />
			</>}
			img={image_sign_up}
		/>
	);

}

export default SignUpClient;