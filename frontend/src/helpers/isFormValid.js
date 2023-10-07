export const isFormValid = (formErrors, allValues) => {
    return Object.values(formErrors).every(error => error === "") && Object.values(allValues).every(val => val !== "" && val !== undefined );
};