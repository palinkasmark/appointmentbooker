import React from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const newUser = {
      username: username,
      password: password,
    };

    try {
      const response = await api.post("/api/auth/register", newUser);
      console.log(response);
      const data = response.data;
      const token = data.accessToken;
      localStorage.clear();
      localStorage.setItem("user-token", token);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      console.log(`Error: ${err.message}`);
      if (err.response.status === 409) {
        alert(`${newUser.username} is already exists!`);
        setIsLoading(false);
        navigate("/signup");
      }
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUp;
