import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";

const Login = () => {
  const [name, setName] = useState("");
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOwners();
  }, [owners]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkIsOwner()) {
      alert(`Sikeres bejelentkezes: ${name}`);
      navigate("/");
    } else {
      alert(`Nincs ilyen felhasznalo: ${name}`);
    }
  };

  const checkIsOwner = () => {
    let isOwner = false;
    owners.forEach((element) => {
      if (element.name === name) {
        isOwner = true;
        return isOwner;
      }
    });
    return isOwner;
  };

  const getOwners = async () => {
    try {
      const response = await api.get("/owner/getAllOwner");
      setOwners(response.data);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
