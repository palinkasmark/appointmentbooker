import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

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

  const listTimes = async (productId) => {
    setLoadingProduct(true);
    try {
      const response = await api.get("getproductby?id=" + productId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      // console.log(response.data);
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
                  onClick={() => listTimes(product.id)}
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
        <div>
          {product.availableDates.map((time) => (
            <Button
              key={time}
              color="success"
              variant="contained"
              style={{ margin: "2px" }}
              onClick={() =>
                navigate("/booking", {
                  state: {
                    id: product.id,
                    name: product.name,
                    time: time,
                  },
                })
              }
            >
              {time}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
