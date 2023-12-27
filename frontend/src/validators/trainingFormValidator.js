import * as common from "./validationCommon";

export function validateTrainingFormFields(fieldName, fieldValue, trainingModes) {
    let error = '';
    if (fieldName === "trainingMode"){
        if(!common.checkRequired(fieldValue)) {
            error = "This field is required";
        }else if (!common.isValidOption(fieldValue, trainingModes)){
            error = "Options is not from pool of allowed answers";
        }
    }

    if (fieldName === "days"){
        if(!common.checkRequired(fieldValue)) {
            error = "This field is required";
        }else if(!common.checkIfContainsOnlyDigits(fieldValue)){
            error = "Only numbers are allowed";
        }else if(!common.checkNumberRange(fieldValue, 1, 5)){
            error = "You can train maximum 5 days and minimum 1 day";
        }
    }

    return error;
}