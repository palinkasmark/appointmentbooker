import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../api/api";

const Products = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });

      setTimeout(() => {
        setProducts(response.data);
        setIsLoading(false);
      }, 5000);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <Button color="error" variant="contained" onClick={getProducts}>
        Products
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {products.map((item) => {
            return <p key={item.id}>{item.name}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
