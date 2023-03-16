import React from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const Booking = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
  );
};

export default Booking;
