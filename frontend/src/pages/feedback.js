import {
	LinearProgress,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { leaveFeedback } from '../apiCalls/leaveFeedback';
import { isFormValid } from '../helpers/isFormValid';
import image_feedback from '../img/feedback.png';
import { validateFeedbackFields } from '../validators/feedbackValidator';
import ButtonComponent from '../components/atoms/Button';
import RadioGroupRating from '../components/moleculas/ratingGroup';
import TwoSidesTemplate from '../components/templates/ContainerAndPhotoTemplate';


function Feedback() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedRating, setSelectedRating] = useState(3);
	const [feedbackText, setFeedbackText] = useState('');
	const [formErrors, setFormErrors] = useState({ text: "", general: "" });
	const [status, setStatus] = useState('');

	const handleChange = event => {
		const { name, value } = event.target;
		setFeedbackText(value);
		let errVal = validateFeedbackFields(name, value);
		setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}))
	}

	const handleSendButtonClick = async () => {
		try {
			setIsSubmitting(true);
			const response = await leaveFeedback({ levelRating: selectedRating, text: feedbackText });
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
			title={<>
				<Typography variant="title1">Leave feedback</Typography>
				<Typography variant="subtitle1">Your opinion will help us to become better.</Typography>
			</>}
			prebodyitem={<RadioGroupRating selectedValue={selectedRating} setSelectedValue={setSelectedRating} />}
			body={<>
				<TextField
					multiline
					required
					margin="normal"
					name="text"
					type="text"
					id="text"
					minRows={5}
					maxRows={10}
					value={feedbackText}
					onChange={handleChange}
					error={formErrors["text"] !== ""}
					helperText={formErrors["text"]}
					fullWidth
					label="Leave your feedback"
				/>
				{isSubmitting && <LinearProgress color="success" />}
				<ButtonComponent
					disabled={!isFormValid(formErrors, [feedbackText])}
					onClick={handleSendButtonClick}
					title="Submit"
				/>
				<p>{status}</p>
			</>}
			img={image_feedback}
		/>
	);
}

export default Feedback;