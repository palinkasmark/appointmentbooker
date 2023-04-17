import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import api from "../api/api";

import { useNavigate } from "react-router";

const SaveProduct = () => {
  const [productName, setProductName] = useState("");
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hours = duration.$H;
    let minutes = duration.$m;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    const newProduct = {
      productName: productName,
      duration: hours + ":" + minutes,
      price: price,
    };

    try {
      const response = await api.post("saveproduct", newProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(`Erro: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            label="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimeField
              required
              label="Duration"
              value={duration}
              onChange={(newValue) => setDuration(newValue)}
              format="HH:mm"
            />
          </LocalizationProvider>
          <TextField
            required
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SaveProduct;
