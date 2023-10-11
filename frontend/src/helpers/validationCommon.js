  export function resetErrors (inputs, errorTexts, errorInfo){
    for (let i=0; i<inputs.length; i++){
      inputs[i].classList.remove("error-type");
    }
    for (let i =0; i< errorTexts.length; i++){
      errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
  }
  
  export function checkRequired (value){
    if (!value) {
      return false;
    }
    value.toString().trim();
    if (value === ""){
      return false;
    }
    return true;
  }
  
  export function checkTextLengthRange (value, min, max) {
    if (!value){
      return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
      return false;
    }
    if (min && length < min) {
      return false;
    }
    return true;
  }
  
  export function checkNumber(value) {
    if (!value)
        return false;
  
    if (isNaN(value))
        return false;
  
    return true;
  }
  
  export function checkNumberRange(value, min, max) {
    if (!value)
        return false;
  
    if (isNaN(value))
        return false;
  
    value = parseFloat(value);
    if (value < min)
        return false;
  
    if (value > max)
        return false;
  
    return true;
  }
  
  export function checkDate(value) {
    if (!value)
        return false;
  
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
  }
  
  export function checkDateIfAfter(value, compareTo) {
    if (!value)
        return false;
  
    if (!compareTo)
        return false;
  
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if (!pattern.test(value))
        return false;
  
    if (!pattern.test(compareTo))
        return false;
  
    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() < compareToDate.getTime())
        return false;
  
    return true;
  }
  
  export function checkEmail(value) {
    if (!value) 
        return false;
    
    value = value.toString().trim();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(value);
  }

  export function checkContainsDigits(value) {
    if (!value) 
        return false;

    if (!/\d/.test(value.toString()))
        return false;
    
    return true;
  }

  export function checkContainsCapitalLetter(value) {
    if (!value) 
        return false;

    if (!/[A-Z]/.test(value.toString()))
        return false;

    return true;
  }
  
  export function checkContainsSpecialSign(value){
    if (!value)
      return false;

    const specialSigns = /[!@#$%^&*(),.?":{}|<>]/

    if (!specialSigns.test(value.toString()))
      return false;

    return true;
  }