import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  function goLogin() {
    navigate("/login");
  }
  function goSignUp() {
    navigate("/signup");
  }

  return (
    <div>
      <Button onClick={goSignUp} variant="contained" color="success">
        Sign Up
      </Button>

      <Button onClick={goLogin} variant="contained" color="success">
        Login
      </Button>
    </div>
  );
};

export default Main;
