import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div>
      <Button
        onClick={() => navigateTo("signup")}
        variant="contained"
        color="success"
      >
        Sign Up
      </Button>

      <Button
        onClick={() => navigateTo("login")}
        variant="contained"
        color="success"
      >
        Login
      </Button>

      <Button
        onClick={() => navigateTo("home")}
        variant="contained"
        color="success"
      >
        Home
      </Button>
    </div>
  );
};

export default Main;
