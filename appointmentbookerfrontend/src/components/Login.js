import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    try {
      const response = await api.post("api/auth/login", user);
      console.log(response.data.accessToken);
      const data = response.data;
      const token = data.accessToken;
      localStorage.clear();
      localStorage.setItem("user-token", token);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
