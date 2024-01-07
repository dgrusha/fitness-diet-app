import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { login } from '../apiCalls/authentication/login';
import { ButtonComponent } from "../components/atoms/Button";
import InputField from '../components/atoms/InputField';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';
import { handleFormResponse } from '../helpers/formVerification';
import { isFormValid } from '../helpers/isFormValid';
import image_login from "../img/authorization.png";
import { validateLoginFormFields } from '../validators/loginValidator';
import { useAppContext } from '../AppContext';

function LogIn() {
	const navigate = useNavigate();
	const { handleLogin, hasFormHandle } = useAppContext();
	const [user, setUser] = useState({
		email: '',
		password: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formErrors, setFormErrors] = useState({
		email: "",
		password: ""
	});

	const handleChange = event => {
		const { name, value } = event.target;
		let errVal = validateLoginFormFields(name, value);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}));
		setUser({
			...user,
			[name]: value
		});
	};

	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			const response = await login({ email: user.email, password: user.password });
			const [ message ] = [await response.json()];
			if(message.errorCode === 200){
					handleLogin(message.data);
					hasFormHandle(message.data.hasObligatoryForm);
					handleFormResponse(message.errorCode, message.data, setFormErrors, navigate, '/' );
			}else{
				setFormErrors(prevState => ({
						...prevState,
						["general"]: message.errors[0],
					})
				);
			}
		setIsSubmitting(false);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<TwoSidesTemplate
			title={
				<>
					<Typography variant="title1">LOGIN</Typography>
					<Typography variant="subtitle1">To get started please enter your details.</Typography>
				</>
			}
			body={
				<>
					<InputField
						label="Email"
						id="email"
						name="email"
						autoComplete="email"
						required
						value={user.email}
						onChange={handleChange}
						error={formErrors["email"] !== ""}
						helperText={formErrors["email"]}
					/>
					<InputField
						label="Password"
						name="password"
						type="password"
						id="password"
						autoComplete="current-password"
						required
						value={user.password}
						onChange={handleChange}
						error={formErrors["password"] !== ""}
						helperText={formErrors["password"]}
					/>
					{formErrors["general"] && <Alert fullWidth severity="warning">{formErrors["general"]}</Alert>}
					{isSubmitting && <LinearProgress color="success" />}
					<ButtonComponent
						title="Login"
						onClick={handleSubmit}
						disabled={!isFormValid(formErrors, [user.email, user.password])}
					/>
				</>
			}
			additional_links={
				<Grid container>
					<Grid item xs>
						<Link href="/password_reset" variant="link_a">
							Forgot password?
						</Link>
					</Grid>
					<Grid item>
						<Link href="/register" variant="link_a">
							Don't have an account? Sign Up
						</Link>
					</Grid>
				</Grid>
			}
			img={image_login}
		/>
	);
}

export default LogIn;
