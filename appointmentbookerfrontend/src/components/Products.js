import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import api from "../api/api";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(undefined);
  const [loadingTimes, setLoadingTimes] = useState();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState();
  const navigate = useNavigate();
  const [value, setValue] = useState(dayjs(new Date()));
  const [freeTimes, setFreeTimes] = useState();
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        });

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

  const getProductById = async (productId) => {
    setLoadingProduct(true);
    setProductId(productId);
    try {
      const response = await api.get("getproductby?id=" + productId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });
      setProduct(response.data);
      setTimeout(() => {
        setLoadingProduct(false);
      }, 1000);
    } catch (err) {
      console.log(`Erro: ${err.message}`);
    }
  };

  useEffect(() => {
    let month = parseInt(value.$d.getMonth()) + 1;
    let day = value.$d.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    const selectedDate = value.$d.getFullYear() + "-" + month + "-" + day;
    setSelectedDate(selectedDate);
    getBookingDetails(selectedDate);
  }, [product, value, productId]);

  const getBookingDetails = async (selectedDate) => {
    setLoadingTimes(true);
    try {
      const response = await api.get(
        `getbookingdetailsbydate?id=${parseInt(
          productId
        )}&date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );

      let freeTimes = product.availableDates;
      let reservedTimes = [];
      response.data.forEach((element) => {
        reservedTimes.push(element.time);
      });

      let newFreeTimes = freeTimes.filter(
        (time) => !reservedTimes.includes(time)
      );
      setFreeTimes(newFreeTimes);
      setLoadingTimes(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
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
                  onClick={() => getProductById(product.id)}
                  color="info"
                  variant="contained"
                >
                  {product.productName}
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
          {loadingTimes ? (
            <CircularProgress />
          ) : (
            freeTimes.map((time) => (
              <Button
                key={time}
                color="success"
                variant="contained"
                style={{ margin: "2px" }}
                onClick={() =>
                  navigate("/booking", {
                    state: {
                      id: product.id,
                      date: selectedDate,
                      time: time,
                    },
                  })
                }
              >
                {time}
              </Button>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Products;
