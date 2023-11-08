import React from "react";
import PropTypes from "prop-types";

import TextField from '@mui/material/TextField';

export const InputFieldWithMetric = (props) => (
    <TextField
        label={props.label}
        margin="normal"
        fullWidth
        required
        name={props.name}
        id={props.id}
        InputProps={{
            endAdornment: props.inputProps,
            }}
        value={props.value}
        onChange={props.onChange}
        error = {props.error}
        helperText = {props.helperText}
    />
);

InputFieldWithMetric.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    inputProps: PropTypes.element,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
    helperText: PropTypes.string
};

export default InputFieldWithMetric;