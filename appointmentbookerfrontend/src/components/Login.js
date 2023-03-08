import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getOwners();
  // }, [owners]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    try {
      const response = await api.post("api/auth/login", user);
      console.log(response.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }

    // if (checkIsOwner()) {
    //   alert(`Sikeres bejelentkezes: ${name}`);
    //   navigate("/");
    // } else {
    //   alert(`Nincs ilyen felhasznalo: ${name}`);
    // }
  };

  // const checkIsOwner = () => {
  //   let isOwner = false;
  //   owners.forEach((element) => {
  //     if (element.name === name) {
  //       isOwner = true;
  //       return isOwner;
  //     }
  //   });
  //   return isOwner;
  // };

  // const getOwners = async () => {
  //   try {
  //     const response = await api.get("/owner/getAllOwner");
  //     setOwners(response.data);
  //   } catch (err) {
  //     console.log(`Error: ${err.message}`);
  //   }
  // };

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
