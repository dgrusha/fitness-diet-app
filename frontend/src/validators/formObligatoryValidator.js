import * as common from "./validationCommon";

export function validateObligatoryFormFields(fieldName, fieldValue) {
	let error = '';
	if (fieldName === "weight") {
		if (!common.checkRequired(fieldValue)) {
			error = "This field is required";
		} else if (!common.checkIfContainsOnlyDigits(fieldValue)) {
			error = "Only numbers are allowed";
		} else if (!common.checkNumberRange(fieldValue, 28, 200)) {
			error = "Minimum weight is 28 and maximum is 200";
		}
	}

	if (fieldName === "height") {
		if (!common.checkRequired(fieldValue)) {
			error = "This field is required";
		} else if (!common.checkIfContainsOnlyDigits(fieldValue)) {
			error = "Only numbers are allowed";
		} else if (!common.checkNumberRange(fieldValue, 130, 270)) {
			error = "Minimum height is 130 and maximum is 270";
		}
	}

	if (fieldName === "years") {
		if (!common.checkRequired(fieldValue)) {
			error = "This field is required";
		} else if (!common.checkIfContainsOnlyDigits(fieldValue)) {
			error = "Only numbers are allowed";
		} else if (!common.checkNumberRange(fieldValue, 16, 60)) {
			error = "Your age can be between 16 and 60 years";
		}
	}

	return error;
}