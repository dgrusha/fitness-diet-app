import PropTypes from "prop-types";
import React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../../helpers/themeProviderHelper';


const TwoSidesTemplate = (props) => {
  return (
    <ThemeProvider theme={ appTheme }>
        <Grid container component="main" sx={{ height: '100%', border: '15px solid #F8F8FA' }}>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square style={{height: '100%', overflow: 'auto'}}>
              <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                {props.title}
								{props.prebodyitem}
								<Box sx={{width: '80%'}}>
									{props.body}
								</Box>
                {props.submitting}
                {props.additional_links}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={6}  component={Paper} elevation={6} square
                sx={{
                backgroundImage: `url(${props.img})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            />
        </Grid>
    </ThemeProvider>
  );
};

TwoSidesTemplate.propTypes = {
  title: PropTypes.element.isRequired,
	prebodyitem: PropTypes.element,
  body: PropTypes.element.isRequired,
  additional_links: PropTypes.element,
  submitting: PropTypes.element,
  img: PropTypes.string.isRequired
};

TwoSidesTemplate.defaultProps = {};

export default TwoSidesTemplate;