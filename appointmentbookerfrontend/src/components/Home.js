import React from "react";

import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const Home = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { shop } = state || "";

  return (
    <>
      <div>Welcome home {username} </div>
      {shop ? (
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate("products")}
        >
          Products
        </Button>
      ) : (
        <p>New shop</p>
      )}
    </>
  );
};

export default Home;
