import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import api from "../api/api";

function SignUp() {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newOwner = {
      name: name,
    };

    try {
      const response = await api.post("/owner/add", newOwner);
      console.log(response);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
