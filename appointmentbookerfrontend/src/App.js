import "./App.css";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./util/ProtectedRoute";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Booking from "./components/Booking";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // don't know why but without this line not working the nav buttons

  useEffect(() => {
    const isToken = localStorage.getItem("user-token");
    if (!isToken || isToken === "undefined") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [localStorage.getItem("user-token")]);

  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path=""
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="newproduct"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
