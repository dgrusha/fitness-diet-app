import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Grid,
  Paper,
  Button,
  Typography,
  CssBaseline,
  TextField,
  LinearProgress,
} from '@mui/material';

import defaultTheme from './feedbackTheme';
import feedback_img from '../../img/feedback_img.png';
import RadioGroupRating  from './ratingGroup';
import { validateFeedbackFields } from '../../validators/feedbackValidator';
import { isFormValid } from '../../helpers/isFormValid';
import { leaveFeedback } from '../../apiCalls/leaveFeedback';

function Feedback() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedRating, setSelectedRating] = useState(3);
    const [feedbackText, setFeedbackText] = useState('');
    const [formErrors, setFormErrors] = useState({ text:"", general:""});
    const [status, setStatus] = useState('');

    const handleChange = event => {
        const {name, value} = event.target;
        setFeedbackText(value);
        let errVal = validateFeedbackFields(name,value);
        setFormErrors(prevState => ({
            ...prevState,
            [name]: errVal,
            ["general"]: "",
        }))
    }

    const handleSendButtonClick = async () => {
        try {
            setIsSubmitting(true);
            const response = await leaveFeedback({ levelRating: selectedRating, text: feedbackText});
            const [status, message] = [response.status, await response.text()];
            if(status === 200){
                setStatus(message);
            }else{
                setStatus(message);
            }
            
        } catch (error) {
          console.error(error.message);
        }finally{
          setIsSubmitting(false);
        }
      };

    return (
        <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
  
          <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
                <Typography variant="title1">
                    Leave feedback
                </Typography>
                <RadioGroupRating selectedValue={selectedRating} setSelectedValue={setSelectedRating} />
                <TextField
                    multiline
                    required
                    name="text"
                    type="text"
                    id="text"
                    minRows={5}
                    maxRows={10}
                    value={feedbackText}
                    onChange={handleChange}
                    error = {formErrors["text"] !== ""}
                    helperText={formErrors["text"]}
                    fullWidth
                    label="Leave your feedback"
                />
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#9CD91B",  }}
                disabled={!isFormValid(formErrors, [feedbackText])}
                onClick={handleSendButtonClick}
                >
                    Submit
                </Button>
                <p>{status}</p>
              {isSubmitting && <LinearProgress color="success" />}
            </Box>
          </Grid>
          <Grid item xs={false} sm={4} md={6}
            sx={{
              backgroundImage: `url(${feedback_img})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
      </ThemeProvider>
    );
}

export default Feedback;