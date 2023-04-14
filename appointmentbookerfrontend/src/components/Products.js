import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router";
import dayjs from "dayjs";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
  const { state } = useLocation();

  useEffect(() => {
    const getProductsByShop = async () => {
      const { id } = state;
      try {
        const response = await api.get(`getproductsbyshop?id=${id}`);
        setTimeout(() => {
          setIsLoading(false);
          setProducts(response.data);
        }, 2000);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };

    const getProductsByUser = async () => {
      try {
        const response = await api.get("getuser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        });
        const user = response.data;
        setTimeout(() => {
          setIsLoading(false);
          setProducts(user.shop.products);
        }, 2000);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };
    if (localStorage.getItem("user-token")) {
      getProductsByUser();
    } else {
      getProductsByShop();
    }
  }, []);

  const getProductById = async (productId) => {
    setLoadingProduct(true);
    setProductId(productId);
    try {
      const response = await api.get("getproductby?id=" + productId, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        // },
      });
      setProduct(response.data);
      setTimeout(() => {
        setLoadingProduct(false);
      }, 1000);
    } catch (err) {
      console.log(`Error: ${err.message}`);
      // if (err.response.status === 401) {
      //   localStorage.clear();
      //   navigate("/login");
      // }
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
    if (productId) {
      getBookingDetails(selectedDate);
    }
  }, [product, value, productId]);

  const getBookingDetails = async (selectedDate) => {
    setLoadingTimes(true);

    try {
      if (Object.keys(product).length !== 0) {
        const response = await api.get(
          `getbookingdetailsbydate?id=${parseInt(
            productId
          )}&date=${selectedDate}`,
          {
            // headers: {
            //   Authorization: `Bearer ${localStorage.getItem("user-token")}`,
            // },
          }
        );

        let availableDates = product.availableDates;
        let reservedTimes = [];
        response.data.forEach((element) => {
          reservedTimes.push(element.time);
        });

        let newFreeTimes = availableDates.filter(
          (time) => !reservedTimes.includes(time)
        );
        setFreeTimes(newFreeTimes);
        setLoadingTimes(false);
      }
    } catch (err) {
      console.log(`Error: ${err.message}`);
      // if (err.response.status === 401) {
      //   localStorage.clear();
      //   navigate("/login");
      // }
    }
  };

  return (
    <>
      <Button color="warning" variant="contained" onClick={() => navigate(-1)}>
        <ArrowBackIcon fontSize="large" />
      </Button>
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
                  {product.id}: {product.productName}
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
          <div>
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
