export const handleFormResponse = (status, message, setFormErrors, navigate, path) => {
    if (status !== 200) {
        setFormErrors(prevState => ({
            ...prevState,
            ["general"]: message
        }));
    } else {
        navigate(path);
    }
};