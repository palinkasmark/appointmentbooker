import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import api from "../api/api";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        });

        console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          setProducts(response.data);
        }, 2000);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    getProducts();
  }, []);

  const startBooking = async (productId) => {
    console.log("Start booking");
    console.log(productId);

    setLoadingProduct(true);
    try {
      const response = await api.get("getproductby?id=" + productId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      console.log(response.data);
      setTimeout(() => {
        setLoadingProduct(false);
        setProduct(response.data);
      }, 2000);
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div>
          {products.map((product) => {
            return (
              <p key={product.id}>
                <Button
                  onClick={() => startBooking(product.id)}
                  color="info"
                  variant="contained"
                >
                  {product.name}
                </Button>
              </p>
            );
          })}
        </div>
      )}
      {loadingProduct === undefined ? (
        ""
      ) : loadingProduct ? (
        <CircularProgress />
      ) : (
        <div>{product.availableDates}</div>
      )}
    </>
  );
};

export default Products;
