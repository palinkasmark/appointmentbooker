import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

const Salons = () => {
  const [salons, setSalons] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getShops = async () => {
      try {
        const response = await api.get("shops");
        console.log(response.data);
        setSalons(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };
    getShops();
  }, []);
  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        salons.map((salon) => (
          <Button
            color="primary"
            sx={{ m: 2 }}
            variant="outlined"
            key={salon.id}
            onClick={() => {
              navigate("/products", {
                state: {
                  id: salon.id,
                },
              });
            }}
          >
            {salon.name}
          </Button>
        ))
      )}
    </div>
  );
};

export default Salons;
