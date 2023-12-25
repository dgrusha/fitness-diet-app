import { checkRequired, checkTextLengthRange, checkNumber } from './validationCommon'

export function validatePaymentDetails(name, value, paymentOption) {
	let error = ''
	if (paymentOption === 'blik') {
		if (name === 'blik') {
			if (!checkRequired(value)) {
				error = "Entry is required"
			} else if (!checkNumber(value)) {
				error = "Entry should contain only digits"
			} else if (!checkTextLengthRange(value, 6, 6)) {
				error = "Entry should contain 6 characters"
			}
		}
	}
	else {
		if (name === 'cardNumber') {
			if (!checkRequired(value)) {
				error = "Entry is required"
			} else if (!checkNumber(value)) {
				error = "Entry should contain only digits"
			} else if (!checkTextLengthRange(value, 16, 16)) {
				error = "Entry should contain 16 characters"
			}
		}
		if (name === 'expirationDate') {
			if (!checkRequired(value)) {
				error = "Entry is required"
			} else if (!checkNumber(value)) {
				error = "Entry should contain only digits"
			} else if (!checkTextLengthRange(value, 3, 4)) {
				error = "Entry should contain 6 characters"
			}
		}

		if (name === 'CVV') {
			if (!checkRequired(value)) {
				error = "Entry is required"
			} else if (!checkNumber(value)) {
				error = "Entry should contain only digits"
			} else if (!checkTextLengthRange(value, 3, 3)) {
				error = "Entry should contain 3 characters"
			}
		}
	}
	return error;
}
