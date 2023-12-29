import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { ButtonComponent } from "../components/atoms/Button";
import InputField from '../components/atoms/InputField';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';
import { handleFormResponse } from '../helpers/formVerification';
import { isFormValid } from '../helpers/isFormValid';
import { resetPassword } from '../apiCalls/resetPassword';
import image_login from "../img/login_sign_up.png";
import { validateLoginFormFields } from '../validators/loginValidator';
import { ResetStepEnum } from '../helpers/processStatuses';
import { resetCode } from '../apiCalls/sendCodeToEmail';
import { verifyResetCode } from '../apiCalls/verifyCodeForReset';

function PasswordReset() {
	const navigate = useNavigate();
	const [data, setData] = useState({
		email: '',
		password1: '',
        password2: '',
        code: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(ResetStepEnum.EmailEnter);
    const [subtitle, setSubtitle] = useState("Provide email for which account was registered.");
	const [formErrors, setFormErrors] = useState({
		email: '',
		password1: '',
        password2: '',
        code: ''
	});

	const handleChange = event => {
		const { name, value } = event.target;
        let valueChangable = value;
        if(name === 'code'){
            valueChangable = event.target.value.replace(/[^0-9]/g, '');
        }
		let errVal = validateLoginFormFields(name, valueChangable);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}));
		setData({
			...data,
			[name]: valueChangable
		});
	};

	const handleSubmitEmail = async () => {
		setIsSubmitting(true);
		try {
			const response = await resetCode({ email: data.email });
			const [status, message] = [response.status, await response.text()];
			if(status === 200){
                setStep(ResetStepEnum.CodeEnter);
                setSubtitle("Enter code that was sent to you on email.");
			}else{
				setFormErrors(prevState => ({
						...prevState,
						["general"]: message,
					})
				);
			}
		setIsSubmitting(false);
		} catch (error) {
			console.error(error.message);
		}
	};

    const handleSubmitCodeVerify = async () => {
		setIsSubmitting(true);
		try {
			const response = await verifyResetCode({ email: data.email, code: data.code });
			const [status, message] = [response.status, await response.text()];
			if(status === 200){
                setStep(ResetStepEnum.PasswordReset);
                setSubtitle("Change your password.");
                setData({
                    ...data,
                    ['password1']: '',
                    ['password2']: ''
                });
			}else{
				setFormErrors(prevState => ({
						...prevState,
						["general"]: message,
					})
				);
			}
		setIsSubmitting(false);
		} catch (error) {
			console.error(error.message);
		}
	};

    const handleSubmitResetPassword = async () => {
		setIsSubmitting(true);
		try {
			const response = await resetPassword({ email: data.email, code: data.code, password1: data.password1, password2: data.password2 });
			const [status, message] = [response.status, await response.text()];
			if(status === 200){
                setStep(ResetStepEnum.PasswordSuccess);
                setData({
                    ...data,
                    ['password1']: '',
                    ['password2']: '',
                    ['email']: '',
                    ['code']: ''
                });
                setSubtitle("");
			}else{
				setFormErrors(prevState => ({
						...prevState,
						["general"]: message,
					})
				);
			}
		setIsSubmitting(false);
		} catch (error) {
			console.error(error.message);
		}
	};

    const renderContent = () => {
		switch (step) {
			case ResetStepEnum.EmailEnter:
				return <TwoSidesTemplate
                title={
                    <>
                        <Typography variant="title1">PASSWORD RESET</Typography>
                        <Typography variant="subtitle1">{subtitle}</Typography>
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
                            value={data.email}
                            onChange={handleChange}
                            error={formErrors["email"] !== ""}
                            helperText={formErrors["email"]}
                        />
                        {formErrors["general"] && <Alert fullWidth severity="warning">{formErrors["general"]}</Alert>}
                        {isSubmitting && <LinearProgress color="success" />}
                        <ButtonComponent
                            title="Send code for password reset"
                            onClick={handleSubmitEmail}
                            disabled={!isFormValid(formErrors, [data.email])}
                        />
                    </>
                }
                img={image_login}
            />;
			case ResetStepEnum.CodeEnter:
				return <TwoSidesTemplate
                title={
                    <>
                        <Typography variant="title1">Password Reset</Typography>
                        <Typography variant="subtitle1">{subtitle}</Typography>
                    </>
                }
                body={
                    <>
                <InputField
                    label="Code from email"
                    id="code"
                    name="code"
                    autoComplete="code"
                    required
                    value={data.code}
                    onChange={handleChange}
                    error={formErrors["code"] !== ""}
                    helperText={formErrors["code"]}
                />
                {formErrors["general"] && <Alert fullWidth severity="warning">{formErrors["general"]}</Alert>}
                {isSubmitting && <LinearProgress color="success" />}
                <ButtonComponent
                    title="Verify code"
                    onClick={handleSubmitCodeVerify}
                    disabled={!isFormValid(formErrors, [ data.code])}
                />
                <ButtonComponent
                    title="Change email"
                    disabled={false}
                    onClick={() => {
                        setStep(0);
                        setData({
                            ...data,
                            ['email']: '',
                            ['code']: ''
                        });
                    }}
                />
            </>
                }
                img={image_login}
            />;
			case ResetStepEnum.PasswordReset:
				return <TwoSidesTemplate
                title={
                    <>
                        <Typography variant="title1">Password Reset</Typography>
                        <Typography variant="subtitle1">{subtitle}</Typography>
                    </>
                }
                body={
                    <>
                <InputField
                    label="Password"
                    id="password1"
                    name="password1"
                    type="password"
                    autoComplete="off"
                    required
                    value={data.password1}
                    onChange={handleChange}
                    error={formErrors["password1"] !== ""}
                    helperText={formErrors["password1"]}
                />
                <InputField
                    label="Confirm Password"
                    id="password2"
                    name="password2"
                    type="password"
                    autoComplete="off"
                    required
                    value={data.password2}
                    onChange={handleChange}
                    error={formErrors["password2"] !== ""}
                    helperText={formErrors["password2"]}
                />
                {formErrors["general"] && <Alert fullWidth severity="warning">{formErrors["general"]}</Alert>}
                {isSubmitting && <LinearProgress color="success" />}
                <ButtonComponent
                    title="Change password"
                    onClick={handleSubmitResetPassword}
                    disabled={!isFormValid(formErrors, [ data.password1, data.password2])}
                />
            </>
                }
                img={image_login}
            />;
            case ResetStepEnum.PasswordSuccess:
                return <TwoSidesTemplate
                title={
                    <>
                        <Typography variant="title1">Password Reset</Typography>
                        
                    </>
                }
                body={
                <>
                <Alert fullWidth severity="success">Password was successfuly reset.</Alert>
                <ButtonComponent
                    title="Back to login"
                    onClick={() => navigate('/login')}
                    disabled={false}
                />
                </>
                }
                img={image_login}
            />;
			default:
				navigate('/');
		}
	};

	return (
		<>
			{renderContent()}
		</>
	);
}

export default PasswordReset;
