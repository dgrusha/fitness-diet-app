import React from "react";
import PropTypes from "prop-types";

import Button from '@mui/material/Button';

export const ButtonComponent = (props) => (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={props.onClick}
        sx={{ mt: 3, mb: 2, backgroundColor: "#9CD91B",  }}
        disabled={props.disabled}
    >
        {props.title}
    </Button>

);

ButtonComponent.propTypes = {
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

ButtonComponent.defaultProps = {
    disabled: true,
};

export default ButtonComponent;

