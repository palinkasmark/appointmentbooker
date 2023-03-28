import React from "react";

import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const Home = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  return (
    <>
      <div>Welcome home {username} </div>
      <Button
        variant="contained"
        color="info"
        onClick={() => navigate("products")}
      >
        Products
      </Button>
    </>
  );
};

export default Home;
