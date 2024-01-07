import { Box, Typography } from '@mui/material';
import PropTypes from "prop-types";
import React from "react";

export const LabelAndDescription = (props) => (
	<Box sx={{display: 'block', mb: '14px'}}>
		<Typography variant='diet_labels'>{props.label}</Typography>
		<Typography variant='diet_description'>{props.description}</Typography>
	</Box>
);

LabelAndDescription.propTypes = {
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default LabelAndDescription;

