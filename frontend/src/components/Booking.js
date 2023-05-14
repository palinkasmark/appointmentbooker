import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLocation } from "react-router";
import api from "../api/api";

const Booking = () => {
  const { state } = useLocation();
  const { id, date, time } = state;
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingDetails = {
      name: name,
      date: date,
      time: time,
    };

    try {
      const response = await api.post("savebooking?id=" + id, bookingDetails);
      console.log(response.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <h2>Booking details</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Required"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField disabled label="Time" value={time} />
        <TextField disabled label="Date" value={date} />
        <Button type="submit" color="success" variant="contained">
          Save
        </Button>
      </form>
    </>
  );
};

export default Booking;
