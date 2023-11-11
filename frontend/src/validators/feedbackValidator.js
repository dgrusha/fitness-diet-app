import * as common from "./validationCommon";

export function validateFeedbackFields(fieldName, fieldValue) {
    let error = '';
    if (fieldName === "text"){
        if(!common.checkRequired(fieldValue)) {
            error = "This field is required";
        }else if(!common.checkTextLengthRange(fieldValue, 1, 2500)){
            error = "Minimum length is of feedback is 1 and maximum is 2500";
        }
    }

    return error;
}