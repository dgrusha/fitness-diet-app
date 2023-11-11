import { checkRequired } from './validationCommon'

export function validateLoginFormFields(name, value) {
    let error= ''
    if (name === 'email') {
        if (!checkRequired(value)) {
          error = "Entry is required"
      }
    }
    if (name === 'password') {
        if (!checkRequired(value)) {
            error = "Entry is required"
        }
    }
    return error;
  }