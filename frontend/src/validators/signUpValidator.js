import { checkRequired, checkTextLengthRange, checkEmail, checkContainsDigits, checkContainsCapitalLetter, checkContainsSpecialSign } from './validationCommon'

export function validateSignUpFormFields(name, value) {
	let error = ''
	if (name === 'firstName') {
		if (!checkRequired(value)) {
			error = "Entry is required"
		} else if (!checkTextLengthRange(value, 3, 30)) {
			error = "Entry should contain 3-30 characters"
		}
	}

	if (name === 'lastName') {
		if (!checkRequired(value)) {
			error = "Entry is required"
		} else if (!checkTextLengthRange(value, 3, 30)) {
			error = "Entry should contain 3-30 characters"
		}
	}
	
	if (name === 'email') {
		if (!checkRequired(value)) {
			error = "Entry is required"
		} else if (!checkEmail(value)) {
			error = "Email should match name@dom.com"
		}
	}

	if (name === 'password') {
		if (!checkRequired(value)) {
			error = "Entry is required"
		}
		else if (!checkTextLengthRange(value, 6, 14)) {
			error = "Entry should contain 6-14 characters"
		}
		else if (!checkContainsDigits(value)) {
			error = "Entry should contain digit"
		}
		else if (!checkContainsCapitalLetter(value)) {
			error = "Entry should contain capital letter"
		}
		else if (!checkContainsSpecialSign(value)) {
			error = "Entry should contain special character"
		}
	}
	return error;
}
