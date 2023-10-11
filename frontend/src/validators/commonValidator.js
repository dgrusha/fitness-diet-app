export function checkRequired(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    if(value ===""){
        return false;
    }
    return true;
}

export function checkTextLengthRange(value, min, max){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const len = value.length;
    if(max && len > max){
        return false;
    }
    if(min && len < min){
        return false;
    }
    return true;
}

export function checkNumberRange(value, min, max){
    if(!value){
        return false;
    }
    if(!checkIfOnlyNums(value)){
        return false;
    }
    if (value > max || value < min){
        return false;
    }
    return true;
}

export function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(value);
}

export function checkIfOnlyNums(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const re = /^\d+$/;
    return re.test(value);
}

export function checkTwoDates(date1, date2){
    if (!date1){
        return false;
    }

    if (!date2){
        return true;
    }

    const date_s = new Date(date1);
    const date_e = new Date(date2);

    if(date_s.getTime() > date_e.getTime()){
        return false;
    }

    return true;
}


export function checkPhone(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    // eslint-disable-next-line no-useless-escape
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return re.test(value);
}

export function checkDate(value){
    if(!value){
        return false;
    }
    return true;
}