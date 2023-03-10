import "./App.css";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./util/ProtectedRoute";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      </Routes>
    </div>
  );
}

export default App;
