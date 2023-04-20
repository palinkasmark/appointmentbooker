import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router";
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
  const { state } = useLocation();

  useEffect(() => {
    const getProductsByShop = async () => {
      const { id } = state;
      try {
        const response = await api.get(`getshopbyid?id=${id}`);
        setTimeout(() => {
          setIsLoading(false);
          setProducts(response.data.products);
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
      const response = await api.get("getproductby?id=" + productId);
      setProduct(response.data);
      setTimeout(() => {
        setLoadingProduct(false);
      }, 1000);
    } catch (err) {
      console.log(`Error: ${err.message}`);
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
          )}&date=${selectedDate}`
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
    }
  };

  return (
    <>
      <div className="container">
        {isLoading ? (
          <div className="circular-progress-container">
            <CircularProgress />
          </div>
        ) : products.length !== 0 ? (
          <div className="product-list-container" key={product.id}>
            {products.map((product) => {
              return (
                <ul key={product.id} className="product-list-ul">
                  <li className="product-list-li">
                    <Button
                      onClick={() => getProductById(product.id)}
                      color="info"
                      variant="contained"
                    >
                      {product.id}: {product.productName}
                    </Button>
                  </li>
                </ul>
              );
            })}
          </div>
        ) : localStorage.getItem("user-token") ? (
          <Button
            color="success"
            variant="contained"
            onClick={() => navigate("/newproduct")}
          >
            New Product
          </Button>
        ) : (
          <p>This shop hasn't products.</p>
        )}
        {loadingProduct === undefined ? (
          ""
        ) : loadingProduct ? (
          <div className="circular-progress-container">
            <CircularProgress />
          </div>
        ) : (
          <div className="calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
            {loadingTimes ? (
              <div className="circular-progress-container">
                <CircularProgress />
              </div>
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
      </div>
    </>
  );
};

export default Products;
