export const handleNumericInputChange = (event, setValue) => {
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    setValue(numericValue);
};

export const handleTextInputChange = (event, setValue) => {
    const textValue = event.target.value.replace(/[^A-z]/g, '');
    setValue(textValue);
};