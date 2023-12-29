import * as common from "./validationCommon";

export function validateCoachFeedbackFormFields(fieldName, fieldValue, users) {
    let error = '';
    if (fieldName === "users"){
        if(!common.checkRequired(fieldValue)) {
            error = "This field is required";
        }else if (!common.isValidOption(fieldValue, users)){
            error = "Options is not from pool of allowed answers";
        }
    }

    if (fieldName === "dataType"){
        if(!common.checkRequired(fieldValue)) {
            error = "This field is required";
        }else if (fieldValue !== "diet" || fieldValue !== "training"){
            error = "Options is not from pool of allowed answers";
        }

    }

    return error;
}