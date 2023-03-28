import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import api from "../api/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Booking = () => {
  const { state } = useLocation();
  const { id, time } = state;
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingDetails = {
      name: name,
      date: time,
    };

    try {
      const response = await api.post("savebooking?id=" + id, bookingDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      console.log(response);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <h2>
        Booking details{" "}
        <Button
          color="warning"
          variant="contained"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="large" />
        </Button>
      </h2>

      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Required"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField disabled label="Time" value={time} />
        <Button type="submit" color="success" variant="contained">
          Save
        </Button>
      </form>
    </>
  );
};

export default Booking;
