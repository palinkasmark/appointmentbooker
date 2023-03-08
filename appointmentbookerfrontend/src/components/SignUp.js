import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import api from "../api/api";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newOwner = {
      username: username,
      password: password,
    };

    try {
      const response = await api.post("/api/auth/register", newOwner);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default SignUp;
