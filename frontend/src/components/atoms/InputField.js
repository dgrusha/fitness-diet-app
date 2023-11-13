import React from "react";
import PropTypes from "prop-types";

import TextField from '@mui/material/TextField';

export const InputField = (props) => (
    <TextField
        label={props.label}
        margin="normal"
        required={props.required}
        fullWidth
        name={props.name}
        type={props.type}
        id={props.id}
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={props.onChange}
        error = {props.error}
        helperText = {props.helperText}
				disabled ={props.disabled}
				InputLabelProps = {props.InputLabelProps}
    />
);

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
		required: PropTypes.bool,
		disabled: PropTypes.bool,
    type: PropTypes.string,
    id: PropTypes.string,
    autoComplete: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    helperText: PropTypes.string,
		labelProps: PropTypes.element
};

export default InputField;
