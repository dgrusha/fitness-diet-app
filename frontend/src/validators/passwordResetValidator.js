import * as common from "./validationCommon";

export function validateLoginFormFields(name, value) {
	let error = ''
	if (name === 'email') {
		if (!common.checkRequired(value)) {
			error = "Entry is required"
		} else if (!common.checkEmail(value)) {
			error = "Email should match name@dom.com"
		}
	}

	if (name === 'password1') {
		if (!common.checkRequired(value)) {
			error = "Entry is required"
		}
		else if (!common.checkTextLengthRange(value, 6, 14)) {
			error = "Entry should contain 6-14 characters"
		}
		else if (!common.checkContainsDigits(value)) {
			error = "Entry should contain digit"
		}
		else if (!common.checkContainsCapitalLetter(value)) {
			error = "Entry should contain capital letter"
		}
		else if (!common.checkContainsSpecialSign(value)) {
			error = "Entry should contain special character"
		}
	}
	if (name === 'password2') {
		if (!common.checkRequired(value)) {
			error = "Entry is required"
		}
		else if (!common.checkTextLengthRange(value, 6, 14)) {
			error = "Entry should contain 6-14 characters"
		}
		else if (!common.checkContainsDigits(value)) {
			error = "Entry should contain digit"
		}
		else if (!common.checkContainsCapitalLetter(value)) {
			error = "Entry should contain capital letter"
		}
		else if (!common.checkContainsSpecialSign(value)) {
			error = "Entry should contain special character"
		} else if (password1 !== password2) {
			error = "Provided passwords are not identical"
		}
	}
	if (name === 'code') {
		if (!common.checkRequired(fieldValue)) {
			error = "This field is required";
		} else if (!common.checkIfContainsOnlyDigits(fieldValue)) {
			error = "Only numbers are allowed";
		}
	}
	return error;
}