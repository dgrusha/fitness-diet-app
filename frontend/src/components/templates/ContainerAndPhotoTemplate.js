import React from "react";
import PropTypes from "prop-types";

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../../helpers/themeProviderHelper';


const TwoSidesTemplate = (props) => {
  return (
    <ThemeProvider theme={ appTheme }>
        <Grid container component="main" sx={{ height: '100vh', border: '15px solid #F8F8FA' }}>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square >
              <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                {props.title}
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
  body: PropTypes.element.isRequired,
  additional_links: PropTypes.element,
  submitting: PropTypes.element,
  img: PropTypes.string.isRequired
};

TwoSidesTemplate.defaultProps = {};

export default TwoSidesTemplate;