export const isFormValid = (formErrors) => {
    return Object.values(formErrors).every(error => error === "");
};