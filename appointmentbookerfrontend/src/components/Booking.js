import React, { useState } from "react";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import api from "../api/api";

const Booking = () => {
  const [value, setValue] = useState(dayjs(new Date()));

  const saveBooking = async () => {
    try {
      const response = await api.post(
        "/savebooking",
        { date: value.$d },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
      <Button onClick={saveBooking} variant="contained" color="info">
        Save
      </Button>
    </LocalizationProvider>
  );
};

export default Booking;
