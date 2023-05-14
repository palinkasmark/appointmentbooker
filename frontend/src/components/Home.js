import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const Home = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { shopData } = state || "";
  const [shop, setShop] = useState();

  useEffect(() => {
    setShop(shopData);
  }, [shopData]);

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
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate("newsalon")}
        >
          New Salon
        </Button>
      )}
    </>
  );
};

export default Home;
