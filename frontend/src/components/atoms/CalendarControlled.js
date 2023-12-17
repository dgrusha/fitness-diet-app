import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


export const CalendarControlled= (props) =>  (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar sx={{margin: "0 10px"}} value={props.value} onChange={(newValue) => props.changeFunction(newValue)} />
    </LocalizationProvider>
  );