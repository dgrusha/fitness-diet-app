import * as common from "./validationCommon";

export function validateUserProfileFields(fieldName, fieldValue) {
    let error = '';
    if (fieldName === "firstName"){
        if(!common.checkRequired(fieldValue)) {
            error = "This field is required";
        }else if(common.checkContainsDigits(fieldValue)){
            error = "Only letters are allowed";
        }else if(!common.checkTextLengthRange(fieldValue, 2, 30)){
            error = "Minimum size of surname is 2 and maximum is 30";
        }
    }
    if (fieldName === "lastName"){
        if(!common.checkRequired(fieldValue)) {
            error = "This field is required";
        }else if(common.checkContainsDigits(fieldValue)){
            error = "Only letters are allowed";
        }else if(!common.checkTextLengthRange(fieldValue, 2, 30)){
            error = "Minimum size of surname is 2 and maximum is 30";
        }
    }

    return error;
}