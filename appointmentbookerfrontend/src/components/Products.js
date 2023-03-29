import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [value, setValue] = useState(dayjs(new Date()));

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        });

        // console.log(response.data);
        setTimeout(() => {
          setIsLoading(false);
          setProducts(response.data);
        }, 2000);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    getProducts();
    console.log(value.$d);
  }, [value]);

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
        <div style={{ border: "2px solid black" }}>
          <div style={{ border: "2px solid red" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
          </div>
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
