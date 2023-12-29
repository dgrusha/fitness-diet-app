import {
	Avatar,
	Checkbox,
	FormControlLabel,
	FormGroup,
	LinearProgress,
	Typography,
	Alert
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { getUser } from '../apiCalls/userProfileGetInfo';
import { updateUserProfile } from '../apiCalls/userProfileUpdateInfo';
import { ButtonComponent } from "../components/atoms/Button";
import InputField from '../components/atoms/InputField';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';
import { handleTextInputChange } from '../helpers/inputChanges';
import { isFormValid } from '../helpers/isFormValid';
import { resizeAndSetPhoto } from '../helpers/photoHelper';
import image_profile_setting from '../img/user_profile_page.png';
import { validateUserProfileFields } from '../validators/userProfileValidator';

function UserProfile() {
	const [status, setStatus] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "", general: "" });
	const [userData, setUserData] = useState({});
	const [avatar, setAvatar] = useState(process.env.PUBLIC_URL + '/photo/animal_workout.jpg');
	const [photoFile, setPhotoFile] = useState(undefined);
	const setters = {
		"firstName": setFirstName,
		"lastName": setLastName
	}

	const handleChange = event => {
		const { name, value } = event.target;
		handleTextInputChange(event, setters[name]);
		let errVal = validateUserProfileFields(name, value);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}))
	}

	useEffect(() => {
		setIsSubmitting(true);
		getUser().then((data) => {
			if (data.errorCode === 200) {
				setUserData(data.data);
				setFirstName(data.data.firstName);
				setLastName(data.data.lastName);
				if (data.data.avatarFileName !== null && data.data.avatarFileName !== '') {
					setAvatar(data.data.avatarFileName);
				}
			} else {
				setUserData({ firsName: "-", lastName: "-", email: "-", hasObligatoryForm: false });
				setFirstName("-");
				setLastName("-");
			}
		});
		setIsSubmitting(false);
	}, []);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setPhotoFile(file);
		const reader = new FileReader();
		reader.onload = () => {
			resizeAndSetPhoto(reader, setAvatar, 200, 200);
		};
		reader.readAsDataURL(file);
	};

	const handleAvatarClick = () => {
		document.getElementById('photo-upload').click();
	};

	const handleSendButtonClick = async () => {
		try {
			setIsSubmitting(true);
			const response = await updateUserProfile({ name: firstName, surname: lastName, photo: photoFile });
			const [status, message] = [response.status, await response.text()];
			if (status === 200) {
				setStatus(message);
			} else {
				setStatus(message);
			}

		} catch (error) {
			console.error(error.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<TwoSidesTemplate
			title={<Typography variant="title1">ACCOUNT SETTINGS</Typography>}
			prebodyitem={<>
				<Avatar alt="The avatar" src={avatar} onClick={handleAvatarClick} />
				<input
					accept="image/*"
					style={{ display: 'none' }}
					id='photo-upload'
					type="file"
					onChange={handleFileChange}
				/>
			</>}
			body={<>
				<InputField label="Name" id="firstName" name="firstName" autoComplete="firstName" value={firstName} onChange={handleChange}
					error={formErrors["firstName"] !== ""} helperText={formErrors["firstName"]}
				/>
				<InputField label="Surname" name="lastName" id="lastName" autoComplete="lastName" value={lastName}
					onChange={handleChange} error={formErrors["lastName"] !== ""} helperText={formErrors["lastName"]}
				/>
				<InputField disabled label="Email" id="email" name="email" autoComplete="email" value={userData.email}
					InputLabelProps={{ shrink: true }}
				/>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox color="success" checked={userData.hasObligatoryForm === true} />}
						labelPlacement="start"
						label="Have you passed obligatory form?" />
				</FormGroup>
				{status && <Alert severity="info">{status}</Alert> }
				{isSubmitting && <LinearProgress color="success" />}
				<ButtonComponent title="SAVE CHANGES" onClick={handleSendButtonClick} disabled={!isFormValid(formErrors, [firstName, lastName])
					|| (firstName === userData.firstName && lastName === userData.lastName && avatar === userData.avatarFileName)} />
			</>}
			img={image_profile_setting}
		/>
	);
}

export default UserProfile;