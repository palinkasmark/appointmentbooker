import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import api from "../api/api";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router";

const NewSalon = () => {
  const [name, setName] = useState("");
  const [openFrom, setOpenFrom] = useState();
  const [openTo, setOpenTo] = useState();
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let openFromHour = openFrom.$H;
    let openFromMinutes = openFrom.$m;

    if (openFromHour < 10) {
      openFromHour = "0" + openFromHour;
    }
    if (openFromMinutes < 10) {
      openFromMinutes = "0" + openFromMinutes;
    }

    let openToHour = openTo.$H;
    let openToMinutes = openTo.$m;

    if (openToHour < 10) {
      openToHour = "0" + openToHour;
    }
    if (openToMinutes < 10) {
      openToMinutes = "0" + openToMinutes;
    }

    const newSalon = {
      name: name,
      openFrom: openFromHour + ":" + openFromMinutes,
      openTo: openToHour + ":" + openToMinutes,
    };

    try {
      const response = await api.post("saveshop", newSalon, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      console.log(response.data);
      navigate("/", {
        state: {
          shopData: newSalon,
        },
      });
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("login");
      }
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>New Salon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            label="Salon name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              required
              label="Open from"
              value={openFrom}
              onChange={(newValue) => setOpenFrom(newValue)}
              format="HH:mm"
            />
            <TimeField
              required
              label="Open to"
              value={openTo}
              onChange={(newValue) => setOpenTo(newValue)}
              format="HH:mm"
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewSalon;
