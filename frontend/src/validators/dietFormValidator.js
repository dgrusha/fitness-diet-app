import * as common from "./validationCommon";

export function validateDietFormFields(fieldName, fieldValue, activityModes, dietModes, cookingRanges) {
	let error = '';
	if (fieldName === "activityMode") {
		if (!common.checkRequired(fieldValue)) {
			error = "This field is required";
		} else if (!common.isValidOption(fieldValue, activityModes)) {
			error = "Options is not from pool of allowed answers";
		}
	}

	if (fieldName === "dietMode") {
		if (!common.checkRequired(fieldValue)) {
			error = "This field is required";
		} else if (!common.isValidOption(fieldValue, dietModes)) {
			error = "Options is not from pool of allowed answers";
		}
	}

	if (fieldName === "cookingRange") {
		if (!common.checkRequired(fieldValue)) {
			error = "This field is required";
		} else if (!common.isValidOption(fieldValue, cookingRanges)) {
			error = "Options is not from pool of allowed answers";
		}
	}

	return error;
}